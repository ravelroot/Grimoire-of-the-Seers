(function () {
  "use strict";

  const { arcanos, constelacoes } = window.GRIMORIO;
  const { embaralhar, convergir } = window.ORACULO;

  const CAMINHO_IMG = "assets/cards/";
  const VERSO = CAMINHO_IMG + "verso.webp";

  const MODOS = {
    unica: { max: 1, posicoes: [{ num: "", nome: "Sua carta" }] },
    tripla: {
      max: 3,
      posicoes: [
        { num: "I", nome: "Origem", chave: "origem" },
        { num: "II", nome: "Travessia", chave: "travessia" },
        { num: "III", nome: "Destino", chave: "destino" }
      ]
    }
  };

  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ponteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)");

  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));

  const el = {
    mesa: $("#mesa"),
    monte: $("#monte"),
    camadas: $$(".monte-camada"),
    contagem: $("#contagem"),
    slots: $("#slots"),
    fios: $("#fios"),
    dica: $("#dica"),
    grimorio: $("#grimorio"),
    modos: $(".modos"),
    botoesModo: $$(".modo"),
    embaralhar: $("#btn-embaralhar"),
    nova: $("#btn-nova"),
    dialogo: $("#dialogo"),
    dialogoCarta: $("#dialogo-carta"),
    dialogoTexto: $("#dialogo-texto"),
    dialogoFechar: $("#dialogo-fechar"),
    anuncio: $("#anuncio"),
    progresso: $("#progresso"),
    progressoTexto: $("#progresso-texto")
  };

  const estado = {
    modo: "unica",
    baralho: embaralhar(),
    tiradas: [],
    ocupado: false,
    convergencia: null
  };

  const duracao = (ms) => (reduzMovimento.matches ? 1 : ms);
  const espera = (ms) => new Promise((r) => setTimeout(r, duracao(ms)));
  const carta = (idx) => arcanos[idx];
  const imgCarta = (c) => `${CAMINHO_IMG}${c.img}.webp`;
  const modoAtual = () => MODOS[estado.modo];

  function anunciar(texto) {
    el.anuncio.textContent = "";
    requestAnimationFrame(() => { el.anuncio.textContent = texto; });
  }

  function dica(texto) { el.dica.textContent = texto; }

  function atualizarMonte() {
    const restantes = estado.baralho.length;
    el.contagem.textContent = `${restantes} ${restantes === 1 ? "carta" : "cartas"} no monte`;

    const visiveis = Math.max(1, Math.min(el.camadas.length, Math.ceil(restantes / 4)));
    el.camadas.forEach((c, i) => c.classList.toggle("oculta", i < el.camadas.length - visiveis));

    const cheio = estado.tiradas.length >= modoAtual().max;
    el.monte.setAttribute("aria-disabled", String(cheio));
    el.monte.setAttribute("aria-label", cheio ? "Todas as cartas desta leitura já foram tiradas" : "Tirar uma carta do monte");

    el.embaralhar.disabled = estado.tiradas.length > 0;
    el.nova.disabled = estado.tiradas.length === 0;
    $$(".slot-alvo", el.slots).forEach((a, i) => a.classList.toggle("proximo", i === estado.tiradas.length && !cheio));
    atualizarProgresso();
  }

  function atualizarProgresso() {
    const max = modoAtual().max;
    const reveladas = estado.tiradas.filter((t) => t.revelada).length;
    el.progresso.innerHTML = Array.from({ length: max }, (_, i) => {
      const t = estado.tiradas[i];
      const classe = t ? (t.revelada ? "revelada" : "tirada") : "";
      return `<span class="progresso-marco ${classe}"></span>`;
    }).join("");
    el.progresso.setAttribute("aria-label", `${reveladas} de ${max} ${max === 1 ? "carta revelada" : "cartas reveladas"}`);
    el.progressoTexto.textContent = max === 1
      ? (reveladas ? "Carta revelada" : estado.tiradas.length ? "Carta na mesa" : "Nenhuma carta na mesa")
      : `${reveladas} de 3 reveladas`;
  }

  function topoDoMonte() {
    const visiveis = el.camadas.filter((c) => !c.classList.contains("oculta"));
    return visiveis[visiveis.length - 1] || el.monte;
  }

  async function animarEmbaralhar() {
    el.monte.classList.remove("embaralhando");
    void el.monte.offsetWidth;
    el.monte.classList.add("embaralhando");
    await espera(1100);
    el.monte.classList.remove("embaralhando");
  }

  function renderSlots() {
    el.mesa.dataset.modo = estado.modo;
    el.slots.innerHTML = modoAtual().posicoes.map((p, i) => `
      <div class="slot" data-pos="${i}">
        <div class="slot-alvo" data-pos="${i}"></div>
        <p class="slot-rotulo">${p.num ? `<span class="num">${p.num}</span>` : ""}${p.nome}
          <span class="slot-estado"></span>
        </p>
      </div>`).join("");
    $$(".slot-alvo", el.slots).forEach((a) => a.addEventListener("click", (e) => {
      if (e.target.closest(".carta")) return;
      if (Number(a.dataset.pos) === estado.tiradas.length) tirar();
    }));
  }

  const slotEl = (i) => el.slots.children[i];

  function dicaInicial() {
    dica(estado.modo === "unica"
      ? "Toque no monte para tirar uma carta."
      : "Toque no monte para tirar a primeira carta: a Origem.");
  }

  function criarCarta(idx, pos) {
    const c = carta(idx);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "carta";
    b.setAttribute("aria-label", `Carta virada na posição ${modoAtual().posicoes[pos].nome}. Revelar.`);
    b.innerHTML = `
      <span class="carta-inner">
        <span class="face face-verso"><img src="${VERSO}" alt="" draggable="false"><span class="brilho"></span></span>
        <span class="face face-frente">
          <img src="${imgCarta(c)}" alt="${c.nome} (${c.en})" draggable="false" decoding="async">
          <span class="brilho"></span>
        </span>
      </span>`;
    b.addEventListener("click", () => revelar(pos));
    ativarInclinacao(b, b, { referencia: () => b.parentElement || b });
    return b;
  }

  async function tirar() {
    if (estado.ocupado) return;
    if (el.monte.getAttribute("aria-disabled") !== "true") pulsarMonte();
    if (estado.tiradas.length >= modoAtual().max) {
      dica(estado.modo === "unica"
        ? "A carta já está na mesa. Use Nova leitura para recomeçar."
        : "As três cartas já estão na mesa. Use Nova leitura para recomeçar.");
      return;
    }

    const pos = estado.tiradas.length;
    const idx = estado.baralho.pop();
    const pre = new Image(); pre.src = imgCarta(carta(idx));

    const alvo = $(".slot-alvo", slotEl(pos));
    const b = criarCarta(idx, pos);
    const origem = topoDoMonte().getBoundingClientRect();
    alvo.appendChild(b);
    const destino = alvo.getBoundingClientRect();

    estado.tiradas.push({ idx, el: b, revelada: false, virando: false });
    atualizarMonte();

    const dx = origem.left + origem.width / 2 - (destino.left + destino.width / 2);
    const dy = origem.top + origem.height / 2 - (destino.top + destino.height / 2);
    const s = origem.width / destino.width;

    const meio = (s + 1) / 2;
    const voo = b.animate([
      { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${s}) rotate(-6deg)`, easing: "cubic-bezier(.3,0,.2,1)" },
      { transform: `translate3d(${dx * 0.5}px, ${dy * 0.5 - 70}px, 60px) scale(${meio * 1.05}) rotate(3deg)`, offset: 0.5, easing: "cubic-bezier(.2,.7,.25,1)" },
      { transform: "translate3d(0, -6px, 10px) scale(1.015) rotate(-.5deg)", offset: 0.86, easing: "cubic-bezier(.3,0,.3,1)" },
      { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)" }
    ], { duration: duracao(900) });

    await voo.finished.catch(() => {});
    if (!b.isConnected) return;

    $(".slot-estado", slotEl(pos)).textContent = "Toque para revelar";

    if (estado.modo === "unica") {
      dica("Toque na carta para revelá-la.");
    } else {
      const n = estado.tiradas.length;
      dica(n < 3
        ? `Carta ${n} de 3 na mesa. Revele-a ou tire a próxima: ${MODOS.tripla.posicoes[n].nome}.`
        : "As três cartas estão na mesa. Revele as que faltam.");
    }
    anunciar(`Carta tirada para ${modoAtual().posicoes[pos].nome}.`);
  }

  async function revelar(pos) {
    const t = estado.tiradas[pos];
    if (!t || t.virando) return;
    if (t.revelada) { abrirDialogo(t.idx); return; }

    t.virando = true;
    const c = carta(t.idx);
    const frente = $(".face-frente img", t.el);
    if (frente.decode) await frente.decode().catch(() => {});

    const slot = slotEl(pos);
    slot.classList.remove("irradiando");
    void slot.offsetWidth;
    slot.classList.add("irradiando");

    const inner = $(".carta-inner", t.el);
    const giro = inner.animate([
      { transform: "translateZ(0) rotateY(0deg) scale(1)", easing: "cubic-bezier(.4,0,.6,1)" },
      { transform: "translateZ(50px) rotateY(0deg) scale(1.05)", offset: 0.18, easing: "cubic-bezier(.5,0,.3,1)" },
      { transform: "translateZ(70px) rotateY(100deg) scale(1.09)", offset: 0.55, easing: "cubic-bezier(.2,.6,.3,1)" },
      { transform: "translateZ(14px) rotateY(188deg) scale(1.02)", offset: 0.84, easing: "cubic-bezier(.3,0,.3,1)" },
      { transform: "translateZ(0) rotateY(180deg) scale(1)" }
    ], { duration: duracao(1150), fill: "forwards" });

    await giro.finished.catch(() => {});
    if (!t.el.isConnected) return;
    t.el.classList.add("revelada");
    giro.cancel();
    t.revelada = true;
    t.virando = false;
    atualizarProgresso();
    setTimeout(() => slot.classList.remove("irradiando"), 400);

    t.el.setAttribute("aria-label", `${c.nome}, Caminho do ${c.caminho}. Abrir leitura completa.`);
    $(".slot-estado", slot).textContent = c.nome;
    anunciar(`Revelada: ${c.nome}, Caminho do ${c.caminho}.`);

    if (estado.modo === "unica") {
      renderUnica(c);
      dica("A leitura foi escrita no grimório. Toque na carta para ampliá-la.");
      rolarAte(el.grimorio);
    } else {
      const todas = estado.tiradas.length === 3 && estado.tiradas.every((x) => x.revelada);
      renderTripla(null);
      if (todas) {
        await espera(450);
        calcularConvergencia();
      } else {
        const faltam = 3 - estado.tiradas.filter((x) => x.revelada).length;
        dica(`${faltam === 1 ? "Falta uma carta" : `Faltam ${faltam} cartas`} para a Convergência do Destino.`);
      }
    }
  }

  function calcularConvergencia() {
    const cartas = estado.tiradas.map((t) => carta(t.idx));
    estado.convergencia = convergir(cartas);
    desenharFios(true);
    estado.tiradas.forEach((t) => t.el.classList.add("convergente"));
    renderTripla(estado.convergencia);
    dica("A Convergência do Destino foi calculada. Toque em uma carta para ampliá-la.");
    anunciar(`Convergência do Destino: ${estado.convergencia.tom.nome}.`);
    setTimeout(() => rolarAte($(".convergencia", el.grimorio)), duracao(700));
  }

  function rolarAte(alvo) {
    if (!alvo) return;
    const r = alvo.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.8 || r.top < 0) {
      alvo.scrollIntoView({ behavior: reduzMovimento.matches ? "auto" : "smooth", block: "start" });
    }
  }

  function desenharFios(animar) {
    const caixa = el.mesa.getBoundingClientRect();
    el.fios.setAttribute("viewBox", `0 0 ${caixa.width} ${caixa.height}`);
    const centros = $$(".slot-alvo", el.slots).map((a) => {
      const r = a.getBoundingClientRect();
      return { x: r.left + r.width / 2 - caixa.left, y: r.top + r.height * 0.42 - caixa.top };
    });
    if (centros.length < 3) { el.fios.innerHTML = ""; return; }
    const caminho = (a, b) => {
      const mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) - Math.abs(b.x - a.x) * 0.12;
      return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
    };
    el.fios.innerHTML = `<path d="${caminho(centros[0], centros[1])}"/><path d="${caminho(centros[1], centros[2])}"/>`;
    $$("path", el.fios).forEach((p) => {
      p.style.setProperty("--len", p.getTotalLength());
      if (!animar) { p.style.animation = "none"; p.style.strokeDashoffset = "0"; }
    });
  }

  async function recolher() {
    if (estado.ocupado) return;
    estado.ocupado = true;
    el.fios.innerHTML = "";
    const destino = topoDoMonte().getBoundingClientRect();

    const voos = estado.tiradas.map((t, i) => {
      t.el.getAnimations().forEach((a) => a.finish());
      const r = t.el.getBoundingClientRect();
      const dx = destino.left + destino.width / 2 - (r.left + r.width / 2);
      const dy = destino.top + destino.height / 2 - (r.top + r.height / 2);
      const s = destino.width / r.width;
      return t.el.animate([
        { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate3d(${dx * 0.3}px, ${dy * 0.3 - 30}px, 40px) scale(1.03) rotate(-3deg)`, opacity: 1, offset: 0.3 },
        { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${s}) rotate(6deg)`, opacity: 0 }
      ], { duration: duracao(700), delay: duracao(i * 80), easing: "cubic-bezier(.45,0,.25,1)", fill: "forwards" }).finished.catch(() => {});
    });
    await Promise.all(voos);

    estado.tiradas = [];
    estado.convergencia = null;
    estado.baralho = embaralhar();
    renderSlots();
    atualizarMonte();
    renderVazio();
    await animarEmbaralhar();
    estado.ocupado = false;
    dicaInicial();
    anunciar("As cartas voltaram ao monte e foram embaralhadas.");
  }

  async function trocarModo(modo) {
    if (modo === estado.modo || estado.ocupado) return;
    el.botoesModo.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.modo === modo)));
    el.modos.dataset.ativo = modo;
    if (estado.tiradas.length) {
      estado.modo = modo;
      await recolher();
    } else {
      estado.modo = modo;
      renderSlots();
      atualizarMonte();
      renderVazio();
      dicaInicial();
    }
  }

  function ativarInclinacao(alvo, gatilho, { referencia = () => gatilho, forca = 1 } = {}) {
    const destino = { rx: 0, ry: 0, z: 0, gx: 50, gy: 30 };
    const atual = { ...destino };
    let quadro = null;
    let caixa = null;

    function passo() {
      let resto = 0;
      for (const k in atual) {
        const d = destino[k] - atual[k];
        atual[k] += d * 0.13;
        resto += Math.abs(d);
      }
      const st = alvo.style;
      st.setProperty("--rx", `${atual.rx.toFixed(2)}deg`);
      st.setProperty("--ry", `${atual.ry.toFixed(2)}deg`);
      st.setProperty("--lift", `${atual.z.toFixed(2)}px`);
      st.setProperty("--gx", `${atual.gx.toFixed(1)}%`);
      st.setProperty("--gxm", `${(100 - atual.gx).toFixed(1)}%`);
      st.setProperty("--gy", `${atual.gy.toFixed(1)}%`);
      quadro = resto > 0.02 ? requestAnimationFrame(passo) : null;
    }
    const animar = () => { if (!quadro) quadro = requestAnimationFrame(passo); };

    gatilho.addEventListener("pointerenter", () => { caixa = null; });
    gatilho.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch" || reduzMovimento.matches) return;
      if (!caixa) caixa = referencia().getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - caixa.left) / caixa.width));
      const y = Math.min(1, Math.max(0, (e.clientY - caixa.top) / caixa.height));
      destino.rx = (0.5 - y) * 16 * forca;
      destino.ry = (x - 0.5) * 20 * forca;
      destino.z = 18 * forca;
      destino.gx = x * 100;
      destino.gy = y * 100;
      animar();
    });
    gatilho.addEventListener("pointerleave", () => {
      caixa = null;
      destino.rx = 0; destino.ry = 0; destino.z = 0;
      animar();
    });
  }

  function pulsarMonte() {
    if (reduzMovimento.matches) return;
    const topo = topoDoMonte();
    topo.animate([
      { boxShadow: "0 0 0 1px rgba(255,255,255,.55)" },
      { boxShadow: "0 0 0 1px rgba(255,255,255,0)" }
    ], { duration: 600, easing: "ease-out" });
  }

  function escrever(html) {
    el.grimorio.innerHTML = html;
    el.grimorio.classList.remove("escrevendo");
    void el.grimorio.offsetWidth;
    el.grimorio.classList.add("escrevendo");
  }

  function renderVazio() {
    escrever(estado.modo === "unica"
      ? `<p class="vazio-msg">Concentre-se numa pergunta e toque no monte para tirar uma carta.
           <small>O caminho revelado será escrito aqui.</small></p>`
      : `<p class="vazio-msg">Pense na sua questão e tire três cartas: Origem, Travessia e Destino.
           <small>Quando as três forem reveladas, a Convergência do Destino será calculada.</small></p>`);
  }

  const posLuz = (luz, faixa) => `${((luz + faixa) / (faixa * 2)) * 100}%`;
  const rotuloLuz = (l) => (l >= 2 ? "Luminosa" : l === 1 ? "Clara" : l === 0 ? "Neutra" : l === -1 ? "Velada" : "Sombria");

  function htmlLeitura(c, { idTitulo = "" } = {}) {
    const escada = Array.from({ length: 10 }, (_, i) => {
      const seq = i;
      if (seq === 0) return `<li class="ponta">Sequência 0<small>${c.seq0}</small></li>`;
      if (seq === 9) return `<li class="ponta">Sequência 9<small>${c.caminho}</small></li>`;
      return `<li aria-hidden="true"></li>`;
    }).join("");

    return `
      <header class="leitura-cabeca">
        <p class="leitura-numeral">Arcano ${c.romano}</p>
        <h2 ${idTitulo ? `id="${idTitulo}"` : ""}>${c.nome}</h2>
        <p class="leitura-en">${c.en}</p>
      </header>
      <div class="leitura-corpo">
        <aside class="ficha">
          <h3>Caminho do ${c.caminho}</h3>
          <p class="ficha-en">${c.caminhoEn} Pathway</p>
          <ol class="escada" aria-label="Da Sequência 9 até a Sequência 0">${escada}</ol>
          <dl class="ficha-dados">
            <div><dt>Constelação</dt><dd>${constelacoes[c.constelacao].nome}</dd></div>
            <div><dt>Elemento</dt><dd>${c.elemento}</dd></div>
            <div><dt>Polaridade</dt><dd>${rotuloLuz(c.luz)}
              <div class="polaridade" style="--pos:${posLuz(c.luz, 2)}" role="img" aria-label="Entre sombra e luz: ${rotuloLuz(c.luz)}"></div></dd></div>
          </dl>
          <ul class="palavras" aria-label="Palavras-chave">${c.palavras.map((p) => `<li>${p}</li>`).join("")}</ul>
        </aside>
        <div>
          <p class="essencia">${c.essencia}</p>
          <p class="texto-leitura">${c.leitura}</p>
          <dl class="notas">
            <div class="nota-sombra"><dt>Sombra</dt><dd>${c.sombra}</dd></div>
            <div><dt>Conselho</dt><dd>${c.conselho}</dd></div>
            <div><dt>Método de atuação</dt><dd>${c.atuacao}</dd></div>
          </dl>
        </div>
      </div>`;
  }

  function renderUnica(c) { escrever(htmlLeitura(c)); }

  function renderTripla(conv) {
    const pos = MODOS.tripla.posicoes;
    const entradas = pos.map((p, i) => {
      const t = estado.tiradas[i];
      if (!t || !t.revelada) {
        return `<section class="entrada oculta">
          <p class="entrada-pos">${p.num}. ${p.nome}</p>
          <p>${t ? "Carta na mesa, ainda virada." : "Aguardando a carta."}</p>
        </section>`;
      }
      const c = carta(t.idx);
      return `<section class="entrada">
        <p class="entrada-pos">${p.num}. ${p.nome}</p>
        <h3>${c.nome}</h3>
        <p class="entrada-caminho">Caminho do ${c.caminho}</p>
        <p class="entrada-frase">${c[p.chave]}</p>
        <ul class="palavras">${c.palavras.slice(0, 3).map((w) => `<li>${w}</li>`).join("")}</ul>
        <button type="button" class="link-ler" data-idx="${t.idx}">Ler o caminho completo</button>
      </section>`;
    }).join("");

    escrever(`
      <header class="tripla-cabeca">
        <h2>Leitura dos três caminhos</h2>
        <p>Origem é o que trouxe você até aqui, Travessia é o que atravessa agora, Destino é para onde as forças apontam.</p>
      </header>
      <div class="entradas">${entradas}</div>
      ${conv ? htmlConvergencia(conv) : ""}`);

    $$(".link-ler", el.grimorio).forEach((b) =>
      b.addEventListener("click", () => abrirDialogo(Number(b.dataset.idx))));

    if (conv) animarEstabilidade();
  }

  function htmlConvergencia(v) {
    const C = 2 * Math.PI * 52;
    const cor = v.estabilidade.valor >= 75 ? "#7fa59d" : v.estabilidade.valor >= 50 ? "#c2a15c" : v.estabilidade.valor >= 30 ? "#b8683e" : "#b0453b";
    const r = v.ressonancia;
    return `
      <section class="convergencia" aria-labelledby="conv-titulo">
        <header class="conv-cabeca">
          <h2 id="conv-titulo">Convergência do Destino</h2>
          <p class="conv-tom ${v.tom.classe}">${v.tom.nome}</p>
          <div class="conv-medidor">
            <div class="polaridade" style="--pos:${posLuz(v.luz, 6)}" role="img" aria-label="Balanço entre sombra e luz: ${v.luz > 0 ? "+" : ""}${v.luz}"></div>
            <div class="conv-medidor-rotulos"><span>Abismo</span><span>Névoa</span><span>Sol</span></div>
          </div>
        </header>

        <ol class="trilha" aria-label="Trilha das palavras-chave">${v.trilha.map((w) => `<li>${w}</li>`).join("")}</ol>

        <div class="conv-corpo">
          <div class="conv-texto">
            <p>${v.tom.texto}</p>
            <p>${v.narrativa}</p>
            <h3>${r.titulo}</h3>
            <p>${r.texto}</p>
            <h3>Trajetória: ${v.trajetoria.nome.toLowerCase()}</h3>
            <p>${v.trajetoria.texto} ${v.elementos.texto}</p>
            <h3>O Arcano Oculto</h3>
            <p>${v.textoOculto}</p>
          </div>
          <aside class="conv-lado">
            <figure class="oculto">
              <div class="oculto-carta"><img src="${imgCarta(v.oculto.carta)}" alt="${v.oculto.carta.nome}" loading="lazy"></div>
              <figcaption><strong>${v.oculto.carta.nome}</strong>Arcano oculto da soma ${v.oculto.soma}</figcaption>
            </figure>
            <div class="estabilidade" style="--cor-estab:${cor}">
              <svg viewBox="0 0 128 128" role="img" aria-label="Estabilidade espiritual: ${v.estabilidade.valor} por cento">
                <circle class="trilho" cx="64" cy="64" r="52" fill="none" stroke-width="8"/>
                <circle class="valor-arco" cx="64" cy="64" r="52" fill="none" stroke-width="8"
                  stroke-dasharray="${C}" stroke-dashoffset="${C}" data-alvo="${C * (1 - v.estabilidade.valor / 100)}"/>
                <text class="valor-num" x="64" y="74" text-anchor="middle">${v.estabilidade.valor}%</text>
              </svg>
              <strong>${v.estabilidade.rotulo}</strong>
              <p>${v.estabilidade.texto}</p>
            </div>
          </aside>
        </div>

        <div class="conselho-final">
          <div><h3>Conselho</h3><p>${v.conselho}</p></div>
          <div><h3>Método de atuação</h3><p>${v.atuacao}</p></div>
        </div>
      </section>`;
  }

  function animarEstabilidade() {
    const arco = $(".valor-arco", el.grimorio);
    if (!arco) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      arco.style.strokeDashoffset = arco.dataset.alvo;
    }));
  }

  function abrirDialogo(idx) {
    const c = carta(idx);
    el.dialogoCarta.innerHTML = `
      <div class="zoom"><img src="${imgCarta(c)}" alt="${c.nome} (${c.en})"><span class="brilho"></span></div>`;
    el.dialogoTexto.innerHTML = htmlLeitura(c, { idTitulo: "dialogo-titulo" });
    const zoom = $(".zoom", el.dialogoCarta);
    ativarInclinacao(zoom, zoom, { referencia: () => el.dialogoCarta, forca: 0.7 });
    if (typeof el.dialogo.showModal === "function") el.dialogo.showModal();
    else el.dialogo.setAttribute("open", "");
    el.dialogo.scrollTop = 0;
  }

  function fecharDialogo() {
    if (el.dialogo.open) el.dialogo.close();
  }

  el.monte.addEventListener("click", tirar);
  ativarInclinacao(el.monte, el.monte, { forca: 0.55 });

  document.addEventListener("keydown", (e) => {
    if (el.dialogo.open || e.altKey || e.ctrlKey || e.metaKey) return;
    const alvo = e.target;
    if (alvo.closest && alvo.closest("input, textarea, select, [contenteditable]")) return;
    const tecla = e.key.toLowerCase();
    if (tecla === " " || e.code === "Space") {
      if (alvo.closest && alvo.closest("button") && !alvo.closest(".modo")) return;
      e.preventDefault();
      tirar();
    } else if (tecla === "1" || tecla === "2" || tecla === "3") {
      const i = Number(tecla) - 1;
      if (i < modoAtual().max && estado.tiradas[i]) revelar(i);
    } else if (tecla === "n") {
      if (estado.tiradas.length) recolher();
    }
  });
  el.embaralhar.addEventListener("click", async () => {
    if (estado.ocupado || estado.tiradas.length) return;
    estado.ocupado = true;
    estado.baralho = embaralhar();
    await animarEmbaralhar();
    estado.ocupado = false;
    atualizarMonte();
    anunciar("O monte foi embaralhado.");
  });
  el.nova.addEventListener("click", recolher);
  el.botoesModo.forEach((b) => b.addEventListener("click", () => trocarModo(b.dataset.modo)));

  el.dialogoFechar.addEventListener("click", fecharDialogo);
  el.dialogo.addEventListener("click", (e) => { if (e.target === el.dialogo) fecharDialogo(); });

  let timerResize;
  window.addEventListener("resize", () => {
    clearTimeout(timerResize);
    timerResize = setTimeout(() => { if (estado.convergencia) desenharFios(false); }, 150);
  });

  el.modos.dataset.ativo = estado.modo;
  renderSlots();
  atualizarMonte();
  renderVazio();
  dicaInicial();

  window.addEventListener("load", () => {
    setTimeout(() => arcanos.forEach((c) => { const i = new Image(); i.src = imgCarta(c); }), 1500);
  });

  requestAnimationFrame(() => document.body.classList.add("carregado"));
})();
