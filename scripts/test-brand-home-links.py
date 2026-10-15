from html.parser import HTMLParser
from pathlib import Path
import json
import sys


DESTINATION = "/professional.html"
MARKS = {"astrobridge-mark-256.png", "astrobridge-company-logo.png"}
VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}


class BrandLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.marks = []

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag == "img" and Path(attributes.get("src", "")).name in MARKS:
            anchors = [item for item in self.stack if item[0] == "a"]
            anchor = anchors[-1][1] if anchors else {}
            self.marks.append({
                "line": self.getpos()[0],
                "source": attributes["src"],
                "href": anchor.get("href"),
                "target": anchor.get("target", "_self"),
                "anchorCount": len(anchors),
            })
        if tag not in VOID_ELEMENTS:
            self.stack.append((tag, attributes))

    def handle_startendtag(self, tag, attributes):
        self.handle_starttag(tag, attributes)
        if tag not in VOID_ELEMENTS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                self.stack = self.stack[:index]
                break


def inspect(html):
    parser = BrandLinks()
    parser.feed(html)
    return parser.marks


assert inspect('<img src="/assets/astrobridge-mark-256.png">')[0]["href"] is None
assert inspect('<a href="/"><img src="/assets/astrobridge-mark-256.png"></a>')[0]["href"] != DESTINATION
assert inspect('<a href="/professional.html"><span><img src="/assets/astrobridge-mark-256.png"></span></a>')[0]["href"] == DESTINATION
assert inspect('<a href="painpoints.html"><img src="assets/app_icon_ma.png"></a>') == []

root = Path(__file__).resolve().parents[1]
if len(sys.argv) > 1:
    root = Path(sys.argv[1]).resolve()
    pages = sorted(root.rglob("*.html"))
else:
    pages = [root / "index.html", *sorted((root / "public").rglob("*.html"))]

results = []
for page in pages:
    marks = inspect(page.read_text())
    for mark in marks:
        assert mark["href"] == DESTINATION, (str(page), mark)
        assert mark["target"] in ("", "_self"), (str(page), mark)
        assert mark["anchorCount"] == 1, (str(page), mark)
    if marks:
        results.append({"file": str(page.relative_to(root)), "marks": marks})

total = sum(len(result["marks"]) for result in results)
assert total >= 33, total
assert len(results) >= 30, len(results)
print(json.dumps({"passed": True, "pages": len(results), "logos": total, "destination": DESTINATION, "results": results}, indent=2))
