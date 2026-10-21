(function () {
  "use strict";

  const constelacoes = {
    misterio: {
      nome: "Constelação do Mistério",
      caminhos: "Vidente, Aprendiz e Saqueador",
      texto:
        "Os caminhos do Tolo, da Porta e do Erro são vizinhos: compartilham a mesma origem e podem trocar de natureza entre si. Quando se encontram numa leitura, o destino está sendo tecido por mãos que preferem não aparecer. Há disfarces, enganos e passagens secretas em jogo, e quem os domina conduz a história."
    },
    criador: {
      nome: "Constelação do Criador",
      caminhos: "Espectador, Bardo, Marinheiro, Leitor e Suplicante de Segredos",
      texto:
        "Cinco caminhos nascidos de uma mesma fonte criadora. Quando se encontram, mente, luz, tempestade, saber e segredo falam como partes de um único corpo. A leitura indica algo grande em construção, maior do que a vontade de uma só pessoa."
    },
    crepusculo: {
      nome: "Constelação do Crepúsculo",
      caminhos: "Insone, Coletor de Cadáveres e Guerreiro",
      texto:
        "Noite, morte e crepúsculo caminham juntos. Esses caminhos vizinhos guardam as fronteiras do fim: o sono, o além e a última defesa antes da escuridão. Juntos, anunciam a vigília sobre algo que está para acabar e a coragem para atravessar o escuro."
    },
    calamidade: {
      nome: "Constelação da Calamidade",
      caminhos: "Assassino e Caçador",
      texto:
        "Demônia e Sacerdote Vermelho são caminhos irmãos: encanto e guerra, desastre e conquista. Quando se encontram, um conflito se aproxima, e quem souber provocá-lo ou evitá-lo decidirá o desfecho."
    },
    saber: {
      nome: "Constelação do Saber",
      caminhos: "Bisbilhoteiro dos Mistérios e Erudito",
      texto:
        "Eremita e Paragon partilham a sede de conhecer: um pelo mistério, outro pela técnica. Juntos, indicam que a resposta virá do estudo, da investigação e da construção paciente do entendimento."
    },
    origem: {
      nome: "Constelação da Origem",
      caminhos: "Plantador e Boticário",
      texto:
        "A Mãe e a Lua são caminhos vizinhos da vida e da transformação. Fertilidade, cura e metamorfose se misturam: algo está sendo gerado, e não será igual ao que lhe deu origem."
    },
    queda: {
      nome: "Constelação da Queda",
      caminhos: "Criminoso e Prisioneiro",
      texto:
        "Abismo e Acorrentado são os caminhos vizinhos da queda: desejo sem freio e prisões carregadas por dentro. Juntos, alertam para o risco real de perder o controle e para a urgência de reconhecer os próprios limites."
    },
    ordem: {
      nome: "Constelação da Ordem",
      caminhos: "Advogado e Árbitro",
      texto:
        "O Imperador Negro e o Justiceiro são faces opostas da mesma lei: um governa pelas brechas, o outro pela regra. Quando se encontram, contratos, regras e julgamentos estão no centro da questão, e a forma como a ordem for estabelecida definirá o futuro."
    },
    roda: {
      nome: "A Roda Solitária",
      caminhos: "Monstro",
      texto:
        "O Caminho do Monstro não tem vizinhos: gira sozinho, como o próprio acaso."
    }
  };

  const elementos = {
    Fogo: "vontade, ação e paixão",
    Água: "emoção, intuição e sonho",
    Ar: "mente, palavra e decisão",
    Terra: "corpo, matéria e permanência"
  };

  const A = (o) => o;

  const arcanos = [
    A({
      n: 0, romano: "0", nome: "O Louco", en: "The Fool", img: "00-the-fool",
      caminho: "Vidente", caminhoEn: "Seer", seq0: "O Tolo", constelacao: "misterio",
      elemento: "Ar", luz: 1, risco: 16,
      palavras: ["Início", "Intuição", "Disfarce", "Salto no escuro"],
      essencia: "Quem dá o primeiro passo sem ver o chão é quem acaba enxergando acima da névoa.",
      leitura: "O Louco abre o Caminho do Vidente, a trilha que começa na adivinhação e termina no trono acima da névoa cinzenta. A carta fala de um começo que ainda não sabe o próprio nome: você está diante de algo novo, sem todas as respostas, e é exatamente esse o ponto. A intuição está mais aguçada do que a razão admite; sonhos, coincidências e pressentimentos merecem atenção. Por trás da aparente ingenuidade há uma inteligência que observa, se disfarça e espera o momento certo. Brinque com o destino, mas não esqueça quem você é por baixo da máscara.",
      sombra: "Imprudência e excesso de papéis: quem usa máscaras demais esquece o próprio rosto.",
      conselho: "Dê o passo, mas mantenha um fio que o leve de volta a si mesmo.",
      atuacao: "Aja como quem já sabe o fim da história e, ainda assim, se deixa surpreender.",
      origem: "uma decisão tomada às cegas, movida pela intuição, pôs tudo em movimento.",
      travessia: "você caminha sem mapa, e o acaso está mais a seu favor do que parece.",
      destino: "um recomeço se abre; o que parecia loucura se revelará visão."
    }),
    A({
      n: 1, romano: "I", nome: "O Mago", en: "The Magician", img: "01-the-magician",
      caminho: "Aprendiz", caminhoEn: "Apprentice", seq0: "Porta", constelacao: "misterio",
      elemento: "Ar", luz: 2, risco: 10,
      palavras: ["Vontade", "Passagem", "Engenho", "Novos rumos"],
      essencia: "Toda parede é uma porta para quem conhece a chave certa.",
      leitura: "O Mago guarda o Caminho do Aprendiz, cujo ápice é a Porta: o poder de atravessar, abrir e conectar lugares que pareciam isolados. Você já tem nas mãos as ferramentas de que precisa, mesmo que ainda não as reconheça. É hora de transformar intenção em gesto. A carta favorece estudo, viagens, mudanças de ambiente e aprendizados rápidos. Há uma passagem disponível agora, e ela não ficará aberta para sempre. Use o engenho, combine o que sabe e atravesse.",
      sombra: "Truques sem propósito: abrir portas apenas para fugir de cada sala.",
      conselho: "Escolha uma porta e atravesse-a por inteiro antes de procurar a próxima.",
      atuacao: "Aprenda como quem já ensina: cada lição registrada é uma chave forjada.",
      origem: "um talento ou conhecimento adquirido abriu o caminho que você trilha hoje.",
      travessia: "uma passagem está aberta; o que você aprender agora o levará longe.",
      destino: "uma porta se abrirá para outro lugar, outra cidade, outro capítulo."
    }),
    A({
      n: 2, romano: "II", nome: "A Sacerdotisa", en: "The High Priestess", img: "02-the-high-priestess",
      caminho: "Suplicante de Segredos", caminhoEn: "Secrets Suppliant", seq0: "Enforcado", constelacao: "criador",
      elemento: "Água", luz: -1, risco: 22,
      palavras: ["Segredo", "Silêncio", "Saber oculto", "Preço"],
      essencia: "Há verdades que só sussurram para quem aprendeu a calar.",
      leitura: "A Sacerdotisa aponta para o Caminho do Suplicante de Segredos, que culmina no Enforcado: aquele que ouve vozes do além e paga um preço por cada revelação. Entre as colunas da luz e da sombra, a carta pede recolhimento. Nem tudo deve ser dito agora; algumas respostas chegam quando se para de perguntar em voz alta. Há conhecimento oculto ao seu alcance, em sonhos, em papéis antigos, em conversas pela metade. Escute com cuidado, mas avalie quem sussurra. Nem toda voz que oferece segredos quer o seu bem.",
      sombra: "Ouvir o sussurro errado: segredos corrompem quem os guarda sem critério.",
      conselho: "Guarde o que descobriu até entender o preço de revelá-lo.",
      atuacao: "Ore em silêncio e anote o que ouvir, mas nunca responda de imediato.",
      origem: "algo foi escondido ou silenciado, e esse segredo ainda molda o presente.",
      travessia: "a resposta está oculta; recolha-se e escute antes de agir.",
      destino: "uma verdade guardada virá à tona e exigirá um sacrifício para ser compreendida."
    }),
    A({
      n: 3, romano: "III", nome: "A Imperatriz", en: "The Empress", img: "03-the-empress",
      caminho: "Plantador", caminhoEn: "Planter", seq0: "Mãe", constelacao: "origem",
      elemento: "Terra", luz: 2, risco: 8,
      palavras: ["Fertilidade", "Cuidado", "Abundância", "Crescimento"],
      essencia: "O que é plantado com paciência cresce mais alto que qualquer torre.",
      leitura: "A Imperatriz floresce no Caminho do Plantador, cuja Sequência 0 é a Mãe: a força que faz germinar, cura e sustenta a vida. É uma carta de colheita e de nutrição. Projetos, relações e ideias que você cultivou começam a dar frutos, e o momento pede generosidade com o próprio ritmo. A natureza não se apressa e, ainda assim, tudo realiza. Cuide do corpo, da casa e de quem depende de você, mas também se deixe cuidar. A abundância aqui é real, desde que seja partilhada.",
      sombra: "Cuidado que sufoca: a mãe que não deixa a semente virar árvore.",
      conselho: "Regue o que já existe antes de semear algo novo.",
      atuacao: "Cultive algo vivo com as próprias mãos e acompanhe o seu crescimento.",
      origem: "um vínculo de cuidado ou uma raiz familiar sustenta tudo o que veio depois.",
      travessia: "o que você plantou está brotando; nutra, não apresse.",
      destino: "a colheita virá farta, e será maior se for partilhada."
    }),
    A({
      n: 4, romano: "IV", nome: "O Imperador", en: "The Emperor", img: "04-the-emperor",
      caminho: "Advogado", caminhoEn: "Lawyer", seq0: "Imperador Negro", constelacao: "ordem",
      elemento: "Fogo", luz: 0, risco: 15,
      palavras: ["Autoridade", "Estrutura", "Acordo", "Brecha"],
      essencia: "Quem conhece a lei por inteiro sabe exatamente onde ela se curva.",
      leitura: "O Imperador governa o Caminho do Advogado, que ascende ao Imperador Negro: o soberano da ordem distorcida, que reina através das brechas da lei. A carta fala de estrutura, liderança e domínio sobre o próprio território. É hora de organizar, negociar e assumir posição. Contratos, hierarquias e acordos estão em destaque, e você tem força para fazê-los pender a seu favor. Mas a mesma inteligência que encontra lacunas nas regras pode corromper quem a usa. Governe com firmeza e lembre-se de que toda coroa pesa.",
      sombra: "Tirania sutil: usar as regras para justificar o injustificável.",
      conselho: "Leia as letras miúdas; o poder está nos detalhes do acordo.",
      atuacao: "Argumente como quem já venceu e escute como quem ainda pode perder.",
      origem: "uma autoridade, uma regra ou um acordo antigo definiu as fronteiras do seu caminho.",
      travessia: "é tempo de impor ordem, negociar e ocupar o lugar que lhe cabe.",
      destino: "você alcançará uma posição de comando e precisará decidir que tipo de soberano será."
    }),
    A({
      n: 5, romano: "V", nome: "O Hierofante", en: "The Hierophant", img: "05-the-hierophant",
      caminho: "Leitor", caminhoEn: "Reader", seq0: "Torre Branca", constelacao: "criador",
      elemento: "Terra", luz: 1, risco: 8,
      palavras: ["Saber", "Tradição", "Mestre", "Doutrina"],
      essencia: "Ler é escalar: cada página é um degrau da torre.",
      leitura: "O Hierofante preside o Caminho do Leitor, cujo cume é a Torre Branca: o conhecimento total e organizado, que tudo observa e deduz. A carta indica ensino, aprendizado formal e o valor da tradição. Um mestre, um livro ou uma instituição pode oferecer exatamente o que falta. É um bom momento para estudar com método, pedir orientação e respeitar os ritos que dão forma às coisas. A sabedoria aqui não é rebelde: é acumulada, paciente e transmitida. Mas nem toda verdade cabe nos livros da torre.",
      sombra: "Dogma: confundir o mapa com o território e a regra com a verdade.",
      conselho: "Procure quem já percorreu o caminho e ouça antes de discordar.",
      atuacao: "Leia como quem vai ensinar amanhã o que leu hoje.",
      origem: "uma tradição, escola ou mentor formou a base do seu entendimento.",
      travessia: "busque orientação e estudo; a resposta já está escrita em algum lugar.",
      destino: "você se tornará referência, alguém a quem outros recorrerão em busca de saber."
    }),
    A({
      n: 6, romano: "VI", nome: "Os Enamorados", en: "The Lovers", img: "06-the-lovers",
      caminho: "Assassino", caminhoEn: "Assassin", seq0: "Demônia", constelacao: "calamidade",
      elemento: "Ar", luz: -1, risco: 20,
      palavras: ["Escolha", "Desejo", "Encanto", "Vínculo"],
      essencia: "Toda escolha do coração esconde uma lâmina no buquê.",
      leitura: "Os Enamorados conduzem ao Caminho do Assassino, cuja Sequência 0 é a Demônia: encanto, sedução e o poder silencioso de quem conhece o desejo alheio. A carta fala de escolha e de vínculo. Há uma decisão afetiva ou de valores diante de você, e ela não admite meio-termo. A atração é real, mas pergunte o que ela pede em troca. Relações podem se aprofundar ou revelar faces ocultas. Quando o charme vira arma, quem o empunha também se fere. Escolha com o coração, mas não de olhos fechados.",
      sombra: "Manipulação e dependência: encantar para possuir.",
      conselho: "Antes de escolher, nomeie o que você está disposto a perder.",
      atuacao: "Seduza sem mentir: deixe que vejam apenas o que é verdadeiro.",
      origem: "um encontro ou uma escolha do coração desviou o rumo da sua história.",
      travessia: "uma decisão do coração se impõe; escolher também é renunciar.",
      destino: "um vínculo profundo se formará, ou um encanto será desfeito."
    }),
    A({
      n: 7, romano: "VII", nome: "O Carro", en: "The Chariot", img: "07-the-chariot",
      caminho: "Caçador", caminhoEn: "Hunter", seq0: "Sacerdote Vermelho", constelacao: "calamidade",
      elemento: "Água", luz: 0, risco: 18,
      palavras: ["Conquista", "Determinação", "Estratégia", "Guerra"],
      essencia: "A vitória pertence a quem conduz forças opostas para o mesmo lado.",
      leitura: "O Carro avança pelo Caminho do Caçador, que sobe até o Sacerdote Vermelho: o senhor da guerra, da conspiração e da conquista. Dois cavalos, um claro e um escuro, puxam em direções diferentes, e só a vontade do condutor os mantém alinhados. A carta anuncia movimento, competição e vitória possível, desde que você assuma as rédeas. Planeje como estrategista e aja como caçador: paciente na espreita, decisivo no golpe. Cuide para que o desejo de vencer não transforme cada encontro em batalha.",
      sombra: "Provocação e fúria: vencer a batalha e perder o que se defendia.",
      conselho: "Defina o alvo, prepare a armadilha e só então avance.",
      atuacao: "Cace com paciência: leia os rastros antes de disparar.",
      origem: "uma disputa ou conquista passada deu impulso ao seu caminho.",
      travessia: "você está em movimento; mantenha as rédeas firmes e o alvo claro.",
      destino: "uma vitória se aproxima, conquistada mais por estratégia do que por força."
    }),
    A({
      n: 8, romano: "VIII", nome: "A Força", en: "Strength", img: "08-strength",
      caminho: "Guerreiro", caminhoEn: "Warrior", seq0: "Gigante do Crepúsculo", constelacao: "crepusculo",
      elemento: "Fogo", luz: 1, risco: 12,
      palavras: ["Coragem", "Resistência", "Domínio de si", "Proteção"],
      essencia: "A verdadeira força é a mão calma sobre a juba do leão.",
      leitura: "A Força pertence ao Caminho do Guerreiro, que culmina no Gigante do Crepúsculo: o guardião que se ergue no fim do dia para proteger o que resta. A carta fala de coragem serena. Não é a força bruta que vence aqui, mas a firmeza de quem domina os próprios impulsos. Você tem mais resistência do que imagina e pode proteger os seus sem precisar ferir. Disciplina, treino e constância trazem resultado. Mesmo diante do crepúsculo, a luz que você sustenta impede a noite de chegar.",
      sombra: "Orgulho do guerreiro: tornar-se escudo de quem não pediu proteção.",
      conselho: "Treine o corpo e a paciência; ambos serão testados.",
      atuacao: "Proteja algo maior que você e deixe que isso lhe dê forma.",
      origem: "uma provação superada forjou a coragem que hoje o sustenta.",
      travessia: "mantenha a calma diante da fera; a sua firmeza a amansará.",
      destino: "você se tornará escudo para outros e encontrará glória no crepúsculo."
    }),
    A({
      n: 9, romano: "IX", nome: "O Eremita", en: "The Hermit", img: "09-the-hermit",
      caminho: "Bisbilhoteiro dos Mistérios", caminhoEn: "Mystery Pryer", seq0: "Eremita", constelacao: "saber",
      elemento: "Terra", luz: 0, risco: 15,
      palavras: ["Busca", "Solidão", "Lanterna", "Saber arcano"],
      essencia: "A lanterna ilumina poucos passos, e isso basta para seguir.",
      leitura: "O Eremita é ao mesmo tempo carta e destino do Caminho do Bisbilhoteiro dos Mistérios, cujo fim é o próprio Eremita: o sábio que contempla os segredos do universo e guarda os seus símbolos. A carta pede retiro e investigação. Afaste-se do ruído e procure, com a sua lanterna, o que se esconde nos detalhes. Estudos esotéricos, pesquisas profundas e introspecção são favorecidos. A solidão aqui não é abandono, é escolha. Mas certos conhecimentos olham de volta para quem os encara: pergunte apenas o que estiver pronto para ouvir.",
      sombra: "Curiosidade que consome: espiar o que não deveria ser visto.",
      conselho: "Afaste-se por um tempo; a resposta exige silêncio e foco.",
      atuacao: "Investigue um mistério até o fim antes de abrir outro.",
      origem: "uma busca solitária ou um período de recolhimento deu sentido ao seu caminho.",
      travessia: "recolha-se e investigue; a lanterna revelará o próximo passo.",
      destino: "você alcançará uma compreensão rara, que poucos ao seu redor terão."
    }),
    A({
      n: 10, romano: "X", nome: "A Roda da Fortuna", en: "Wheel of Fortune", img: "10-wheel-of-fortune",
      caminho: "Monstro", caminhoEn: "Monster", seq0: "Roda da Fortuna", constelacao: "roda",
      elemento: "Fogo", luz: 0, risco: 20,
      palavras: ["Sorte", "Ciclos", "Destino", "Virada"],
      essencia: "A roda gira para todos; o sábio aprende a ler o seu ritmo.",
      leitura: "A Roda da Fortuna é o nome final do Caminho do Monstro: aquele que percebe o destino antes dos outros e sente a sorte mudar no ar. É o único caminho da sua constelação, solitário como o próprio acaso. A carta anuncia uma virada: o que estava em baixa sobe, o que parecia firme pode girar. Pressentimentos merecem crédito agora. Aproveite os ventos favoráveis sem acreditar que durarão para sempre, e não se desespere com os contrários. Tudo o que gira volta a passar pelo mesmo ponto.",
      sombra: "Fatalismo e aposta cega: entregar ao acaso o que exigia escolha.",
      conselho: "Aproveite a maré enquanto sobe e guarde reservas para a descida.",
      atuacao: "Confie no pressentimento, mas registre-o para conferir se acertou.",
      origem: "um golpe de sorte, ou de azar, mudou o rumo de tudo.",
      travessia: "a roda está girando; esteja pronto para agarrar a oportunidade.",
      destino: "uma reviravolta virá, e o acaso trabalhará a seu favor se você estiver atento."
    }),
    A({
      n: 11, romano: "XI", nome: "A Justiça", en: "Justice", img: "11-justice",
      caminho: "Espectador", caminhoEn: "Spectator", seq0: "Visionário", constelacao: "criador",
      elemento: "Ar", luz: 1, risco: 12,
      palavras: ["Clareza", "Equilíbrio", "Mente", "Verdade"],
      essencia: "Quem enxerga o coração dos outros precisa, antes, pesar o próprio.",
      leitura: "A Justiça abre o Caminho do Espectador, cuja Sequência 0 é o Visionário: aquele que lê mentes, interpreta sonhos e conhece as engrenagens da psique. A balança aqui pesa intenções, não apenas atos. A carta pede imparcialidade e clareza: observe de fora antes de julgar, entenda as motivações antes de reagir. Acordos, questões legais e decisões éticas são favorecidos quando tratados com honestidade. Você perceberá o que os outros escondem e precisará decidir, com sabedoria, o que fazer com essa visão.",
      sombra: "A frieza de quem só observa: entender todos e não se envolver com ninguém.",
      conselho: "Pese os dois lados com a mesma honestidade com que pesa a si mesmo.",
      atuacao: "Observe sem interferir por um dia inteiro e anote o que perceber.",
      origem: "uma decisão justa, ou injusta, ainda ecoa no equilíbrio presente.",
      travessia: "observe com clareza; as intenções alheias estão mais visíveis do que parecem.",
      destino: "a verdade será vista e pesada, e o equilíbrio se restabelecerá."
    }),
    A({
      n: 12, romano: "XII", nome: "O Enforcado", en: "The Hanged Man", img: "12-the-hanged-man",
      caminho: "Marinheiro", caminhoEn: "Sailor", seq0: "Tirano", constelacao: "criador",
      elemento: "Água", luz: -1, risco: 18,
      palavras: ["Pausa", "Perspectiva", "Entrega", "Tempestade contida"],
      essencia: "Quem aceita ficar de cabeça para baixo vê o mar refletir o céu.",
      leitura: "O Enforcado navega o Caminho do Marinheiro, que sobe até o Tirano: o senhor das tempestades, dos mares e dos raios. Mas antes de comandar a tormenta é preciso suportá-la. A carta indica suspensão: algo está parado, e forçar o movimento agora traria mais perda do que ganho. Mude o ponto de vista. O que parece castigo pode ser preparação. Há uma força enorme acumulada em você, como o mar antes da tempestade, esperando o momento certo. Aqui, a paciência é um ato de poder.",
      sombra: "Sacrifício inútil, ou a fúria contida que explode no momento errado.",
      conselho: "Aceite a pausa e use-a para ver o que antes era invisível.",
      atuacao: "Não lute contra a maré: aprenda o ritmo das águas.",
      origem: "uma espera ou um sacrifício anterior acumulou a força que você carrega.",
      travessia: "tudo parece suspenso; inverta o olhar e a solução aparecerá.",
      destino: "a tempestade virá, e você será quem a comanda, não quem se afoga nela."
    }),
    A({
      n: 13, romano: "XIII", nome: "A Morte", en: "Death", img: "13-death",
      caminho: "Coletor de Cadáveres", caminhoEn: "Corpse Collector", seq0: "Morte", constelacao: "crepusculo",
      elemento: "Água", luz: -2, risco: 22,
      palavras: ["Fim", "Transformação", "Passagem", "Renascimento"],
      essencia: "Nada termina sem abrir espaço para o que vem.",
      leitura: "A Morte cavalga pelo Caminho do Coletor de Cadáveres, cuja Sequência 0 tem o mesmo nome: a guardiã do submundo e da fronteira entre os vivos e os mortos. Raramente ela fala de morte literal. Fala de fim de ciclo, de algo que precisa ficar para trás para que o novo possa existir. Uma fase, um hábito ou um vínculo chega ao término, e resistir apenas prolonga o luto. Há uma serenidade fria nesta carta: o fim é natural, inevitável e, de certo modo, justo. Do outro lado do rio, algo novo espera.",
      sombra: "Apego ao que já morreu: carregar fantasmas pela estrada.",
      conselho: "Enterre com respeito o que terminou, e não olhe para trás.",
      atuacao: "Despeça-se formalmente de algo do passado, por escrito ou em ritual.",
      origem: "um fim, uma perda ou um encerramento abriu o espaço do presente.",
      travessia: "algo está terminando; deixe ir para que a passagem se complete.",
      destino: "um ciclo se fechará, e você renascerá diferente do outro lado."
    }),
    A({
      n: 14, romano: "XIV", nome: "A Temperança", en: "Temperance", img: "14-temperance",
      caminho: "Erudito", caminhoEn: "Savant", seq0: "Paragon", constelacao: "saber",
      elemento: "Fogo", luz: 2, risco: 6,
      palavras: ["Equilíbrio", "Alquimia", "Síntese", "Ofício"],
      essencia: "A obra-prima nasce da medida exata entre dois elementos.",
      leitura: "A Temperança destila o Caminho do Erudito, que culmina no Paragon: o mestre do conhecimento aplicado, inventor e alquimista que transforma saber em criação. O anjo derrama a água de um cálice a outro sem perder uma gota: é a arte da medida. A carta favorece projetos que exigem paciência, técnica e a combinação de elementos diferentes. Integre opostos, ajuste proporções, teste e refaça. Saúde, harmonia e reconciliação também estão em destaque. A pressa é inimiga da alquimia; o equilíbrio é a sua matéria-prima.",
      sombra: "Perfeccionismo: refinar a fórmula para sempre e nunca entregar a obra.",
      conselho: "Misture com medida; pequenos ajustes trazem grandes resultados.",
      atuacao: "Construa algo com as mãos, testando e corrigindo até funcionar.",
      origem: "uma combinação paciente de experiências preparou o terreno do presente.",
      travessia: "busque o meio-termo; a solução está na mistura, não no extremo.",
      destino: "uma obra equilibrada nascerá de tudo o que você aprendeu a combinar."
    }),
    A({
      n: 15, romano: "XV", nome: "O Diabo", en: "The Devil", img: "15-the-devil",
      caminho: "Criminoso", caminhoEn: "Criminal", seq0: "Abismo", constelacao: "queda",
      elemento: "Terra", luz: -2, risco: 30,
      palavras: ["Desejo", "Corrente", "Tentação", "Sombra"],
      essencia: "As correntes mais fortes são as que escolhemos usar.",
      leitura: "O Diabo desce pelo Caminho do Criminoso, cujo fundo é o Abismo: o reino dos desejos sem freio, da corrupção e dos demônios que habitam o coração humano. A carta revela amarras: vícios, obsessões, relações ou pactos que prendem mais do que parecem. O olho no alto vê tudo, inclusive o que você prefere não admitir. Há poder aqui, e ele seduz. Mas toda barganha com a sombra cobra juros. Observe as correntes: muitas estão frouxas o bastante para serem retiradas. Reconhecer a prisão é o primeiro passo para sair dela.",
      sombra: "Entregar-se ao desejo e chamar isso de liberdade.",
      conselho: "Dê nome à corrente que o prende; o que é visto perde força.",
      atuacao: "Encare um desejo de frente e decida, conscientemente, não obedecê-lo.",
      origem: "um pacto, um vício ou uma tentação antiga ainda prende parte de você.",
      travessia: "há correntes ao seu redor; perceba quais você mesmo segura.",
      destino: "uma tentação poderosa virá, e escolher resistir definirá quem você é."
    }),
    A({
      n: 16, romano: "XVI", nome: "A Torre", en: "The Tower", img: "16-the-tower",
      caminho: "Prisioneiro", caminhoEn: "Prisoner", seq0: "Acorrentado", constelacao: "queda",
      elemento: "Fogo", luz: -2, risco: 28,
      palavras: ["Ruptura", "Colapso", "Revelação", "Libertação"],
      essencia: "O raio que derruba a torre também abre a cela.",
      leitura: "A Torre arde no Caminho do Prisioneiro, cuja Sequência 0 é o Acorrentado: aquele que carrega selos e prisões dentro de si para não se perder por completo. A carta anuncia ruptura súbita. Uma estrutura, crença ou situação que parecia sólida desmorona. É assustador, mas necessário: o que cai estava construído sobre bases falsas. Por trás do incêndio há libertação. Proteja o essencial e deixe o resto ruir. Cuidado com impulsos e com a perda de controle: a mente pode se tornar a prisão mais apertada.",
      sombra: "Perda de controle: libertar a fera em vez de libertar a si mesmo.",
      conselho: "Não tente segurar as paredes que caem; salve o que realmente importa.",
      atuacao: "Imponha a si mesmo um limite claro e cumpra-o, mesmo sob pressão.",
      origem: "uma queda ou ruptura brusca derrubou as certezas que você tinha.",
      travessia: "as estruturas estão rachando; não as escore, prepare-se para recomeçar.",
      destino: "algo ruirá de uma vez, e dos escombros sairá alguém mais livre."
    }),
    A({
      n: 17, romano: "XVII", nome: "A Estrela", en: "The Star", img: "17-the-star",
      caminho: "Insone", caminhoEn: "Sleepless", seq0: "Trevas", constelacao: "crepusculo",
      elemento: "Ar", luz: 1, risco: 12,
      palavras: ["Esperança", "Vigília", "Sonhos", "Cura"],
      essencia: "As estrelas só aparecem para quem permanece acordado na noite.",
      leitura: "A Estrela brilha sobre o Caminho do Insone, que se aprofunda até as Trevas: os guardiões da noite, senhores dos sonhos, do repouso e do silêncio. É a luz que só existe porque há escuridão ao redor. Depois da tempestade, a carta traz calma e esperança. Sonhos podem trazer mensagens, e a noite favorece a criação e a reflexão. Você está sendo guiado, mesmo quando não percebe. Cure-se devagar, como a água que cai no lago e se espalha em círculos. A vigília de hoje é a orientação de amanhã.",
      sombra: "Esperança passiva: esperar que a estrela caminhe no seu lugar.",
      conselho: "Confie no rumo, mesmo que o caminho esteja escuro.",
      atuacao: "Vigie a noite: anote os seus sonhos ao acordar, durante sete dias.",
      origem: "uma esperança mantida nos momentos escuros iluminou o seu caminho.",
      travessia: "é tempo de cura e confiança; os sonhos trazem orientação.",
      destino: "uma luz-guia surgirá na escuridão, e você saberá para onde ir."
    }),
    A({
      n: 18, romano: "XVIII", nome: "A Lua", en: "The Moon", img: "18-the-moon",
      caminho: "Boticário", caminhoEn: "Apothecary", seq0: "Lua", constelacao: "origem",
      elemento: "Água", luz: -1, risco: 20,
      palavras: ["Ilusão", "Instinto", "Mistério", "Metamorfose"],
      essencia: "Sob a lua, nada é o que parece, e tudo pode se tornar outra coisa.",
      leitura: "A Lua derrama a sua luz pálida sobre o Caminho do Boticário, que ascende até a própria Lua: senhora das poções, das transformações e das criaturas da noite. A carta fala de ambiguidade. O caminho entre as torres é real, mas está envolto em névoa. Emoções intensas, medos antigos e intuições confusas sobem à superfície, e nem tudo o que você sente corresponde ao que está acontecendo. Ao mesmo tempo, há uma magia potente aqui: a capacidade de transformar, curar e criar. Avance com cautela, confie no instinto e confira os fatos ao amanhecer.",
      sombra: "Ilusão e autoengano: beber a poção sem ler o rótulo.",
      conselho: "Desconfie das certezas noturnas; espere a luz do dia para decidir.",
      atuacao: "Prepare algo com cuidado, um chá, um remédio, uma receita, e observe a transformação.",
      origem: "um medo, uma ilusão ou um mistério não resolvido moldou o presente.",
      travessia: "o caminho está enevoado; siga o instinto, mas confira cada passo.",
      destino: "uma transformação profunda acontecerá, e o que era ilusão se dissolverá."
    }),
    A({
      n: 19, romano: "XIX", nome: "O Sol", en: "The Sun", img: "19-the-sun",
      caminho: "Bardo", caminhoEn: "Bard", seq0: "Sol", constelacao: "criador",
      elemento: "Fogo", luz: 2, risco: 5,
      palavras: ["Luz", "Alegria", "Clareza", "Vitalidade"],
      essencia: "Onde o sol canta, nenhuma sombra se esconde por muito tempo.",
      leitura: "O Sol resplandece no Caminho do Bardo, cuja Sequência 0 é o próprio Sol: o portador da luz que purifica, abençoa e expulsa a corrupção. É uma das cartas mais luminosas do baralho. Ela anuncia clareza, sucesso, saúde e alegria verdadeira. O que estava escondido vem à luz, e isso joga a seu favor. É momento de se mostrar, de celebrar e de inspirar os outros com o seu entusiasmo. A criança cavalga sem medo porque nada no caminho foi ocultado. Dias assim são para ser vividos com o rosto voltado para cima.",
      sombra: "Ofuscamento: brilhar tanto que não se percebe quem ficou à sombra.",
      conselho: "Seja visível; a sua luz encoraja os outros.",
      atuacao: "Celebre e elogie com sinceridade alguém que precisa ouvir.",
      origem: "um momento de alegria e confiança deu energia a tudo o que veio depois.",
      travessia: "a luz está com você; aja com transparência e entusiasmo.",
      destino: "o sucesso virá claro e merecido, sob plena luz do dia."
    }),
    A({
      n: 20, romano: "XX", nome: "O Julgamento", en: "Judgement", img: "20-judgement",
      caminho: "Árbitro", caminhoEn: "Arbiter", seq0: "Justiceiro", constelacao: "ordem",
      elemento: "Fogo", luz: 1, risco: 10,
      palavras: ["Chamado", "Veredito", "Despertar", "Ordem"],
      essencia: "Quando a trombeta soa, cada um responde por quem escolheu ser.",
      leitura: "O Julgamento ressoa no Caminho do Árbitro, que culmina no Justiceiro: aquele que estabelece leis, impõe ordem e julga com autoridade quase divina. A trombeta convoca um despertar. Algo do passado retorna para ser avaliado, e é hora de dar o veredito, sobre os outros e sobre si. A carta favorece decisões definitivas, retomadas e recomeços conscientes. Há um chamado que você vem ignorando, e ele não vai mais se calar. Responda. A ordem que você estabelecer agora valerá por muito tempo.",
      sombra: "Julgar sem misericórdia, ou condenar-se pelo que já foi perdoado.",
      conselho: "Dê o veredito que você vem adiando, com justiça e sem crueldade.",
      atuacao: "Estabeleça uma regra para si e cumpra-a como se fosse lei.",
      origem: "um julgamento, uma sentença ou um chamado antigo ainda ecoa em você.",
      travessia: "você é convocado a decidir; responder ao chamado é inevitável.",
      destino: "um despertar virá, e a sua decisão estabelecerá uma nova ordem."
    }),
    A({
      n: 21, romano: "XXI", nome: "O Mundo", en: "The World", img: "21-the-world",
      caminho: "Saqueador", caminhoEn: "Marauder", seq0: "Erro", constelacao: "misterio",
      elemento: "Terra", luz: 0, risco: 18,
      palavras: ["Totalidade", "Ciclo completo", "Brecha", "Astúcia"],
      essencia: "Todo sistema é perfeito até que alguém encontre o erro.",
      leitura: "O Mundo fecha os Arcanos Maiores pelo Caminho do Saqueador, cujo cume é o Erro: o ladrão que rouba destinos, falhas e até o próprio tempo, explorando as brechas de tudo o que existe. O Mundo é completo, mas nenhum sistema é perfeito. A carta celebra a conclusão de um grande ciclo: viagens, integração e realização. Ao mesmo tempo, avisa que as maiores conquistas exigem enxergar o que ninguém mais viu, a pequena falha que muda tudo. Você está prestes a fechar um ciclo. Faça isso com astúcia e não deixe que roubem o que você conquistou.",
      sombra: "Engano e parasitismo: tomar o que é dos outros e chamar de conquista.",
      conselho: "Revise o plano procurando a falha antes que outro a encontre.",
      atuacao: "Resolva um problema antigo por uma brecha que ninguém considerou.",
      origem: "a conclusão de um grande ciclo, ou uma brecha bem aproveitada, abriu este novo começo.",
      travessia: "tudo está quase completo; procure o detalhe que ainda escapa.",
      destino: "um ciclo se completará por inteiro, e um mundo novo se abrirá ao final."
    })
  ];

  window.GRIMORIO = Object.freeze({ arcanos, constelacoes, elementos });
})();
