/* ==========================================================================
   Imuniza — JavaScript único do site
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Ícones (SVG desenhados na mão, herdam a cor do texto)
     ------------------------------------------------------------------------ */
  var svg = function (caminho, tamanho) {
    return '<svg width="' + (tamanho || 22) + '" height="' + (tamanho || 22) +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + caminho + '</svg>';
  };

  var ICONES = {
    casa:       '<path d="M3.5 10.2 12 3.6l8.5 6.6V20a1 1 0 0 1-1 1h-4.5v-6h-6v6H4.5a1 1 0 0 1-1-1z"/>',
    calendario: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    historico:  '<path d="M9 4h6v2.5H9zM7 5.5H5.8A1.8 1.8 0 0 0 4 7.3v11.9A1.8 1.8 0 0 0 5.8 21h12.4a1.8 1.8 0 0 0 1.8-1.8V7.3a1.8 1.8 0 0 0-1.8-1.8H17"/><path d="M8.5 12h7M8.5 16h4.5"/>',
    carteira:   '<path d="M3.5 8.2A2.2 2.2 0 0 1 5.7 6h11.6a2.2 2.2 0 0 1 2.2 2.2v9.6a2.2 2.2 0 0 1-2.2 2.2H5.7a2.2 2.2 0 0 1-2.2-2.2z"/><path d="M3.5 10.5h17M16.4 14.6h.01"/>',
    perfil:     '<circle cx="12" cy="8.2" r="3.6"/><path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0"/>',
    painel:     '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
    enviar:     '<path d="M20.5 3.5 11 13M20.5 3.5l-6.2 17-3.3-7.5L3.5 9.7z"/>',
    pessoas:    '<circle cx="9.2" cy="8" r="3.3"/><path d="M3 19.6a6.2 6.2 0 0 1 12.4 0"/><path d="M16.2 5.1a3.3 3.3 0 0 1 0 6.4M17.8 14.2a5.4 5.4 0 0 1 3.4 5"/>',
    sair:       '<path d="M14.5 3.5h3.2a1.8 1.8 0 0 1 1.8 1.8v13.4a1.8 1.8 0 0 1-1.8 1.8h-3.2"/><path d="M9.5 16 5.5 12l4-4M5.5 12h9"/>',
    busca:      '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    menu:       '<path d="M4 7h16M4 12h16M4 17h16"/>',
    fechar:     '<path d="m6 6 12 12M18 6 6 18"/>',
    voltar:     '<path d="M14.5 19 8 12l6.5-7"/>',
    seta_dir:   '<path d="M9.5 5 16 12l-6.5 7"/>',
    seta_esq:   '<path d="M14.5 5 8 12l6.5 7"/>',
    vacina:     '<path d="M13.2 4.6 19.4 10.8M17.6 2.8l3.6 3.6M15.3 6.7 6.9 15.1l-.8 3.5 3.5-.8 8.4-8.4"/><path d="M4.5 19.5 3 21"/>',
    escudo:     '<path d="M12 3.2 19 6v5.5c0 4.2-2.9 7.6-7 9.3-4.1-1.7-7-5.1-7-9.3V6z"/><path d="M9.4 12.1 11.3 14l3.4-3.6"/>',
    check:      '<path d="m5 12.5 4.6 4.6L19 7.8"/>',
    alerta:     '<path d="M12 4.2 21 19.6H3z"/><path d="M12 10v4M12 16.8h.01"/>',
    info:       '<circle cx="12" cy="12" r="8.6"/><path d="M12 11.2v5M12 8.1h.01"/>',
    relogio:    '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 2"/>'
  };

  function icone(nome, tamanho) {
    return ICONES[nome] ? svg(ICONES[nome], tamanho) : "";
  }

  /* ------------------------------------------------------------------------
     2. Menus
     ------------------------------------------------------------------------ */
  var MENUS = {
    usuario: {
      classe: "",
      linha: "Carteira Digital",
      pessoa: { nome: "Laurêncio Silva", detalhe: "CPF 123.456.789-90", iniciais: "LS", cor: "" },
      sair: "index.html",
      itens: [
        { id: "inicio",     rotulo: "Início",          href: "inicio.html",     icone: "casa",       aba: true },
        { id: "calendario", rotulo: "Calendário",      href: "calendario.html", icone: "calendario", aba: true },
        { id: "historico",  rotulo: "Histórico",       href: "historico.html",  icone: "historico",  aba: true },
        { id: "carteira",   rotulo: "Carteira Digital",href: "carteira.html",   icone: "carteira",   aba: false },
        { id: "perfil",     rotulo: "Perfil",          href: "perfil.html",     icone: "perfil",     aba: true }
      ]
    },
    admin: {
      classe: "lateral--admin",
      linha: "Painel Admin",
      pessoa: { nome: "Amélia Oliveira", detalhe: "Administradora", iniciais: "AO", cor: "avatar--roxo" },
      sair: "admin.html",
      itens: [
        { id: "visao",      rotulo: "Visão geral",       href: "admin-visao.html",    icone: "painel",     aba: true },
        { id: "eventos",    rotulo: "Envio de eventos",  href: "admin-eventos.html",  icone: "enviar",     aba: true },
        { id: "envios",     rotulo: "Histórico de envios", href: "admin-envios.html", icone: "historico",  aba: true },
        { id: "cadastro",   rotulo: "Cadastro e busca",  href: "admin-cadastro.html", icone: "pessoas",    aba: true },
        { id: "meuperfil",  rotulo: "Meu perfil",        href: "admin-perfil.html",   icone: "perfil",     aba: true }
      ]
    }
  };

  /* Rótulos curtos para a barra de abas do celular */
  var ROTULO_CURTO = {
    calendario: "Calendário",
    historico: "Histórico",
    visao: "Visão",
    eventos: "Eventos",
    envios: "Envios",
    cadastro: "Cadastro",
    meuperfil: "Perfil"
  };

  /* ------------------------------------------------------------------------
     3. Montagem da casca (lateral, topo e abas)
     ------------------------------------------------------------------------ */
  function marca(area) {
    var m = MENUS[area];
    var clara = area === "admin" ? " marca--clara" : "";
    return '<div class="marca' + clara + '">' +
      '<img class="marca__simbolo" src="assets/img/logo-icone.png" alt="" width="44" height="44">' +
      '<span class="marca__textos">' +
        '<span class="marca__nome">imuniza</span>' +
        '<span class="marca__linha">' + m.linha + '</span>' +
      '</span></div>';
  }

  function montarLateral(area, telaAtual) {
    var m = MENUS[area];
    var lateral = document.getElementById("lateral");
    if (!lateral) return;

    lateral.className = "lateral " + m.classe;
    lateral.setAttribute("aria-label", "Menu principal");

    var html = '<div class="lateral__cabecalho">' + marca(area) +
      '<button class="lateral__fechar" type="button" data-fechar-menu aria-label="Fechar menu">' +
      icone("fechar", 20) + '</button></div>';

    html += '<nav class="lateral__menu">';
    m.itens.forEach(function (item) {
      var atual = item.id === telaAtual ? ' aria-current="page"' : "";
      html += '<a class="lateral__item" href="' + item.href + '"' + atual + '>' +
        icone(item.icone, 20) + '<span>' + item.rotulo + '</span></a>';
    });
    html += "</nav>";

    html += '<div>' +
      '<div class="lateral__usuario">' +
        '<span class="avatar ' + m.pessoa.cor + '">' + m.pessoa.iniciais + '</span>' +
        '<div><b>' + m.pessoa.nome + '</b><span>' + m.pessoa.detalhe + '</span></div>' +
      '</div>' +
      '<a class="lateral__sair" href="' + m.sair + '">' + icone("sair", 20) +
      '<span>Sair da conta</span></a>' +
      '</div>';

    lateral.innerHTML = html;
  }

  function montarAbas(area, telaAtual) {
    var m = MENUS[area];
    var abas = document.getElementById("abas");
    if (!abas) return;

    var html = '<ul class="abas__lista">';
    m.itens.filter(function (i) { return i.aba; }).forEach(function (item) {
      var atual = item.id === telaAtual ? ' aria-current="page"' : "";
      var rotulo = ROTULO_CURTO[item.id] || item.rotulo;
      html += '<li style="flex:1"><a class="abas__item" href="' + item.href + '"' + atual + '>' +
        icone(item.icone, 22) + '<span>' + rotulo + '</span></a></li>';
    });
    html += "</ul>";

    abas.className = "abas";
    abas.setAttribute("aria-label", "Navegação");
    abas.innerHTML = html;
  }

  function montarTopo() {
    var topo = document.querySelector(".topo");
    if (!topo || topo.querySelector(".topo__menu")) return;

    var botao = document.createElement("button");
    botao.type = "button";
    botao.className = "topo__menu";
    botao.setAttribute("aria-label", "Abrir menu");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("data-abrir-menu", "");
    botao.innerHTML = icone("menu", 22);
    topo.insertBefore(botao, topo.firstChild);
  }

  /* ------------------------------------------------------------------------
     4. Gaveta do menu (tablet e celular)
     ------------------------------------------------------------------------ */
  function ligarGaveta() {
    var lateral = document.getElementById("lateral");
    if (!lateral) return;

    var cortina = document.createElement("div");
    cortina.className = "cortina";
    document.body.appendChild(cortina);

    function abrir() {
      lateral.classList.add("aberta");
      cortina.classList.add("ativa");
      document.body.style.overflow = "hidden";
      var botao = document.querySelector("[data-abrir-menu]");
      if (botao) botao.setAttribute("aria-expanded", "true");
      var primeiro = lateral.querySelector(".lateral__fechar");
      if (primeiro) primeiro.focus();
    }
    function fechar() {
      lateral.classList.remove("aberta");
      cortina.classList.remove("ativa");
      document.body.style.overflow = "";
      var botao = document.querySelector("[data-abrir-menu]");
      if (botao) { botao.setAttribute("aria-expanded", "false"); botao.focus(); }
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-abrir-menu]")) { abrir(); }
      else if (e.target.closest("[data-fechar-menu]")) { fechar(); }
    });
    cortina.addEventListener("click", fechar);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lateral.classList.contains("aberta")) fechar();
    });
  }

  /* ------------------------------------------------------------------------
     5. Ícones soltos no HTML: <span data-icone="casa"></span>
     ------------------------------------------------------------------------ */
  function preencherIcones(raiz) {
    (raiz || document).querySelectorAll("[data-icone]").forEach(function (el) {
      if (el.dataset.pronto) return;
      el.innerHTML = icone(el.dataset.icone, parseInt(el.dataset.tamanho, 10) || 22);
      el.dataset.pronto = "1";
    });
  }

  /* ------------------------------------------------------------------------
     6. Histórico vacinal: filtros, busca e painel de detalhes
     ------------------------------------------------------------------------ */
  var DETALHES = {
    covid: {
      nome: "Covid-19", capa: "3 doses aplicadas · 2022",
      info: [["Total de doses", "3"], ["Intervalo", "90 dias"], ["Situação", "Completa"]],
      aplicada: [["Dose", "3ª"], ["Local", "UBS Centro"], ["Lote", "CV2022A4471"]],
      proxima: null
    },
    gripe: {
      nome: "Gripe", capa: "Dose única · 2024",
      info: [["Total de doses", "1"], ["Intervalo", "Anual"], ["Próxima dose", "2025"]],
      aplicada: [["Dose", "Única"], ["Local", "UBS Vila Nova"], ["Lote", "GR2024X118"]],
      proxima: null
    },
    sarampo: {
      nome: "Sarampo", capa: "2 doses aplicadas · 2023",
      info: [["Total de doses", "2"], ["Intervalo", "30 dias"], ["Situação", "Completa"]],
      aplicada: [["Dose", "2ª"], ["Local", "UBS Centro"], ["Lote", "SR2023B902"]],
      proxima: null
    },
    hepatiteb: {
      nome: "Hepatite B", capa: "20/06/2025 · faltam 12 dias",
      info: [["Total de doses", "3"], ["Intervalo", "30 dias"], ["Próxima dose", "20/06/2025"]],
      aplicada: [["Dose", "1ª"], ["Local", "UBS Centro"], ["Lote", "BTTn40028922"]],
      proxima: [["Dose", "2ª"], ["Local", "UBS Centro"], ["Lote", "BTTn08002212"]]
    },
    febreamarela: {
      nome: "Febre Amarela", capa: "Prevista para 2026",
      info: [["Total de doses", "1"], ["Intervalo", "Dose única"], ["Situação", "Pendente"]],
      aplicada: null,
      proxima: [["Dose", "1ª"], ["Local", "UBS Vila Nova"], ["Previsão", "10/07/2026"]]
    },
    tetano: {
      nome: "Tétano", capa: "Reforço vencido em 2026",
      info: [["Total de doses", "1 reforço"], ["Intervalo", "10 anos"], ["Situação", "Vencida"]],
      aplicada: null,
      proxima: [["Dose", "Reforço"], ["Local", "UBS Centro"], ["Previsão", "Procurar a unidade"]]
    }
  };

  function blocoDados(titulo, linhas) {
    if (!linhas) return "";
    var html = '<div class="cartao cartao--liso"><h3 class="cartao__titulo">' + titulo + '</h3><ul class="dados">';
    linhas.forEach(function (par) {
      html += '<li><span class="chave">' + par[0] + '</span><span class="valor">' + par[1] + '</span></li>';
    });
    return html + "</ul></div>";
  }

  function ligarHistorico() {
    var lista = document.getElementById("lista-vacinas");
    var painel = document.getElementById("detalhe");
    if (!lista || !painel) return;

    function mostrar(chave, abrir) {
      var d = DETALHES[chave];
      if (!d) return;
      painel.innerHTML =
        '<button class="detalhe__voltar" type="button" data-fechar-detalhe>' +
          icone("voltar", 20) + " Voltar" +
        "</button>" +
        '<div class="detalhe__capa"><small>Vacina</small><b>' + d.nome + "</b><span>" + d.capa + "</span></div>" +
        blocoDados("Informações da vacina", d.info) +
        blocoDados("Dose já aplicada", d.aplicada) +
        blocoDados("Próxima dose", d.proxima) +
        '<p style="text-align:center;font-size:14px;color:var(--texto-med)">Dúvidas? ' +
        '<a class="link" href="#">Suporte</a></p>';
      if (abrir) painel.classList.add("aberto");
      preencherIcones(painel);
    }

    lista.addEventListener("click", function (e) {
      var botao = e.target.closest(".vacina");
      if (!botao) return;
      lista.querySelectorAll(".vacina").forEach(function (b) {
        b.setAttribute("aria-selected", b === botao ? "true" : "false");
      });
      mostrar(botao.dataset.vacina, true);
    });

    /* Estado inicial: mostra a vacina já marcada, sem abrir a tela cheia no celular */
    var inicial = lista.querySelector('.vacina[aria-selected="true"]') ||
                  lista.querySelector(".vacina");
    if (inicial) mostrar(inicial.dataset.vacina, false);

    painel.addEventListener("click", function (e) {
      if (e.target.closest("[data-fechar-detalhe]")) painel.classList.remove("aberto");
    });

    /* Filtros Todas / Aplicadas / Pendentes */
    var filtros = document.getElementById("filtros");
    if (filtros) {
      filtros.addEventListener("click", function (e) {
        var b = e.target.closest(".filtro");
        if (!b) return;
        filtros.querySelectorAll(".filtro").forEach(function (f) {
          f.setAttribute("aria-pressed", f === b ? "true" : "false");
        });
        aplicarFiltros();
      });
    }

    /* Busca por nome */
    var busca = document.getElementById("busca-vacina");
    if (busca) busca.addEventListener("input", aplicarFiltros);

    function aplicarFiltros() {
      var ativo = filtros ? filtros.querySelector('[aria-pressed="true"]') : null;
      var grupo = ativo ? ativo.dataset.filtro : "todas";
      var termo = busca ? busca.value.trim().toLowerCase() : "";

      lista.querySelectorAll(".vacina").forEach(function (item) {
        var casaGrupo = grupo === "todas" || item.dataset.grupo === grupo;
        var casaTermo = !termo || item.textContent.toLowerCase().indexOf(termo) !== -1;
        item.classList.toggle("oculto", !(casaGrupo && casaTermo));
      });

      /* Esconde o rótulo do grupo que ficou vazio */
      lista.querySelectorAll("[data-rotulo]").forEach(function (rotulo) {
        var visiveis = lista.querySelectorAll(
          '.vacina[data-grupo="' + rotulo.dataset.rotulo + '"]:not(.oculto)'
        );
        rotulo.classList.toggle("oculto", visiveis.length === 0);
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. Calendário
     ------------------------------------------------------------------------ */
  var MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  /* Datas marcadas, no formato "aaaa-m-d" (mês de 0 a 11) */
  var MARCADAS = ["2025-8-10", "2025-8-23", "2025-5-15", "2025-5-20", "2025-6-10"];

  function ligarCalendario() {
    var raiz = document.getElementById("calendario");
    if (!raiz) return;

    var hoje = { ano: 2026, mes: 10 }; 

    function desenhar() {
      var primeiro = new Date(hoje.ano, hoje.mes, 1).getDay();
      var totalDias = new Date(hoje.ano, hoje.mes + 1, 0).getDate();
      var diasAntes = new Date(hoje.ano, hoje.mes, 0).getDate();

      var html = "";
      DIAS_SEMANA.forEach(function (d) {
        html += '<div class="calendario__dia-semana">' + d + "</div>";
      });

      /* Dias do mês anterior */
      for (var a = primeiro - 1; a >= 0; a--) {
        html += '<div class="calendario__dia calendario__dia--fora">' + (diasAntes - a) + "</div>";
      }
      /* Dias do mês */
      for (var d2 = 1; d2 <= totalDias; d2++) {
        var chave = hoje.ano + "-" + hoje.mes + "-" + d2;
        var marcado = MARCADAS.indexOf(chave) !== -1;
        html += '<div class="calendario__dia' + (marcado ? " calendario__dia--marcado" : "") + '"' +
          (marcado ? ' title="Dose ou campanha agendada"' : "") + ">" + d2 + "</div>";
      }
      /* Completa a última semana */
      var usados = primeiro + totalDias;
      var faltam = (7 - (usados % 7)) % 7;
      for (var f = 1; f <= faltam; f++) {
        html += '<div class="calendario__dia calendario__dia--fora">' + f + "</div>";
      }

      raiz.innerHTML = html;
      var titulo = document.getElementById("calendario-mes");
      if (titulo) titulo.textContent = MESES[hoje.mes] + " de " + hoje.ano;
    }

    function mover(passo) {
      hoje.mes += passo;
      if (hoje.mes > 11) { hoje.mes = 0; hoje.ano++; }
      if (hoje.mes < 0)  { hoje.mes = 11; hoje.ano--; }
      desenhar();
    }

    var anterior = document.getElementById("mes-anterior");
    var proximo  = document.getElementById("mes-proximo");
    if (anterior) anterior.addEventListener("click", function () { mover(-1); });
    if (proximo)  proximo.addEventListener("click", function () { mover(1); });

    desenhar();
  }

  /* ------------------------------------------------------------------------
     8. Histórico de envios do admin: tabela no desktop, cartões no celular
     ------------------------------------------------------------------------ */
  var ENVIOS = [
    { evento: "Campanha de Gripe", vacina: "Gripe 2024",        periodo: "15/06 a 30/06", publico: "6 meses a 5 anos",      alcance: "1.248", status: "Enviado"  },
    { evento: "Reforço Covid-19",  vacina: "Covid-19 2022",     periodo: "02/03 a 20/03", publico: "Adultos 18+",           alcance: "3.402", status: "Enviado"  },
    { evento: "Multivacinação",    vacina: "Sarampo 2023",      periodo: "10/09 a 30/09", publico: "Crianças e adolescentes", alcance: "986",  status: "Enviado"  },
    { evento: "Reforço de Tétano", vacina: "Tétano 2026",       periodo: "01/10 a 15/10", publico: "Adultos 20+",           alcance: "1.510", status: "Pendente" },
    { evento: "Febre Amarela",     vacina: "Febre Amarela 2026",periodo: "05/11 a 25/11", publico: "Menores de 1 ano",      alcance: "742",   status: "Pendente" }
  ];

  function ligarEnvios() {
    var corpo = document.getElementById("corpo-envios");
    var cartoes = document.getElementById("cartoes-envios");
    if (!corpo || !cartoes) return;

    var buscaEl = document.getElementById("busca-envio");
    var statusEl = document.getElementById("filtro-status");

    function desenhar() {
      var termo = buscaEl ? buscaEl.value.trim().toLowerCase() : "";
      var status = statusEl ? statusEl.value : "todos";

      var linhas = ENVIOS.filter(function (e) {
        var casaStatus = status === "todos" || e.status.toLowerCase() === status;
        var casaTermo = !termo ||
          (e.evento + " " + e.vacina).toLowerCase().indexOf(termo) !== -1;
        return casaStatus && casaTermo;
      });

      if (linhas.length === 0) {
        corpo.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--texto-med);padding:32px">' +
          "Nenhum evento encontrado.</td></tr>";
        cartoes.innerHTML = '<p style="text-align:center;color:var(--texto-med);padding:24px">' +
          "Nenhum evento encontrado.</p>";
        return;
      }

      corpo.innerHTML = linhas.map(function (e) {
        var cor = e.status === "Enviado" ? "verde" : "ambar";
        return "<tr>" +
          '<td><span class="tabela__evento"><span class="icone-quadro icone-quadro--peq icone-quadro--' +
            cor + '" data-icone="' + (e.status === "Enviado" ? "check" : "relogio") + '" data-tamanho="18"></span>' +
            e.evento + "</span></td>" +
          "<td>" + e.vacina + "</td>" +
          "<td>" + e.periodo + "</td>" +
          "<td>" + e.publico + "</td>" +
          "<td>" + e.alcance + "</td>" +
          '<td><span class="etiqueta etiqueta--' + cor + '">' + e.status + "</span></td>" +
          "</tr>";
      }).join("");

      cartoes.innerHTML = linhas.map(function (e) {
        var cor = e.status === "Enviado" ? "verde" : "ambar";
        return '<article class="cartao-linha">' +
          '<div class="cartao-linha__topo">' +
            '<span class="icone-quadro icone-quadro--peq icone-quadro--' + cor +
              '" data-icone="' + (e.status === "Enviado" ? "check" : "relogio") + '" data-tamanho="18"></span>' +
            "<b>" + e.evento + "</b>" +
            '<span class="etiqueta etiqueta--' + cor + '">' + e.status + "</span>" +
          "</div>" +
          '<ul class="dados" style="margin-top:0">' +
            '<li><span class="chave">Vacina</span><span class="valor">' + e.vacina + "</span></li>" +
            '<li><span class="chave">Período</span><span class="valor">' + e.periodo + "</span></li>" +
            '<li><span class="chave">Público-alvo</span><span class="valor">' + e.publico + "</span></li>" +
            '<li><span class="chave">Alcance</span><span class="valor">' + e.alcance + "</span></li>" +
          "</ul></article>";
      }).join("");

      preencherIcones(corpo);
      preencherIcones(cartoes);
    }

    if (buscaEl) buscaEl.addEventListener("input", desenhar);
    if (statusEl) statusEl.addEventListener("change", desenhar);
    desenhar();
  }

  /* ------------------------------------------------------------------------
     9. Modais de confirmação
     ------------------------------------------------------------------------ */
  function ligarModais() {
    document.addEventListener("click", function (e) {
      var abrir = e.target.closest("[data-abrir-modal]");
      if (abrir) {
        var alvo = document.getElementById(abrir.dataset.abrirModal);
        if (alvo) {
          e.preventDefault();
          alvo.classList.add("ativo");
          document.body.style.overflow = "hidden";
        }
        return;
      }
      var fechar = e.target.closest("[data-fechar-modal]");
      if (fechar || e.target.classList.contains("modal")) {
        var modal = e.target.closest(".modal");
        if (modal) {
          modal.classList.remove("ativo");
          document.body.style.overflow = "";
        }
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".modal.ativo").forEach(function (m) {
        m.classList.remove("ativo");
        document.body.style.overflow = "";
      });
    });
  }

  /* ------------------------------------------------------------------------
     10. Formulários de demonstração (sem back-end)
     ------------------------------------------------------------------------ */
  function ligarFormularios() {
    document.querySelectorAll("form[data-destino]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        window.location.href = form.dataset.destino;
      });
    });
  }

  /* ------------------------------------------------------------------------
     11. Máscaras simples de CPF e data
     ------------------------------------------------------------------------ */
  function ligarMascaras() {
    document.querySelectorAll('[data-mascara="cpf"]').forEach(function (el) {
      el.addEventListener("input", function () {
        var v = el.value.replace(/\D/g, "").slice(0, 11);
        el.value = v
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      });
    });
    document.querySelectorAll('[data-mascara="data"]').forEach(function (el) {
      el.addEventListener("input", function () {
        var v = el.value.replace(/\D/g, "").slice(0, 8);
        el.value = v
          .replace(/(\d{2})(\d)/, "$1/$2")
          .replace(/(\d{2})(\d)/, "$1/$2");
      });
    });
  }

  /* ------------------------------------------------------------------------
     12. Início
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    var area = document.body.dataset.area;   /* "usuario" ou "admin" */
    var tela = document.body.dataset.tela;   /* id do item de menu   */

    if (area && MENUS[area]) {
      montarLateral(area, tela);
      montarAbas(area, tela);
      montarTopo();
      ligarGaveta();
    }

    preencherIcones();
    ligarHistorico();
    ligarCalendario();
    ligarEnvios();
    ligarModais();
    ligarFormularios();
    ligarMascaras();
  });
})();
