"""
Generates the inline SVG diagrams used in articles and inserts them into the
matching EN/RU markdown files.

The SVGs are theme-aware: strokes and text inherit currentColor, accents come
from the nacre custom properties, so the same markup works wherever it lands.
Re-running is safe — an existing figure for a slug is replaced, not duplicated.
"""
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / 'src' / 'content' / 'writing'


def wrap(viewbox: str, body: str) -> str:
    return (
        f'<svg class="diagram" viewBox="{viewbox}" role="img" '
        f'xmlns="http://www.w3.org/2000/svg">\n{body}\n</svg>'
    )


# --------------------------------------------------------------- 1. matrix
MATRIX = wrap(
    '0 0 720 440',
    '''  <title>Two axes: how much judgment a task needs, and what a mistake costs</title>
  <defs>
    <marker id="ar-m" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="currentColor"/>
    </marker>
  </defs>
  <rect x="72" y="40" width="300" height="300" fill="var(--accent-teal)" opacity="0.10"/>
  <text x="222" y="196" text-anchor="middle" font-size="15" fill="var(--accent-teal)" font-weight="600">SAFE TO AUTOMATE</text>
  <text x="222" y="218" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.65">low judgment, cheap visible errors</text>
  <rect x="372" y="40" width="276" height="300" fill="var(--accent-rose)" opacity="0.13"/>
  <text x="510" y="196" text-anchor="middle" font-size="15" fill="var(--accent-rose)" font-weight="600">KEEP MANUAL</text>
  <text x="510" y="218" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.65">judgment, or expensive to reverse</text>
  <line x1="72" y1="340" x2="660" y2="340" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-m)"/>
  <line x1="72" y1="340" x2="72" y2="32" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-m)"/>
  <text x="366" y="378" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.75">cost of a mistake, and how visible it is</text>
  <text x="-190" y="26" transform="rotate(-90)" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.75">judgment required</text>
  <g font-size="13" fill="currentColor">
    <circle cx="140" cy="300" r="4" fill="var(--accent-teal)"/><text x="152" y="304">crawls and diffs</text>
    <circle cx="150" cy="262" r="4" fill="var(--accent-teal)"/><text x="162" y="266">reporting</text>
    <circle cx="196" cy="120" r="4" fill="var(--accent-teal)"/><text x="208" y="124">schema from CMS fields</text>
    <circle cx="300" cy="86" r="4" fill="var(--accent)"/><text x="312" y="90">draft generation (gated)</text>
    <circle cx="470" cy="290" r="4" fill="var(--accent-rose)"/><text x="482" y="294">redirects</text>
    <circle cx="520" cy="150" r="4" fill="var(--accent-rose)"/><text x="532" y="154">canonicals, indexing</text>
    <circle cx="560" cy="86" r="4" fill="var(--accent-rose)"/><text x="572" y="90">what to publish</text>
  </g>''',
)

