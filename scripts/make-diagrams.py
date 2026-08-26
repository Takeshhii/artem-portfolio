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

# ------------------------------------------------------- 5. theme ownership
OWNERSHIP = wrap(
    '0 0 720 300',
    '''  <title>URL rules assembled in three places, versus one owner</title>
  <text x="16" y="30" font-size="13" font-weight="600" fill="var(--accent-rose)">PURCHASED THEME</text>
  <g font-size="12.5" fill="currentColor">
    <rect x="16" y="52" width="150" height="40" rx="7" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.5"/>
    <text x="91" y="77" text-anchor="middle">permalink settings</text>
    <rect x="16" y="106" width="150" height="40" rx="7" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.5"/>
    <text x="91" y="131" text-anchor="middle">theme options</text>
    <rect x="16" y="160" width="150" height="40" rx="7" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.5"/>
    <text x="91" y="185" text-anchor="middle">bundled plugin</text>
    <rect x="16" y="214" width="150" height="40" rx="7" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.5"/>
    <text x="91" y="239" text-anchor="middle">redirect plugin</text>
  </g>
  <g stroke="var(--accent-rose)" stroke-width="1.2" opacity="0.75" stroke-dasharray="4 3">
    <line x1="166" y1="72" x2="268" y2="140"/>
    <line x1="166" y1="126" x2="268" y2="146"/>
    <line x1="166" y1="180" x2="268" y2="154"/>
    <line x1="166" y1="234" x2="268" y2="162"/>
  </g>
  <rect x="268" y="118" width="118" height="66" rx="8" fill="var(--accent-rose)" fill-opacity="0.12" stroke="var(--accent-rose)" stroke-width="1.4"/>
  <text x="327" y="146" text-anchor="middle" font-size="12.5" fill="currentColor">what is this</text>
  <text x="327" y="164" text-anchor="middle" font-size="12.5" fill="currentColor">URL doing?</text>
  <text x="327" y="206" text-anchor="middle" font-size="11.5" fill="var(--accent-rose)">no single answer</text>
  <line x1="404" y1="151" x2="452" y2="151" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>
  <text x="470" y="30" font-size="13" font-weight="600" fill="var(--accent-teal)">STANDALONE THEME</text>
  <rect x="470" y="106" width="234" height="90" rx="9" fill="var(--accent-teal)" fill-opacity="0.12" stroke="var(--accent-teal)" stroke-width="1.5"/>
  <text x="587" y="136" text-anchor="middle" font-size="12.5" fill="currentColor">redirects, indexing rules</text>
  <text x="587" y="156" text-anchor="middle" font-size="12.5" fill="currentColor">and URL structure</text>
  <text x="587" y="178" text-anchor="middle" font-size="12.5" fill="var(--accent-teal)" font-weight="600">one owner</text>''',
)

# ----------------------------------------------------------- 6. many sites
FANOUT = wrap(
    '0 0 720 320',
    '''  <title>Detection fans out across every site; judgment concentrates on a few</title>
  <text x="16" y="28" font-size="13" font-weight="600" fill="var(--accent-teal)">DETECTION — scales</text>
  <rect x="16" y="46" width="150" height="52" rx="8" fill="var(--accent-teal)" fill-opacity="0.12" stroke="var(--accent-teal)" stroke-width="1.4"/>
  <text x="91" y="70" text-anchor="middle" font-size="12" fill="currentColor">scheduled crawl</text>
  <text x="91" y="87" text-anchor="middle" font-size="12" fill="currentColor">+ diff</text>
  <g stroke="var(--accent-teal)" stroke-width="1" opacity="0.6">'''
    + '\n'.join(
        f'    <line x1="166" y1="72" x2="300" y2="{34 + i * 22}"/>' for i in range(12)
    )
    + '''  </g>
  <g fill="currentColor" font-size="11">'''
    + '\n'.join(
        f'    <circle cx="308" cy="{34 + i * 22}" r="3.5" fill="var(--accent-teal)" opacity="0.8"/>'
        for i in range(12)
    )
    + '''  </g>
  <text x="330" y="160" font-size="12" fill="currentColor" opacity="0.7">all 12 properties, one report</text>
  <line x1="16" y1="212" x2="704" y2="212" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <text x="16" y="242" font-size="13" font-weight="600" fill="var(--accent)">JUDGMENT — does not scale</text>
  <rect x="16" y="258" width="150" height="46" rx="8" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-width="1.4"/>
  <text x="91" y="286" text-anchor="middle" font-size="12" fill="currentColor">your attention</text>
  <g stroke="var(--accent)" stroke-width="1.6">
    <line x1="166" y1="281" x2="300" y2="270"/>
    <line x1="166" y1="281" x2="300" y2="294"/>
  </g>
  <circle cx="308" cy="270" r="5" fill="var(--accent)"/>
  <circle cx="308" cy="294" r="5" fill="var(--accent)"/>
  <text x="330" y="275" font-size="12" fill="currentColor" opacity="0.8">the two that carry the commercial value</text>
  <text x="330" y="299" font-size="12" fill="currentColor" opacity="0.55">the rest get monitoring, not thought</text>''',
)

