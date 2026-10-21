(function () {
  "use strict";

  const { arcanos, constelacoes, elementos } = window.GRIMORIO;

  function aleatorio(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      const limite = Math.floor(0x100000000 / max) * max;
      const buf = new Uint32Array(1);
      do { window.crypto.getRandomValues(buf); } while (buf[0] >= limite);
      return buf[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function embaralhar() {
    const baralho = arcanos.map((_, i) => i);
    for (let i = baralho.length - 1; i > 0; i--) {
      const j = aleatorio(i + 1);
      [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
    }
    return baralho;
  }

  const somaDigitos = (n) => String(n).split("").reduce((s, d) => s + Number(d), 0);

  function arcanoOculto(cartas) {
    const soma = cartas.reduce((s, c) => s + c.n, 0);
    let r = soma;
    while (r > 21) r = somaDigitos(r);
    return { soma, carta: arcanos[r], eco: cartas.some((c) => c.n === r) };
  }

  const TONS = [
    { min: 4, nome: "Ascensão Solar", classe: "luz",
      texto: "A luz domina a mesa. As forças sorteadas favorecem clareza, crescimento e realização: a névoa se abre e o caminho fica visível." },
    { min: 1, nome: "Aurora Velada", classe: "aurora",
      texto: "Há mais luz do que sombra, mas a névoa ainda não se dissipou por completo. O caminho é favorável, desde que você não feche os olhos para os pequenos sinais de alerta." },
    { min: 0, nome: "Equilíbrio Cinzento", classe: "neutro",
      texto: "Luz e sombra se equilibram sobre a mesa, como a névoa cinzenta que separa um mundo do outro. Nada está decidido: o resultado dependerá mais das suas escolhas do que do acaso." },
    { min: -3, nome: "Crepúsculo", classe: "crepusculo",
      texto: "A sombra pesa mais que a luz. A leitura não é condenação, é aviso: há perdas, testes e verdades difíceis no caminho, e atravessá-los exige firmeza." },
    { min: -Infinity, nome: "Descida ao Abismo", classe: "abismo",
      texto: "As forças sombrias dominam a mesa. É um momento de risco real: cautela, recolhimento e proteção do que é essencial devem vir antes de qualquer ambição." }
  ];

  function tom(luz) {
    return TONS.find((t) => luz >= t.min);
  }

  function trajetoria([a, b, c]) {
    if (a.n < b.n && b.n < c.n) return { nome: "Ascendente",
      texto: "Os arcanos sobem em ordem: a jornada amadurece e cada etapa prepara a seguinte. O destino está sendo construído, não imposto." };
    if (a.n > b.n && b.n > c.n) return { nome: "Descendente",
      texto: "Os arcanos descem em ordem: é um retorno às origens. Algo precisa ser revisitado antes que se possa seguir adiante." };
    if (b.n > a.n && b.n > c.n) return { nome: "Ápice na travessia",
      texto: "O arcano mais alto está no centro: a travessia é o ponto decisivo. O que você fizer agora pesa mais do que o passado ou o futuro." };
    return { nome: "Vale na travessia",
      texto: "O arcano mais baixo está no centro: a travessia é um vale, um momento de humildade e recomeço entre duas forças maiores." };
  }

  function balancoElementos(cartas) {
    const cont = {};
    cartas.forEach((c) => { cont[c.elemento] = (cont[c.elemento] || 0) + 1; });
    const [dominante, qtd] = Object.entries(cont).sort((x, y) => y[1] - x[1])[0];
    if (qtd === 3) return { dominante, contagem: cont,
      texto: `O elemento ${dominante} reina sozinho sobre a leitura: tudo se resolve no plano de ${elementos[dominante]}. Força concentrada, mas sem contrapeso.` };
    if (qtd === 2) return { dominante, contagem: cont,
      texto: `Predomina o elemento ${dominante}: a questão se move pelo plano de ${elementos[dominante]}.` };
    const nomes = Object.keys(cont);
    return { dominante: null, contagem: cont,
      texto: `Três elementos distintos (${nomes.join(", ").replace(/, ([^,]*)$/, " e $1")}) disputam espaço: a leitura pede que você integre ${nomes.map((e) => elementos[e].split(",")[0]).join(", ").replace(/, ([^,]*)$/, " e $1")}.` };
  }

  function ressonancia(cartas) {
    const grupos = {};
    cartas.forEach((c) => { (grupos[c.constelacao] = grupos[c.constelacao] || []).push(c); });
    const [chave, membros] = Object.entries(grupos).sort((x, y) => y[1].length - x[1].length)[0];
    if (membros.length === 3) return { tipo: "absoluta", nivel: 3, constelacao: constelacoes[chave],
      titulo: "Convergência absoluta",
      texto: `Os três arcanos pertencem à ${constelacoes[chave].nome}. Pela lei da convergência, características do mesmo grupo se atraem: aqui o destino não se dispersa, ele se concentra. ${constelacoes[chave].texto}` };
    if (membros.length === 2) return { tipo: "vizinhos", nivel: 2, constelacao: constelacoes[chave], membros,
      titulo: "Caminhos vizinhos",
      texto: `${membros[0].nome} e ${membros[1].nome} pertencem à ${constelacoes[chave].nome}. ${constelacoes[chave].texto}` };
    return { tipo: "dispersa", nivel: 1, constelacao: null,
      titulo: "Encruzilhada",
      texto: "Três constelações diferentes se cruzam sobre a mesa. Os caminhos não são vizinhos e cada força puxa para um lado: a leitura fala de uma encruzilhada, em que será preciso conciliar naturezas que não nasceram para andar juntas." };
  }

  function estabilidade(cartas, resson, luz) {
    let v = 100 - cartas.reduce((s, c) => s + c.risco, 0);
    if (resson.nivel === 2) v += 8;
    if (resson.nivel === 3) v += 12;
    if (luz <= -4) v -= 6;
    v = Math.max(5, Math.min(98, v));
    let rotulo, texto;
    if (v >= 75) { rotulo = "Espírito estável"; texto = "As forças sorteadas cabem em você sem transbordar. A mente está firme."; }
    else if (v >= 50) { rotulo = "Inquietação latente"; texto = "Há tensão sob a superfície. Nada fora de controle, mas vale prestar atenção ao que o incomoda."; }
    else if (v >= 30) { rotulo = "Murmúrios na mente"; texto = "As forças em jogo são maiores do que parecem. Vá com calma e não carregue tudo sozinho."; }
    else { rotulo = "À beira da perda de controle"; texto = "A leitura pesa. Antes de avançar, encontre âncoras: pessoas, rotinas e limites que o mantenham inteiro."; }
    return { valor: v, rotulo, texto };
  }

  function convergir(cartas) {
    const [origem, travessia, destino] = cartas;
    const luz = cartas.reduce((s, c) => s + c.luz, 0);
    const t = tom(luz);
    const resson = ressonancia(cartas);
    const oculto = arcanoOculto(cartas);
    const traj = trajetoria(cartas);
    const elem = balancoElementos(cartas);
    const estab = estabilidade(cartas, resson, luz);

    const narrativa =
      `Na Origem, ${origem.origem} Na Travessia, ${travessia.travessia} No Destino, ${destino.destino}`;

    const textoOculto =
      `Somando os arcanos (${cartas.map((c) => c.n).join(" + ")} = ${oculto.soma})` +
      (oculto.soma > 21 ? " e reduzindo a soma" : "") +
      `, surge o Arcano Oculto: ${oculto.carta.nome}, do Caminho do ${oculto.carta.caminho}. É a força silenciosa por trás da leitura: “${oculto.carta.essencia}”` +
      (oculto.eco ? " O arcano oculto coincide com uma das cartas reveladas: a mensagem dela vem em dobro e não deve ser ignorada." : "");

    return {
      luz, tom: t, ressonancia: resson, oculto, textoOculto, trajetoria: traj,
      elementos: elem, estabilidade: estab, narrativa,
      trilha: cartas.map((c) => c.palavras[0]),
      conselho: destino.conselho,
      atuacao: travessia.atuacao
    };
  }

  window.ORACULO = Object.freeze({ embaralhar, convergir, arcanoOculto });
})();