# -------------------------------------------------------------- 2. pipeline
PIPELINE = wrap(
    '0 0 720 300',
    '''  <title>Pipeline stages: briefs, generation, validation, queue, publish</title>
  <defs>
    <marker id="ar-p" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="currentColor"/>
    </marker>
  </defs>
  <g font-size="13">
    <rect x="8" y="60" width="118" height="58" rx="8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
    <text x="67" y="85" text-anchor="middle" fill="currentColor" font-weight="600">Briefs</text>
    <text x="67" y="103" text-anchor="middle" fill="currentColor" opacity="0.6" font-size="11">written by hand</text>
    <rect x="156" y="60" width="118" height="58" rx="8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
    <text x="215" y="85" text-anchor="middle" fill="currentColor" font-weight="600">Generate</text>
    <text x="215" y="103" text-anchor="middle" fill="currentColor" opacity="0.6" font-size="11">LLM</text>
    <rect x="304" y="52" width="126" height="74" rx="8" fill="var(--accent)" fill-opacity="0.10" stroke="var(--accent)" stroke-width="1.6"/>
    <text x="367" y="80" text-anchor="middle" fill="var(--accent)" font-weight="700">Validate</text>
    <text x="367" y="98" text-anchor="middle" fill="currentColor" opacity="0.7" font-size="11">structure, de-dup</text>
    <text x="367" y="113" text-anchor="middle" fill="currentColor" opacity="0.7" font-size="11">link sanity</text>
    <rect x="460" y="60" width="118" height="58" rx="8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
    <text x="519" y="85" text-anchor="middle" fill="currentColor" font-weight="600">Queue</text>
    <text x="519" y="103" text-anchor="middle" fill="currentColor" opacity="0.6" font-size="11">paced slots</text>
    <rect x="608" y="60" width="104" height="58" rx="8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
    <text x="660" y="85" text-anchor="middle" fill="currentColor" font-weight="600">Publish</text>
    <text x="660" y="103" text-anchor="middle" fill="currentColor" opacity="0.6" font-size="11">WP REST</text>
  </g>
  <g stroke="currentColor" stroke-width="1.4" marker-end="url(#ar-p)" opacity="0.8">
    <line x1="126" y1="89" x2="150" y2="89"/>
    <line x1="274" y1="89" x2="298" y2="89"/>
    <line x1="430" y1="89" x2="454" y2="89"/>
    <line x1="578" y1="89" x2="602" y2="89"/>
  </g>
  <path d="M367 126 L367 180 L215 180 L215 124" fill="none" stroke="var(--accent-rose)" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#ar-p)" opacity="0.9"/>
  <text x="291" y="199" text-anchor="middle" font-size="12" fill="var(--accent-rose)">rejected, with the reason attached</text>
  <path d="M519 126 L519 232 L60 232" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.45"/>
  <text x="300" y="251" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.6">the queue is the last cheap place for a human to step in</text>''',
)

# -------------------------------------------------------------- 3. cylinder
ARC = 2.4
SEGMENTS = 12
LEFT, WIDTH = 72.0, 576.0


def curved(u: float) -> float:
    theta = (u - 0.5) * ARC
    return 0.5 + math.sin(theta) / (2 * math.sin(ARC / 2))


_even = '\n'.join(
    f'    <line x1="{LEFT + i * WIDTH / SEGMENTS:.1f}" y1="60" '
    f'x2="{LEFT + i * WIDTH / SEGMENTS:.1f}" y2="130" '
    f'stroke="currentColor" stroke-width="1" opacity="0.5"/>'
    for i in range(SEGMENTS + 1)
)
_curved = '\n'.join(
    f'    <line x1="{LEFT + curved(i / SEGMENTS) * WIDTH:.1f}" y1="196" '
    f'x2="{LEFT + curved(i / SEGMENTS) * WIDTH:.1f}" y2="266" '
    f'stroke="var(--accent)" stroke-width="1.2" opacity="0.85"/>'
    for i in range(SEGMENTS + 1)
)

CYLINDER = wrap(
    '0 0 720 320',
    f'''  <title>Even label columns versus columns compressed toward the silhouette</title>
  <text x="72" y="44" font-size="13" fill="currentColor" opacity="0.75">flat artwork, even columns</text>
{_even}
  <rect x="72" y="60" width="576" height="70" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
  <text x="72" y="180" font-size="13" fill="var(--accent)" opacity="0.95">after the cylindrical remap, same columns compressed toward the edges</text>
{_curved}
  <rect x="72" y="196" width="576" height="70" fill="none" stroke="var(--accent)" stroke-width="1.4" opacity="0.8"/>
  <text x="360" y="298" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.65" font-family="ui-monospace, monospace">uCurved = 0.5 + sin(theta) / (2 * sin(arc/2))</text>''',
)