# -------------------------------------------------------- 7. shopify URLs
SHOPIFY = wrap(
    '0 0 720 300',
    '''  <title>One product reachable at several URLs</title>
  <rect x="270" y="18" width="180" height="44" rx="8" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="360" y="46" text-anchor="middle" font-size="13" font-weight="600" fill="var(--accent)">one product</text>
  <g font-size="11.5" fill="currentColor" font-family="ui-monospace, monospace">
    <rect x="16" y="104" width="200" height="34" rx="6" fill="var(--accent-teal)" fill-opacity="0.14" stroke="var(--accent-teal)" stroke-width="1.4"/>
    <text x="116" y="126" text-anchor="middle" fill="currentColor">/products/handle</text>
    <rect x="248" y="104" width="212" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>
    <text x="354" y="126" text-anchor="middle" opacity="0.7">/collections/a/products/handle</text>
    <rect x="248" y="150" width="212" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>
    <text x="354" y="172" text-anchor="middle" opacity="0.7">/collections/b/products/handle</text>
    <rect x="248" y="196" width="212" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>
    <text x="354" y="218" text-anchor="middle" opacity="0.7">/collections/c/products/handle</text>
    <text x="354" y="252" text-anchor="middle" font-size="11" opacity="0.5" font-family="inherit">...one per collection it sits in</text>
  </g>
  <g stroke="currentColor" stroke-width="1" opacity="0.4">
    <line x1="330" y1="62" x2="140" y2="100"/>
    <line x1="360" y1="62" x2="354" y2="100"/>
    <line x1="380" y1="62" x2="420" y2="146"/>
    <line x1="392" y1="62" x2="440" y2="192"/>
  </g>
  <g stroke="var(--accent-teal)" stroke-width="1.5" stroke-dasharray="5 4">
    <line x1="248" y1="121" x2="220" y2="121"/>
    <line x1="248" y1="167" x2="150" y2="142"/>
    <line x1="248" y1="213" x2="150" y2="146"/>
  </g>
  <text x="116" y="160" text-anchor="middle" font-size="11.5" fill="var(--accent-teal)" font-weight="600">canonical target</text>
  <text x="116" y="182" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.65">but the templates link</text>
  <text x="116" y="198" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.65">to the long form anyway</text>''',
)

