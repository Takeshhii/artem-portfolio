// Paints the same bloom stack the CSS uses, finds the darkest pixel, and
// reports contrast for each text colour against it. Run in the page console
// (or via the browser tool) after changing the wash.
(() => {
  const WASH = ['#e8cdd8', '#cfe2e8', '#ded7ee', '#cfe2e8'];
  const BASE = '#f8f7fa';
  const OPACITY = 0.72;
  const W = 400, H = 300;

  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = BASE; x.fillRect(0, 0, W, H);

  const blooms = [
    [0.10, -0.10, 1100 / 1440, 800 / 900, WASH[0]],
    [0.90, 0.00, 1000 / 1440, 760 / 900, WASH[1]],
    [0.64, 0.46, 940 / 1440, 940 / 900, WASH[2]],
    [0.16, 0.92, 820 / 1440, 720 / 900, WASH[3]],
  ];
  x.globalAlpha = OPACITY;
  for (const [px, py, rx, ry, col] of blooms) {
    const g = x.createRadialGradient(px * W, py * H, 0, px * W, py * H, Math.max(rx * W, ry * H));
    g.addColorStop(0, col);
    g.addColorStop(0.62, col + '00');
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);
  }
  x.globalAlpha = 1;

  const lin = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

  const d = x.getImageData(0, 0, W, H).data;
  let worst = 1, at = null;
  for (let i = 0; i < d.length; i += 4) {
    const L = lum(d[i], d[i + 1], d[i + 2]);
    if (L < worst) { worst = L; at = [(i / 4) % W, Math.floor(i / 4 / W)]; }
  }

  const cs = getComputedStyle(document.documentElement);
  const hex = n => cs.getPropertyValue(n).trim();
  const hexLum = h => {
    const m = h.replace('#', '');
    return lum(parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16));
  };
  const ratio = L => ((worst + 0.05) / (L + 0.05)).toFixed(2);

  return {
    darkestWashLuminance: worst.toFixed(3),
    at,
    contrastOnDarkestPoint: {
      ink: ratio(hexLum(hex('--ink'))),
      inkSoft: ratio(hexLum(hex('--ink-soft'))),
      muted: ratio(hexLum(hex('--muted'))),
      accent: ratio(hexLum(hex('--accent'))),
    },
  };
})()