# ---------------------------------------------------------------- 4. engine
ENGINE = wrap(
    '0 0 720 330',
    '''  <title>What the rule engine reads, and the one field it never reads</title>
  <rect x="238" y="86" width="244" height="150" rx="10" fill="var(--accent)" fill-opacity="0.09" stroke="var(--accent)" stroke-width="1.6"/>
  <text x="360" y="122" text-anchor="middle" font-size="15" font-weight="700" fill="var(--accent)">RuleEngine</text>
  <text x="360" y="146" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.72">pure functions</text>
  <text x="360" y="165" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.72">no DOM, no audio</text>
  <text x="360" y="184" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.72">no module state</text>
  <text x="360" y="212" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.9" font-family="ui-monospace, monospace">Violation | null</text>
  <g font-size="13" fill="currentColor">
    <text x="24" y="106">visitor.claim</text>
    <text x="24" y="140">rules (data)</text>
    <text x="24" y="174">station roster</text>
    <text x="24" y="208">dive log</text>
  </g>
  <g stroke="currentColor" stroke-width="1.3" opacity="0.7">
    <line x1="150" y1="101" x2="232" y2="120"/>
    <line x1="140" y1="135" x2="232" y2="146"/>
    <line x1="152" y1="169" x2="232" y2="172"/>
    <line x1="120" y1="203" x2="232" y2="198"/>
  </g>
  <g>
    <text x="556" y="140" font-size="13" fill="var(--accent-rose)" font-weight="600">visitor.truth</text>
    <text x="556" y="162" font-size="12" fill="currentColor" opacity="0.7">never read</text>
    <text x="556" y="180" font-size="12" fill="currentColor" opacity="0.7">never rendered</text>
    <line x1="488" y1="150" x2="546" y2="140" stroke="var(--accent-rose)" stroke-width="1.4" stroke-dasharray="5 4"/>
    <line x1="508" y1="132" x2="528" y2="158" stroke="var(--accent-rose)" stroke-width="2"/>
    <line x1="528" y1="132" x2="508" y2="158" stroke="var(--accent-rose)" stroke-width="2"/>
  </g>
  <text x="360" y="288" text-anchor="middle" font-size="12.5" fill="currentColor" opacity="0.72">The engine can prove a document is inconsistent.</text>
  <text x="360" y="308" text-anchor="middle" font-size="12.5" fill="currentColor" opacity="0.72">It can never tell you whether the thing at the airlock is a person.</text>''',
)

FIGURES = {
    'what-to-automate-in-seo': (
        MATRIX,
        'The two axes. Automation is safe in the lower-left corner and gets dangerous fast in either direction.',
        'Две оси. Автоматизация безопасна в левом нижнем углу и быстро становится опасной при движении по любой из них.',
    ),
    'llm-content-pipeline-wordpress': (
        PIPELINE,
        'The stages. Validation carries the value: a rejected draft goes back with its reason attached.',
        'Этапы. Ценность несёт валидация: отбракованный черновик возвращается с указанием причины.',
    ),
    'bottle-label-warping-shading': (
        CYLINDER,
        'The same twelve columns before and after the remap. Interior columns spread and edge columns bunch, which is what reads as wrapped.',
        'Те же двенадцать столбцов до и после развёртки. Внутренние расходятся, крайние сбиваются — именно это читается как «обёрнуто».',
    ),
    'pure-rule-engine-game-core': (
        ENGINE,
        'Everything the engine reads, and the one field it does not. That omission is what keeps the judgement with the player.',
        'Всё, что движок читает, и одно поле, которое он не читает. Именно это умолчание оставляет суждение игроку.',
    ),
}

FIG_RE = re.compile(
    r'\n*<figure class="diagram-figure">.*?</figure>\n*', re.DOTALL
)


def insert(path: Path, svg: str, caption: str) -> None:
    text = path.read_text(encoding='utf-8')
    text = FIG_RE.sub('\n\n', text)  # idempotent re-run

    fm_end = text.index('---', 3) + 3
    head, body = text[:fm_end], text[fm_end:].lstrip('\n')

    figure = (
        '<figure class="diagram-figure">\n'
        f'{svg}\n'
        f'<figcaption>{caption}</figcaption>\n'
        '</figure>'
    )

    # Sit at the end of the intro, immediately before the first section
    # heading. Cutting mid-intro can separate a lead-in sentence from the
    # blockquote or list that completes it.
    paras = [p for p in body.split('\n\n') if p.strip()]
    cut = next(
        (i for i, para in enumerate(paras) if para.lstrip().startswith('## ')),
        len(paras),
    )
    merged = '\n\n'.join(paras[:cut] + [figure] + paras[cut:])
    path.write_text(head + '\n\n' + merged, encoding='utf-8')


def main() -> None:
    for slug, (svg, cap_en, cap_ru) in FIGURES.items():
        for lang, caption in (('en', cap_en), ('ru', cap_ru)):
            path = CONTENT / lang / f'{slug}.md'
            if not path.exists():
                print('missing:', path)
                continue
            insert(path, svg, caption)
            print('figure ->', path.relative_to(ROOT))


if __name__ == '__main__':
    main()