# ---------------------------------------------------------- 8. b2b account
ACCOUNT = wrap(
    '0 0 720 300',
    '''  <title>One profile with a purchase event, versus one account with several people and none</title>
  <text x="16" y="28" font-size="13" font-weight="600" fill="currentColor" opacity="0.75">WHAT THE TOOL ASSUMES</text>
  <circle cx="70" cy="82" r="18" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <text x="70" y="122" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.75">one person</text>
  <line x1="96" y1="82" x2="150" y2="82" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
  <rect x="150" y="62" width="112" height="40" rx="7" fill="var(--accent-teal)" fill-opacity="0.14" stroke="var(--accent-teal)" stroke-width="1.3"/>
  <text x="206" y="87" text-anchor="middle" font-size="12" fill="currentColor">purchase event</text>
  <line x1="262" y1="82" x2="312" y2="82" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
  <text x="322" y="87" font-size="12" fill="currentColor" opacity="0.75">flow fires</text>
  <line x1="16" y1="150" x2="704" y2="150" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <text x="16" y="182" font-size="13" font-weight="600" fill="var(--accent)">WHAT B2B ACTUALLY IS</text>
  <rect x="16" y="198" width="196" height="86" rx="9" fill="var(--accent)" fill-opacity="0.09" stroke="var(--accent)" stroke-width="1.4"/>
  <text x="114" y="220" text-anchor="middle" font-size="12" fill="var(--accent)" font-weight="600">one account</text>
  <circle cx="58" cy="252" r="13" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.65"/>
  <circle cx="114" cy="252" r="13" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.65"/>
  <circle cx="170" cy="252" r="13" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.65"/>
  <text x="114" y="278" text-anchor="middle" font-size="10.5" fill="currentColor" opacity="0.6">requests · approves · signs</text>
  <line x1="212" y1="241" x2="266" y2="241" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
  <rect x="266" y="220" width="130" height="42" rx="7" fill="none" stroke="var(--accent-rose)" stroke-width="1.4" stroke-dasharray="5 4"/>
  <text x="331" y="246" text-anchor="middle" font-size="12" fill="var(--accent-rose)">often no event</text>
  <text x="418" y="232" font-size="12" fill="currentColor" opacity="0.75">so segment on what they</text>
  <text x="418" y="252" font-size="12" fill="currentColor" opacity="0.75">state: use case, size, stage,</text>
  <text x="418" y="272" font-size="12" fill="currentColor" opacity="0.75">whether artwork exists yet</text>''',
)

# ------------------------------------------------------------ 9. vocabulary
VOCAB = wrap(
    '0 0 720 300',
    '''  <title>Two vocabularies normalised onto shared claims before matching</title>
  <rect x="16" y="46" width="188" height="80" rx="9" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
  <text x="110" y="70" text-anchor="middle" font-size="12.5" font-weight="600" fill="currentColor">student CV</text>
  <text x="110" y="92" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">"REST API for a</text>
  <text x="110" y="109" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">course project"</text>
  <rect x="16" y="176" width="188" height="80" rx="9" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
  <text x="110" y="200" text-anchor="middle" font-size="12.5" font-weight="600" fill="currentColor">vacancy</text>
  <text x="110" y="222" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">"experience with backend</text>
  <text x="110" y="239" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.7">service development"</text>
  <path d="M204 86 L268 130" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <path d="M204 216 L268 172" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <rect x="268" y="120" width="164" height="62" rx="9" fill="var(--accent)" fill-opacity="0.11" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="350" y="146" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--accent)">extract claims</text>
  <text x="350" y="166" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.75">what · with what · how deep</text>
  <line x1="432" y1="151" x2="486" y2="151" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
  <rect x="486" y="120" width="218" height="62" rx="9" fill="var(--accent-teal)" fill-opacity="0.13" stroke="var(--accent-teal)" stroke-width="1.5"/>
  <text x="595" y="146" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--accent-teal)">match on the claims</text>
  <text x="595" y="166" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.75">not on the wording</text>
  <text x="360" y="278" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.65">Same evidence, two dialects. Vector similarity alone reads them as barely related.</text>''',
)

