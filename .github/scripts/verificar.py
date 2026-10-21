import re
import subprocess
import sys
from pathlib import Path

raiz = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
erros = []


def conferir(origem, alvo, base):
    if re.match(r"^(https?:|data:|mailto:|#|//)", alvo):
        return
    caminho = (base / alvo.split("#")[0].split("?")[0]).resolve()
    if not caminho.exists():
        erros.append(f"{origem.relative_to(raiz)}: arquivo não encontrado: {alvo}")


for html in raiz.glob("*.html"):
    texto = html.read_text(encoding="utf-8")
    for alvo in re.findall(r'(?:src|href)="([^"]+)"', texto):
        conferir(html, alvo, html.parent)

for css in raiz.glob("css/*.css"):
    texto = css.read_text(encoding="utf-8")
    for alvo in re.findall(r'url\(["\']?([^"\')]+)["\']?\)', texto):
        conferir(css, alvo, css.parent)

cartas = raiz / "js" / "cards.js"
if cartas.exists():
    nomes = re.findall(r'img:\s*"([^"]+)"', cartas.read_text(encoding="utf-8"))
    if len(nomes) != 22:
        erros.append(f"js/cards.js: esperava 22 cartas, achei {len(nomes)}")
    for nome in nomes:
        conferir(cartas, f"../assets/cards/{nome}.webp", cartas.parent)
    conferir(cartas, "../assets/cards/verso.webp", cartas.parent)

for js in raiz.glob("js/*.js"):
    resultado = subprocess.run(["node", "--check", str(js)], capture_output=True, text=True)
    if resultado.returncode != 0:
        erros.append(f"{js.relative_to(raiz)}: erro de sintaxe\n{resultado.stderr.strip()}")

if erros:
    print("\n".join(erros))
    sys.exit(1)

print("Tudo certo: referências, cartas e sintaxe do JavaScript conferidas.")
