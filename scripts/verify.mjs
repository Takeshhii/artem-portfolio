// Verifies the built site: console errors, broken links, metadata, responsive
// rendering — then captures screenshots for review.
// Run against a running preview server: node scripts/verify.mjs <baseUrl> <outDir>
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] ?? 'http://localhost:4399';
const OUT = process.argv[3];
if (OUT) fs.mkdirSync(OUT, { recursive: true });

const routes = [
  '/',
  '/work/aira',
  '/work/ai-wordpress-publisher',
  '/work/bottle-label-studio',
  '/work/nfc-msk',
  '/writing',
  '/404',
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});

const problems = [];
const linksSeen = new Set();

for (const route of routes) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => failedRequests.push(`${r.url()} ${r.failure()?.errorText}`));

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const res = await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 1200));

  const info = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const imgs = [...document.querySelectorAll('img')];
    return {
      title: document.title,
      description: q('meta[name="description"]')?.content ?? null,
      canonical: q('link[rel="canonical"]')?.href ?? null,
      og: q('meta[property="og:image"]')?.content ?? null,
      h1Count: document.querySelectorAll('h1').length,
      jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
      brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
      missingAlt: imgs.filter((i) => !i.alt).length,
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
    };
  });

  info.links.forEach((l) => linksSeen.add(l));

  const status = res?.status();
  const label = route.padEnd(32);
  const issues = [];
  if (status !== 200 && route !== '/404') issues.push(`status ${status}`);
  if (consoleErrors.length) issues.push(`console: ${consoleErrors[0]}`);
  if (failedRequests.length) issues.push(`request failed: ${failedRequests[0]}`);
  if (info.brokenImgs.length) issues.push(`broken img: ${info.brokenImgs[0]}`);
  if (info.h1Count !== 1) issues.push(`h1 count = ${info.h1Count}`);
  if (!info.description) issues.push('no meta description');
  if (!info.canonical) issues.push('no canonical');
  if (info.missingAlt) issues.push(`${info.missingAlt} img without alt`);
  if (info.docWidth > info.winWidth + 1) issues.push(`h-overflow ${info.docWidth}>${info.winWidth}`);

  console.log(`${issues.length ? 'FAIL' : 'ok  '} ${label} ${info.title.slice(0, 46)}`);
  issues.forEach((i) => console.log(`       ! ${i}`));
  if (issues.length) problems.push({ route, issues });

  if (OUT) {
    const name = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
    await page.screenshot({ path: path.join(OUT, `desktop-${name}.png`) });
  }

  // Mobile pass — checks layout, not content
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 800));
  const mob = await page.evaluate(() => ({
    docWidth: document.documentElement.scrollWidth,
    winWidth: window.innerWidth,
  }));
  if (mob.docWidth > mob.winWidth + 1) {
    console.log(`       ! MOBILE h-overflow ${mob.docWidth} > ${mob.winWidth}`);
    problems.push({ route, issues: ['mobile horizontal overflow'] });
  }
  if (OUT) {
    const name = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
    await page.screenshot({ path: path.join(OUT, `mobile-${name}.png`) });
  }

  await page.close();
}

// Check internal links resolve
console.log('\nInternal links:');
const internal = [...linksSeen].filter((h) => h && h.startsWith('/') && !h.startsWith('//'));
for (const href of internal) {
  const url = BASE + href.split('#')[0];
  if (href.startsWith('#')) continue;
  const page = await browser.newPage();
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => null);
  const st = res?.status() ?? 'ERR';
  // 304 Not Modified is a successful cached response, not a broken link.
  if (typeof st !== 'number' || (st >= 400 || st < 200)) {
    console.log(`  BROKEN ${href} → ${st}`);
    problems.push({ route: href, issues: [`link ${st}`] });
  } else {
    console.log(`  ok     ${href}`);
  }
  await page.close();
}

await browser.close();
console.log(`\n${problems.length === 0 ? 'ALL CHECKS PASSED' : `${problems.length} problem(s) found`}`);
process.exit(problems.length ? 1 : 0);