# --------------------------------------------------------- 10. audio chain
AUDIO = wrap(
    '0 0 720 260',
    '''  <title>The hum: two oscillators, a lowpass and an LFO on the gain</title>
  <defs>
    <marker id="ar-a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="currentColor"/>
    </marker>
  </defs>
  <g font-size="12.5">
    <rect x="12" y="52" width="112" height="42" rx="7" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
    <text x="68" y="70" text-anchor="middle" fill="currentColor">sine</text>
    <text x="68" y="86" text-anchor="middle" fill="var(--accent)" font-family="ui-monospace, monospace" font-size="11">40 Hz</text>
    <rect x="12" y="116" width="112" height="42" rx="7" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
    <text x="68" y="134" text-anchor="middle" fill="currentColor">sine</text>
    <text x="68" y="150" text-anchor="middle" fill="var(--accent)" font-family="ui-monospace, monospace" font-size="11">63 Hz</text>
    <circle cx="188" cy="105" r="18" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.7"/>
    <text x="188" y="111" text-anchor="middle" font-size="15" fill="currentColor">+</text>
    <rect x="248" y="84" width="118" height="42" rx="7" fill="var(--accent)" fill-opacity="0.11" stroke="var(--accent)" stroke-width="1.4"/>
    <text x="307" y="110" text-anchor="middle" fill="currentColor">lowpass</text>
    <rect x="410" y="84" width="106" height="42" rx="7" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
    <text x="463" y="110" text-anchor="middle" fill="currentColor">gain</text>
    <rect x="560" y="84" width="146" height="42" rx="7" fill="var(--accent-teal)" fill-opacity="0.13" stroke="var(--accent-teal)" stroke-width="1.4"/>
    <text x="633" y="110" text-anchor="middle" fill="currentColor">out — the hull hum</text>
    <rect x="410" y="182" width="106" height="40" rx="7" fill="none" stroke="var(--accent-rose)" stroke-width="1.3" stroke-dasharray="5 4"/>
    <text x="463" y="207" text-anchor="middle" fill="var(--accent-rose)">slow LFO</text>
  </g>
  <g stroke="currentColor" stroke-width="1.3" marker-end="url(#ar-a)" opacity="0.75">
    <line x1="124" y1="73" x2="166" y2="97"/>
    <line x1="124" y1="137" x2="166" y2="113"/>
    <line x1="206" y1="105" x2="242" y2="105"/>
    <line x1="366" y1="105" x2="404" y2="105"/>
    <line x1="516" y1="105" x2="554" y2="105"/>
  </g>
  <line x1="463" y1="182" x2="463" y2="132" stroke="var(--accent-rose)" stroke-width="1.3" stroke-dasharray="5 4" marker-end="url(#ar-a)"/>
  <text x="360" y="248" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.65">Two close frequencies beat against each other. One sine alone reads as a test tone.</text>''',
)

FIGURES = {
    'wordpress-theme-technical-seo': (
        OWNERSHIP,
        'Before and after. The problem was never performance — it was that no single place owned what a URL does.',
        'До и после. Проблема была не в скорости, а в том, что ни одно место не владело поведением URL целиком.',
    ),
    'seo-across-many-sites': (
        FANOUT,
        'Monitoring goes everywhere. Attention does not — and spreading it evenly across twelve sites is the mistake.',
        'Мониторинг идёт на всё. Внимание — нет, и размазать его ровно по двенадцати сайтам это и есть ошибка.',
    ),
    'shopify-seo-architecture': (
        SHOPIFY,
        'Canonicalisation settles which URL is indexed. It does not stop your own templates linking to the other ones.',
        'Канонизация решает, какой URL индексируется. Она не мешает вашим же шаблонам ссылаться на остальные.',
    ),
    'klaviyo-b2b-segmentation': (
        ACCOUNT,
        'The unit of the tool is a person with a purchase. The unit of the business is an account with several people and no event.',
        'Единица инструмента — человек с покупкой. Единица бизнеса — аккаунт с несколькими людьми и без события.',
    ),
    'building-ai-career-platform': (
        VOCAB,
        'Normalise both sides onto shared claims first. Matching the wording directly is what makes a demo instead of a product.',
        'Сначала привести обе стороны к общим утверждениям. Сопоставление формулировок напрямую даёт демо, а не продукт.',
    ),
    'web-audio-game-sound-no-files': (
        AUDIO,
        'The entire room tone. No file is loaded — the atmosphere is four nodes and a modulated gain.',
        'Весь тон помещения. Ни одного загруженного файла — атмосфера это четыре узла и модулируемая громкость.',
    ),
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
