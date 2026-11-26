(function () {
  "use strict";

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

  var MENUS = {
    usuario: {
      classe: "",
      linha: "Carteira Digital",
      cor: "",
      login: "index.html",
      itens: [
        { id: "inicio",     rotulo: "Início",           href: "inicio.html",     icone: "casa",       aba: true },
        { id: "calendario", rotulo: "Calendário",       href: "calendario.html", icone: "calendario", aba: true },
        { id: "historico",  rotulo: "Histórico",        href: "historico.html",  icone: "historico",  aba: true },
        { id: "carteira",   rotulo: "Carteira Digital", href: "carteira.html",   icone: "carteira",   aba: false },
        { id: "perfil",     rotulo: "Perfil",           href: "perfil.html",     icone: "perfil",     aba: true }
      ]
    },
    admin: {
      classe: "lateral--admin",
      linha: "Painel Admin",
      cor: "avatar--roxo",
      login: "admin.html",
      itens: [
        { id: "visao",     rotulo: "Visão geral",         href: "admin-visao.html",    icone: "painel",    aba: true },
        { id: "eventos",   rotulo: "Envio de eventos",    href: "admin-eventos.html",  icone: "enviar",    aba: true },
        { id: "envios",    rotulo: "Histórico de envios", href: "admin-envios.html",   icone: "historico", aba: true },
        { id: "cadastro",  rotulo: "Cadastro e busca",    href: "admin-cadastro.html", icone: "pessoas",   aba: true },
        { id: "meuperfil", rotulo: "Meu perfil",          href: "admin-perfil.html",   icone: "perfil",    aba: true }
      ]
    }
  };

  var ROTULO_CURTO = {
    calendario: "Calendário",
    historico: "Histórico",
    visao: "Visão",
    eventos: "Eventos",
    envios: "Envios",
    cadastro: "Cadastro",
    meuperfil: "Perfil"
  };

  var MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function esc(valor) {
    return String(valor === null || valor === undefined ? "" : valor)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function iniciais(nome) {
    var partes = String(nome || "").trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return "";
    var primeira = partes[0].charAt(0);
    var ultima = partes.length > 1 ? partes[partes.length - 1].charAt(0) : "";
    return (primeira + ultima).toUpperCase();
  }

  function primeiroNome(nome) {
    return String(nome || "").trim().split(/\s+/)[0] || "";
  }

  function partesData(valor) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valor || ""));
    return m ? { ano: +m[1], mes: +m[2], dia: +m[3] } : null;
  }

  function dois(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function dataBr(valor) {
    var p = partesData(valor);
    return p ? dois(p.dia) + "/" + dois(p.mes) + "/" + p.ano : "";
  }

  function diaMes(valor) {
    var p = partesData(valor);
    return p ? dois(p.dia) + "/" + dois(p.mes) : "";
  }

  function horaBr(valor) {
    var m = /[ T](\d{2}):(\d{2})/.exec(String(valor || ""));
    return m ? m[1] + ":" + m[2] : "";
  }

  function hojeIso() {
    var d = new Date();
    return d.getFullYear() + "-" + dois(d.getMonth() + 1) + "-" + dois(d.getDate());
  }

  function cpfBr(cpf) {
    var v = String(cpf || "").replace(/\D/g, "");
    return v.length === 11 ? v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : v;
  }

  function numero(n) {
    return Number(n || 0).toLocaleString("pt-BR");
  }

  function ordinal(n) {
    return n + "ª";
  }

  function ouNaoInformado(valor) {
    return valor === null || valor === undefined || valor === "" ? "Não informado" : valor;
  }

  function simNao(valor) {
    return valor === true ? "Sim" : valor === false ? "Não" : "Não informado";
  }

  function plural(n, um, varios) {
    return n === 1 ? um : varios;
  }

  function parametro(nome) {
    return new URLSearchParams(window.location.search).get(nome);
  }

  var CHAVES = { usuario: "imuniza_token", admin: "imuniza_token_admin" };

  function lerToken(area) {
    try {
      return localStorage.getItem(CHAVES[area]) || sessionStorage.getItem(CHAVES[area]);
    } catch (e) {
      return null;
    }
  }

  function guardarToken(area, token, manter) {
    try {
      localStorage.removeItem(CHAVES[area]);
      sessionStorage.removeItem(CHAVES[area]);
      (manter ? localStorage : sessionStorage).setItem(CHAVES[area], token);
    } catch (e) {}
  }

  function limparToken(area) {
    try {
      localStorage.removeItem(CHAVES[area]);
      sessionStorage.removeItem(CHAVES[area]);
    } catch (e) {}
  }

  function api(caminho, opcoes) {
    opcoes = opcoes || {};
    var area = opcoes.area || document.body.dataset.area;
    var cabecalhos = { "Accept": "application/json" };
    var token = area ? lerToken(area) : null;
    if (token) cabecalhos.Authorization = "Bearer " + token;
    var config = { method: opcoes.metodo || (opcoes.dados ? "POST" : "GET"), headers: cabecalhos };
    if (opcoes.dados) {
      cabecalhos["Content-Type"] = "application/json";
      config.body = JSON.stringify(opcoes.dados);
    }
    return fetch("api/" + caminho, config).then(function (resposta) {
      return resposta.text().then(function (texto) {
        var dados;
        try {
          dados = JSON.parse(texto);
        } catch (e) {
          dados = { ok: false, erro: "O servidor respondeu de um jeito inesperado. Confira se o PHP está rodando." };
        }
        if (resposta.status === 401 && area && token) {
          limparToken(area);
          window.location.replace(MENUS[area].login);
        }
        if (!resposta.ok || dados.ok === false) {
          var erro = new Error(dados.erro || "Não foi possível concluir. Tente de novo.");
          erro.campo = dados.campo;
          erro.status = resposta.status;
          throw erro;
        }
        return dados;
      });
    }, function () {
      throw new Error("Sem conexão com o servidor. Verifique sua internet.");
    });
  }

  function dadosDoForm(form) {
    var dados = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.disabled) return;
      if (el.type === "checkbox") dados[el.name] = el.checked;
      else dados[el.name] = el.value;
    });
    return dados;
  }

  function avisoDoForm(form) {
    var aviso = form.querySelector("[data-aviso]");
    if (!aviso) {
      aviso = document.createElement("div");
      aviso.setAttribute("data-aviso", "");
      aviso.setAttribute("role", "alert");
      aviso.className = "aviso form-aviso oculto";
      form.insertBefore(aviso, form.firstChild);
    }
    return aviso;
  }

  function mostrarAviso(form, mensagem, tipo) {
    var aviso = avisoDoForm(form);
    var nomeIcone = tipo === "verde" ? "check" : tipo === "azul" ? "info" : "alerta";
    aviso.className = "aviso form-aviso aviso--" + (tipo || "vermelho");
    aviso.innerHTML = icone(nomeIcone, 20) + "<span>" + esc(mensagem) + "</span>";
  }

  function limparAviso(form) {
    var aviso = form.querySelector("[data-aviso]");
    if (aviso) aviso.className = "aviso form-aviso oculto";
    form.querySelectorAll(".campo--erro").forEach(function (c) { c.classList.remove("campo--erro"); });
  }

  function marcarCampo(form, nome) {
    if (!nome) return;
    var el = form.querySelector('[name="' + nome + '"]');
    if (!el) return;
    var campo = el.closest(".campo");
    if (campo) campo.classList.add("campo--erro");
    el.focus();
  }

  function enviarForm(form, executar) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.dataset.enviando) return;
      limparAviso(form);
      var botao = form.querySelector('[type="submit"]');
      var rotulo = botao ? botao.textContent : "";
      form.dataset.enviando = "1";
      if (botao) { botao.disabled = true; botao.textContent = "Aguarde..."; }
      Promise.resolve()
        .then(function () { return executar(dadosDoForm(form)); })
        .catch(function (erro) {
          mostrarAviso(form, erro.message);
          marcarCampo(form, erro.campo);
        })
        .then(function () {
          delete form.dataset.enviando;
          if (botao) { botao.disabled = false; botao.textContent = rotulo; }
        });
    });
  }

  function abrirModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("ativo");
    document.body.style.overflow = "hidden";
  }

  function fecharModal(modal) {
    if (!modal) return;
    modal.classList.remove("ativo");
    if (!document.querySelector(".modal.ativo")) document.body.style.overflow = "";
  }

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
        '<span class="avatar ' + m.cor + '" data-pessoa="iniciais"></span>' +
        '<div><b data-pessoa="nome">Carregando...</b><span data-pessoa="detalhe"></span></div>' +
      '</div>' +
      '<a class="lateral__sair" href="' + m.login + '" data-sair>' + icone("sair", 20) +
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

  function papelAdmin(a) {
    var base = a.sexo === "Feminino" ? "Administradora" : "Administrador";
    return a.papel === "principal" ? base + " principal" : base;
  }

  function mostrarPessoa(area, pessoa) {
    var detalhe = area === "admin" ? papelAdmin(pessoa) : "CPF " + cpfBr(pessoa.cpf);
    var sigla = iniciais(pessoa.nome);
    document.querySelectorAll('[data-pessoa="nome"]').forEach(function (el) { el.textContent = pessoa.nome; });
    document.querySelectorAll('[data-pessoa="detalhe"]').forEach(function (el) { el.textContent = detalhe; });
    document.querySelectorAll('[data-pessoa="iniciais"], .topo > .avatar').forEach(function (el) { el.textContent = sigla; });
    document.querySelectorAll("[data-primeiro-nome]").forEach(function (el) { el.textContent = primeiroNome(pessoa.nome); });
    document.querySelectorAll("[data-unidade]").forEach(function (el) {
      el.textContent = pessoa.unidade_saude || "";
      el.classList.toggle("oculto", !pessoa.unidade_saude);
    });
  }

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

  function ligarSair(area) {
    document.addEventListener("click", function (e) {
      var link = e.target.closest("[data-sair]");
      if (!link) return;
      e.preventDefault();
      var destino = MENUS[area].login;
      api("sair.php", { metodo: "POST", area: area })
        .catch(function () {})
        .then(function () {
          limparToken(area);
          window.location.href = destino;
        });
    });
  }

  function preencherIcones(raiz) {
    (raiz || document).querySelectorAll("[data-icone]").forEach(function (el) {
      if (el.dataset.pronto) return;
      el.innerHTML = icone(el.dataset.icone, parseInt(el.dataset.tamanho, 10) || 22);
      el.dataset.pronto = "1";
    });
  }

  function ligarModais() {
    document.addEventListener("click", function (e) {
      var abrir = e.target.closest("[data-abrir-modal]");
      if (abrir) {
        if (document.getElementById(abrir.dataset.abrirModal)) {
          e.preventDefault();
          abrirModal(abrir.dataset.abrirModal);
        }
        return;
      }
      var fechar = e.target.closest("[data-fechar-modal]");
      if (fechar || e.target.classList.contains("modal")) {
        fecharModal(e.target.closest(".modal"));
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".modal.ativo").forEach(fecharModal);
    });
  }

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
    document.querySelectorAll('[data-mascara="telefone"]').forEach(function (el) {
      el.addEventListener("input", function () {
        var v = el.value.replace(/\D/g, "").slice(0, 11);
        if (v.length > 10) el.value = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        else if (v.length > 6) el.value = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        else if (v.length > 2) el.value = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        else el.value = v;
      });
    });
  }

  function ligarEsqueciSenha() {
    document.querySelectorAll("[data-esqueci]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var form = link.closest("form");
        if (form) mostrarAviso(form, "Para trocar a senha, procure a sua unidade de saúde com um documento com foto.", "azul");
      });
    });
  }

  function ligarEntrada(form, area, caminho, destino) {
    enviarForm(form, function (dados) {
      return api(caminho, { dados: dados, area: area }).then(function (r) {
        guardarToken(area, r.token, !!dados.manter);
        window.location.href = destino;
      });
    });
  }

  var TELAS = {};

  function ligarBuscaTopo() {
    var busca = document.getElementById("busca-topo");
    if (!busca) return;
    busca.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && busca.value.trim()) {
        window.location.href = "historico.html?busca=" + encodeURIComponent(busca.value.trim());
      }
    });
  }

  TELAS.inicio = function () {
    return api("usuario/resumo.php").then(function (r) {
      var p = r.proxima;
      var nome = document.getElementById("proxima-nome");
      var meta = document.getElementById("proxima-meta");
      var pe = document.getElementById("proxima-pe");
      var link = document.getElementById("proxima-link");
      if (p) {
        nome.textContent = p.nome + " — " + ordinal(p.numero_dose) + " dose";
        meta.innerHTML = esc(dataBr(p.data_prevista)) +
          (p.local_aplicacao ? " &nbsp;·&nbsp; " + esc(p.local_aplicacao) : "") +
          (p.lote ? " &nbsp;·&nbsp; Lote " + esc(p.lote) : "");
        pe.textContent = p.faltam_dias === 0 ? "Sua próxima dose é hoje."
          : p.faltam_dias === 1 ? "Falta 1 dia para a sua próxima dose."
          : "Faltam " + p.faltam_dias + " dias para a sua próxima dose.";
        link.href = "historico.html?vacina=" + p.vacina_id;
      } else {
        nome.textContent = "Nenhuma dose agendada";
        meta.textContent = r.progresso.atrasadas > 0
          ? "Você tem " + r.progresso.atrasadas + plural(r.progresso.atrasadas, " dose atrasada", " doses atrasadas") + ". Procure a sua unidade de saúde."
          : "Seu calendário vacinal está em dia.";
        pe.textContent = "Confira o histórico completo.";
        link.href = "historico.html";
      }

      var g = r.progresso;
      document.getElementById("progresso-valor").textContent = g.porcentagem + "% completo";
      document.getElementById("progresso-barra").style.width = g.porcentagem + "%";
      document.getElementById("progresso-feitas").textContent = g.aplicadas + " de " + g.total + " " + plural(g.total, "dose tomada", "doses tomadas");
      document.getElementById("progresso-faltam").textContent = g.pendentes > 0
        ? plural(g.pendentes, "Falta 1 dose", "Faltam " + g.pendentes + " doses")
        : "Tudo em dia";

      var lista = document.getElementById("lista-campanhas");
      if (!r.campanhas.length) {
        lista.innerHTML = '<p class="lista-vazia">Nenhuma campanha ativa no momento.</p>';
        return;
      }
      var icones = ["escudo", "pessoas", "vacina"];
      lista.innerHTML = r.campanhas.map(function (c, i) {
        var disponivel = c.situacao === "disponivel";
        return '<article class="cartao campanha">' +
          '<div class="campanha__topo">' +
            '<span class="icone-quadro icone-quadro--suave" data-icone="' + icones[i % 3] + '" data-tamanho="20"></span>' +
            '<div><p class="campanha__nome">' + esc(c.titulo) + '</p>' +
            '<p class="campanha__data">' + (disponivel ? "Até " + dataBr(c.termina_em) : "A partir de " + dataBr(c.data_evento)) +
            (c.local_aplicacao ? " · " + esc(c.local_aplicacao) : "") + '</p></div>' +
          '</div>' +
          '<p><span class="etiqueta etiqueta--' + (disponivel ? "verde" : "ambar") + '">' +
          (disponivel ? "Disponível" : "Em breve") + '</span></p>' +
          '</article>';
      }).join("");
      preencherIcones(lista);
    });
  };

  var SITUACOES = {
    completa: "Completa",
    em_andamento: "Em andamento",
    pendente: "Pendente",
    atrasada: "Atrasada"
  };

  function resumoVacina(v) {
    var aplicadas = v.doses.filter(function (d) { return d.status === "aplicada"; });
    var pendentes = v.doses.filter(function (d) { return d.status === "pendente"; });
    var ultima = aplicadas[aplicadas.length - 1] || null;
    var proxima = pendentes[0] || null;
    return { aplicadas: aplicadas, ultima: ultima, proxima: proxima };
  }

  function diasAte(iso) {
    var p = partesData(iso);
    if (!p) return null;
    var hoje = partesData(hojeIso());
    var alvo = Date.UTC(p.ano, p.mes - 1, p.dia);
    var agora = Date.UTC(hoje.ano, hoje.mes - 1, hoje.dia);
    return Math.round((alvo - agora) / 86400000);
  }

  function metaVacina(v, r) {
    if (r.ultima) {
      var ano = partesData(r.ultima.data_aplicacao).ano;
      if (v.total_doses === 1) return ano + " · dose única";
      if (v.situacao === "completa") return ano + " · " + v.total_doses + " doses";
      return ano + " · " + v.aplicadas + " de " + v.total_doses + " doses";
    }
    if (r.proxima && r.proxima.data_prevista) {
      return (r.proxima.atrasada ? "Atrasada desde " : "Prevista para ") + dataBr(r.proxima.data_prevista);
    }
    return "Procure a unidade de saúde";
  }

  function capaVacina(v, r) {
    if (v.situacao === "completa") {
      var ano = partesData(r.ultima.data_aplicacao).ano;
      return v.total_doses === 1 ? "Dose única · " + ano : v.aplicadas + " doses aplicadas · " + ano;
    }
    if (r.proxima && r.proxima.data_prevista) {
      if (r.proxima.atrasada) return "Atrasada desde " + dataBr(r.proxima.data_prevista);
      var dias = diasAte(r.proxima.data_prevista);
      return dataBr(r.proxima.data_prevista) + " · " + (dias === 0 ? "é hoje" : "faltam " + dias + " " + plural(dias, "dia", "dias"));
    }
    return v.aplicadas + " de " + v.total_doses + " doses";
  }

  function blocoDados(titulo, linhas) {
    if (!linhas) return "";
    var html = '<div class="cartao cartao--liso"><h3 class="cartao__titulo">' + esc(titulo) + '</h3><ul class="dados">';
    linhas.forEach(function (par) {
      html += '<li><span class="chave">' + esc(par[0]) + '</span><span class="valor">' + esc(par[1]) + '</span></li>';
    });
    return html + "</ul></div>";
  }

  function rotuloDose(v, d) {
    return v.total_doses === 1 && d.numero_dose === 1 ? "Única" : ordinal(d.numero_dose);
  }

  TELAS.historico = function () {
    var lista = document.getElementById("lista-vacinas");
    var painel = document.getElementById("detalhe");
    var filtros = document.getElementById("filtros");
    var busca = document.getElementById("busca-vacina");
    var vacinas = {};

    if (busca && parametro("busca")) busca.value = parametro("busca");

    function item(v) {
      var r = resumoVacina(v);
      var aplicada = r.aplicadas.length > 0;
      return '<button class="vacina" type="button" data-vacina="' + v.id + '" data-grupo="' +
        (aplicada ? "aplicadas" : "pendentes") + '" aria-selected="false">' +
        '<span class="icone-quadro icone-quadro--' + (aplicada ? "verde" : "vermelho") + '" data-icone="' +
        (aplicada ? "check" : "fechar") + '" data-tamanho="20"></span>' +
        '<span class="vacina__textos"><span class="vacina__nome">' + esc(v.nome) + '</span>' +
        '<span class="vacina__meta">' + esc(metaVacina(v, r)) + '</span></span>' +
        '<span class="vacina__seta" data-icone="seta_dir" data-tamanho="18"></span></button>';
    }

    function mostrar(id, abrir) {
      var v = vacinas[id];
      if (!v) return;
      var r = resumoVacina(v);
      var intervalo = v.intervalo_dias ? v.intervalo_dias + " dias" : v.total_doses === 1 ? "Dose única" : "Conforme a unidade";
      painel.innerHTML =
        '<button class="detalhe__voltar" type="button" data-fechar-detalhe>' + icone("voltar", 20) + " Voltar</button>" +
        '<div class="detalhe__capa"><small>Vacina</small><b>' + esc(v.nome) + "</b><span>" + esc(capaVacina(v, r)) + "</span></div>" +
        blocoDados("Informações da vacina", [
          ["Total de doses", String(v.total_doses)],
          ["Intervalo", intervalo],
          ["Situação", SITUACOES[v.situacao]]
        ]) +
        blocoDados("Dose já aplicada", r.ultima ? [
          ["Dose", rotuloDose(v, r.ultima)],
          ["Data", dataBr(r.ultima.data_aplicacao)],
          ["Local", ouNaoInformado(r.ultima.local_aplicacao)],
          ["Lote", ouNaoInformado(r.ultima.lote)]
        ] : null) +
        blocoDados("Próxima dose", r.proxima ? [
          ["Dose", rotuloDose(v, r.proxima)],
          ["Local", ouNaoInformado(r.proxima.local_aplicacao)],
          ["Previsão", r.proxima.data_prevista ? dataBr(r.proxima.data_prevista) : "Procurar a unidade"]
        ] : null) +
        '<p style="text-align:center;font-size:14px;color:var(--texto-med)">Dúvidas? Procure a sua unidade de saúde.</p>';
      if (abrir) painel.classList.add("aberto");
    }

    function aplicarFiltros() {
      var ativo = filtros ? filtros.querySelector('[aria-pressed="true"]') : null;
      var grupo = ativo ? ativo.dataset.filtro : "todas";
      var termo = busca ? busca.value.trim().toLowerCase() : "";

      lista.querySelectorAll(".vacina").forEach(function (el) {
        var casaGrupo = grupo === "todas" || el.dataset.grupo === grupo;
        var casaTermo = !termo || el.textContent.toLowerCase().indexOf(termo) !== -1;
        el.classList.toggle("oculto", !(casaGrupo && casaTermo));
      });

      lista.querySelectorAll("[data-rotulo]").forEach(function (rotulo) {
        var visiveis = lista.querySelectorAll('.vacina[data-grupo="' + rotulo.dataset.rotulo + '"]:not(.oculto)');
        rotulo.classList.toggle("oculto", visiveis.length === 0);
      });
    }

    lista.addEventListener("click", function (e) {
      var botao = e.target.closest(".vacina");
      if (!botao) return;
      lista.querySelectorAll(".vacina").forEach(function (b) {
        b.setAttribute("aria-selected", b === botao ? "true" : "false");
      });
      mostrar(botao.dataset.vacina, true);
    });

    painel.addEventListener("click", function (e) {
      if (e.target.closest("[data-fechar-detalhe]")) painel.classList.remove("aberto");
    });

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
    if (busca) busca.addEventListener("input", aplicarFiltros);

    return api("usuario/doses.php").then(function (r) {
      if (!r.vacinas.length) {
        lista.innerHTML = '<p class="lista-vazia">Nenhuma vacina registrada ainda. As doses aparecem aqui assim que a unidade de saúde registrar.</p>';
        painel.innerHTML = "";
        return;
      }
      r.vacinas.forEach(function (v) { vacinas[v.id] = v; });
      var aplicadas = r.vacinas.filter(function (v) { return v.aplicadas > 0; });
      var pendentes = r.vacinas.filter(function (v) { return v.aplicadas === 0; });
      var html = "";
      if (aplicadas.length) {
        html += '<p class="grupo-rotulo" data-rotulo="aplicadas">Aplicadas</p><div class="lista-vacinas">' +
          aplicadas.map(item).join("") + "</div>";
      }
      if (pendentes.length) {
        html += '<p class="grupo-rotulo" data-rotulo="pendentes">Pendentes</p><div class="lista-vacinas">' +
          pendentes.map(item).join("") + "</div>";
      }
      lista.innerHTML = html;
      preencherIcones(lista);

      var pedida = parametro("vacina");
      var inicial = (pedida && lista.querySelector('.vacina[data-vacina="' + pedida + '"]')) ||
        lista.querySelector('.vacina[data-grupo="aplicadas"]') || lista.querySelector(".vacina");
      inicial.setAttribute("aria-selected", "true");
      mostrar(inicial.dataset.vacina, !!pedida && window.matchMedia("(max-width: 767px)").matches);
      aplicarFiltros();
    });
  };

  TELAS.calendario = function () {
    var raiz = document.getElementById("calendario");
    var hoje = new Date();
    var atual = { ano: hoje.getFullYear(), mes: hoje.getMonth() };
    var cache = {};
    var hojeChave = hojeIso();

    function desenhar(marcacoes) {
      var primeiro = new Date(atual.ano, atual.mes, 1).getDay();
      var totalDias = new Date(atual.ano, atual.mes + 1, 0).getDate();
      var diasAntes = new Date(atual.ano, atual.mes, 0).getDate();
      var porDia = {};
      (marcacoes || []).forEach(function (m) {
        var d = partesData(m.data).dia;
        (porDia[d] = porDia[d] || []).push(m.titulo);
      });

      var html = "";
      DIAS_SEMANA.forEach(function (d) {
        html += '<div class="calendario__dia-semana">' + d + "</div>";
      });
      for (var a = primeiro - 1; a >= 0; a--) {
        html += '<div class="calendario__dia calendario__dia--fora">' + (diasAntes - a) + "</div>";
      }
      for (var d2 = 1; d2 <= totalDias; d2++) {
        var titulos = porDia[d2];
        var chave = atual.ano + "-" + dois(atual.mes + 1) + "-" + dois(d2);
        var hojeAttr = chave === hojeChave ? ' aria-current="date"' : "";
        html += '<div class="calendario__dia' + (titulos ? " calendario__dia--marcado" : "") + '"' + hojeAttr +
          (titulos ? ' title="' + esc(titulos.join(" · ")) + '"' : "") + ">" + d2 + "</div>";
      }
      var usados = primeiro + totalDias;
      var faltam = (7 - (usados % 7)) % 7;
      for (var f = 1; f <= faltam; f++) {
        html += '<div class="calendario__dia calendario__dia--fora">' + f + "</div>";
      }

      raiz.innerHTML = html;
      var titulo = document.getElementById("calendario-mes");
      if (titulo) titulo.textContent = MESES[atual.mes] + " de " + atual.ano;
    }

    function carregar() {
      var chave = atual.ano + "-" + (atual.mes + 1);
      desenhar(cache[chave]);
      if (cache[chave]) return Promise.resolve();
      return api("usuario/calendario.php?ano=" + atual.ano + "&mes=" + (atual.mes + 1)).then(function (r) {
        cache[chave] = r.marcacoes;
        if (chave === atual.ano + "-" + (atual.mes + 1)) desenhar(r.marcacoes);
        return r;
      });
    }

    function mover(passo) {
      atual.mes += passo;
      if (atual.mes > 11) { atual.mes = 0; atual.ano++; }
      if (atual.mes < 0) { atual.mes = 11; atual.ano--; }
      carregar();
    }

    document.getElementById("mes-anterior").addEventListener("click", function () { mover(-1); });
    document.getElementById("mes-proximo").addEventListener("click", function () { mover(1); });

    return carregar().then(function (r) {
      var lista = document.getElementById("lista-proximas");
      if (!r || !r.proximas.length) {
        lista.innerHTML = '<p class="lista-vazia">Nenhuma dose ou campanha agendada.</p>';
        return;
      }
      lista.innerHTML = r.proximas.map(function (p) {
        var quando = p.tipo === "campanha" && p.data < hojeChave ? "Até " + diaMes(p.termina_em) : diaMes(p.data);
        return '<div class="proxima">' +
          '<span class="icone-quadro' + (p.tipo === "campanha" ? " icone-quadro--suave" : "") + '" data-icone="' +
          (p.tipo === "campanha" ? "escudo" : "calendario") + '" data-tamanho="20"></span>' +
          '<div><b>' + esc(p.titulo) + (p.tipo === "campanha" && !/campanha/i.test(p.titulo) ? " (campanha)" : "") + '</b>' +
          '<span>' + esc(quando) + (p.local_aplicacao ? " · " + esc(p.local_aplicacao) : "") + '</span></div></div>';
      }).join("");
      preencherIcones(lista);
    });
  };

  TELAS.carteira = function (pessoa) {
    document.getElementById("titular-nome").textContent = pessoa.nome;
    document.getElementById("titular-cpf").textContent = cpfBr(pessoa.cpf);
    document.getElementById("titular-nascimento").textContent = ouNaoInformado(dataBr(pessoa.data_nascimento));
    document.getElementById("titular-unidade").textContent = ouNaoInformado(pessoa.unidade_saude);

    return api("usuario/doses.php").then(function (r) {
      var aplicadas = r.vacinas.reduce(function (s, v) { return s + v.aplicadas; }, 0);
      var pendentes = r.vacinas.filter(function (v) { return v.situacao !== "completa"; }).length;
      document.getElementById("resumo-doses").textContent = aplicadas;
      document.getElementById("resumo-pendentes").textContent = pendentes;
      document.getElementById("resumo-atualizacao").textContent = r.atualizado_em ? dataBr(r.atualizado_em) : "Sem registros";
    });
  };

  function mostrarPerfilUsuario(u) {
    var campos = {
      "perfil-nome": u.nome,
      "perfil-email": ouNaoInformado(u.email),
      "perfil-telefone": ouNaoInformado(u.telefone),
      "perfil-cpf": "CPF " + cpfBr(u.cpf),
      "perfil-nascimento": ouNaoInformado(dataBr(u.data_nascimento)),
      "perfil-sangue": ouNaoInformado(u.tipo_sanguineo),
      "perfil-sexo": ouNaoInformado(u.sexo),
      "perfil-cidade": u.cidade ? u.cidade + (u.uf ? " — " + u.uf : "") : "Não informado",
      "perfil-alergias": ouNaoInformado(u.alergias),
      "perfil-medicamentos": ouNaoInformado(u.medicamentos_continuos),
      "perfil-unidade": ouNaoInformado(u.unidade_saude),
      "perfil-doador": simNao(u.doador_orgaos),
      "perfil-avatar": iniciais(u.nome)
    };
    Object.keys(campos).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = campos[id];
    });
  }

  function preencherForm(form, dados) {
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && Object.prototype.hasOwnProperty.call(dados, el.name)) {
        el.value = dados[el.name] === null || dados[el.name] === undefined ? "" : dados[el.name];
      }
    });
  }

  TELAS.perfil = function (pessoa) {
    var form = document.getElementById("form-perfil");
    mostrarPerfilUsuario(pessoa);
    preencherForm(form, pessoa);

    document.querySelector('[data-abrir-modal="modal-perfil"]').addEventListener("click", function () {
      limparAviso(form);
      preencherForm(form, pessoa);
    });

    enviarForm(form, function (dados) {
      return api("usuario/perfil.php", { dados: dados }).then(function (r) {
        pessoa = r.usuario;
        mostrarPerfilUsuario(pessoa);
        mostrarPessoa("usuario", pessoa);
        fecharModal(document.getElementById("modal-perfil"));
      });
    });
  };

  function linhaEvento(c) {
    var enviado = c.status === "enviado";
    return '<div class="proxima">' +
      '<span class="icone-quadro icone-quadro--' + (enviado ? "verde" : "ambar") + '" data-icone="' +
      (enviado ? "check" : "relogio") + '" data-tamanho="20"></span>' +
      '<div style="flex:1"><b>' + esc(c.titulo) + '</b>' +
      '<span>' + diaMes(c.data_evento) + " a " + diaMes(c.termina_em) + " · " + numero(c.alcance) + " " +
      (enviado ? plural(c.alcance, "notificado", "notificados") : plural(c.alcance, "previsto", "previstos")) + '</span></div>' +
      '<span class="etiqueta etiqueta--' + (enviado ? "verde" : "ambar") + '">' + (enviado ? "Enviado" : "Pendente") + '</span>' +
      '</div>';
  }

  TELAS.visao = function (admin) {
    return api("admin/visao.php").then(function (r) {
      ["usuarios_cadastrados", "cadastros_no_mes", "eventos_no_periodo", "pendencias_de_dados"].forEach(function (chave) {
        var el = document.getElementById("metrica-" + chave);
        if (el) el.textContent = numero(r.numeros[chave]);
      });
      var lista = document.getElementById("lista-andamento");
      lista.innerHTML = r.campanhas.length
        ? r.campanhas.map(linhaEvento).join("")
        : '<p class="lista-vazia">Nenhuma campanha em andamento. Use "Enviar evento" para divulgar uma.</p>';
      preencherIcones(lista);
    });
  };

  TELAS.eventos = function (admin) {
    var form = document.getElementById("form-evento");
    var selVacina = form.querySelector('[name="vacina_id"]');
    var vacinas = {};
    var pedidoAlcance = 0;

    if (admin.unidade_saude) {
      var local = form.querySelector('[name="local_aplicacao"]');
      if (!local.value) local.value = admin.unidade_saude;
    }

    function previa() {
      var d = dadosDoForm(form);
      var vacina = vacinas[d.vacina_id];
      var titulo = d.titulo || (vacina ? "Campanha de " + vacina.nome : "Nome do evento");
      var partes = [];
      var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d.data_evento || "");
      if (m) {
        var inicio = new Date(+m[3], +m[2] - 1, +m[1]);
        var dias = parseInt(d.duracao_dias, 10);
        var texto = m[1] + "/" + m[2];
        if (dias > 1) {
          var fim = new Date(inicio.getTime());
          fim.setDate(fim.getDate() + dias - 1);
          texto += " a " + dois(fim.getDate()) + "/" + dois(fim.getMonth() + 1);
        }
        partes.push(texto);
      }
      if (d.local_aplicacao) partes.push(d.local_aplicacao);
      if (d.publico_alvo) partes.push("Público-alvo: " + d.publico_alvo);
      document.getElementById("previa-titulo").textContent = titulo;
      document.getElementById("previa-detalhe").textContent = partes.length ? partes.join(" · ") : "Preencha os dados para ver a notificação.";
    }

    function alcance() {
      var publico = form.querySelector('[name="publico_alvo"]').value;
      var alvo = document.getElementById("alcance-numero");
      if (!publico) { alvo.textContent = "—"; return; }
      var meu = ++pedidoAlcance;
      api("admin/alcance.php?publico=" + encodeURIComponent(publico)).then(function (r) {
        if (meu === pedidoAlcance) alvo.textContent = numero(r.alcance);
      }).catch(function () { alvo.textContent = "—"; });
    }

    form.addEventListener("input", previa);
    form.addEventListener("change", previa);
    form.querySelector('[name="publico_alvo"]').addEventListener("change", alcance);
    form.addEventListener("reset", function () {
      setTimeout(function () {
        if (admin.unidade_saude) form.querySelector('[name="local_aplicacao"]').value = admin.unidade_saude;
        limparAviso(form);
        previa();
        alcance();
      }, 0);
    });

    document.getElementById("enviar-outro").addEventListener("click", function () { form.reset(); });

    enviarForm(form, function (dados) {
      return api("admin/eventos.php", { dados: dados }).then(function (r) {
        document.getElementById("envio-texto").textContent = "“" + r.evento.titulo + "” foi registrado e " +
          numero(r.evento.alcance) + " " + plural(r.evento.alcance, "usuário vai", "usuários vão") + " receber a notificação.";
        abrirModal("modal-envio");
      });
    });

    return api("vacinas.php").then(function (r) {
      selVacina.innerHTML = '<option value="">Selecione</option>' + r.vacinas.map(function (v) {
        vacinas[v.id] = v;
        return '<option value="' + v.id + '">' + esc(v.nome) + "</option>";
      }).join("");
      previa();
      alcance();
    });
  };

  TELAS.envios = function () {
    var corpo = document.getElementById("corpo-envios");
    var cartoes = document.getElementById("cartoes-envios");
    var buscaEl = document.getElementById("busca-envio");
    var statusEl = document.getElementById("filtro-status");
    var periodoEl = document.getElementById("filtro-periodo");
    var eventos = [];

    corpo.innerHTML = '<tr><td colspan="6" class="lista-vazia">Carregando...</td></tr>';

    function desenhar() {
      var termo = buscaEl.value.trim().toLowerCase();
      var status = statusEl.value;
      var periodo = periodoEl.value;

      var linhas = eventos.filter(function (e) {
        var casaStatus = status === "todos" || e.status === status;
        var casaPeriodo = periodo === "todos" || String(partesData(e.data_evento).ano) === periodo;
        var casaTermo = !termo || (e.titulo + " " + e.vacina).toLowerCase().indexOf(termo) !== -1;
        return casaStatus && casaPeriodo && casaTermo;
      });

      if (!linhas.length) {
        corpo.innerHTML = '<tr><td colspan="6" class="lista-vazia">Nenhum evento encontrado.</td></tr>';
        cartoes.innerHTML = '<p class="lista-vazia">Nenhum evento encontrado.</p>';
        return;
      }

      corpo.innerHTML = linhas.map(function (e) {
        var enviado = e.status === "enviado";
        var cor = enviado ? "verde" : "ambar";
        return "<tr>" +
          '<td><span class="tabela__evento"><span class="icone-quadro icone-quadro--peq icone-quadro--' + cor +
            '" data-icone="' + (enviado ? "check" : "relogio") + '" data-tamanho="18"></span>' + esc(e.titulo) + "</span></td>" +
          "<td>" + esc(e.vacina) + " " + partesData(e.data_evento).ano + "</td>" +
          "<td>" + diaMes(e.data_evento) + " a " + diaMes(e.termina_em) + "</td>" +
          "<td>" + esc(e.publico_alvo || "Todos") + "</td>" +
          "<td>" + numero(e.alcance) + "</td>" +
          '<td><span class="etiqueta etiqueta--' + cor + '">' + (enviado ? "Enviado" : "Pendente") + "</span></td>" +
          "</tr>";
      }).join("");

      cartoes.innerHTML = linhas.map(function (e) {
        var enviado = e.status === "enviado";
        var cor = enviado ? "verde" : "ambar";
        return '<article class="cartao-linha">' +
          '<div class="cartao-linha__topo">' +
            '<span class="icone-quadro icone-quadro--peq icone-quadro--' + cor + '" data-icone="' +
            (enviado ? "check" : "relogio") + '" data-tamanho="18"></span>' +
            "<b>" + esc(e.titulo) + "</b>" +
            '<span class="etiqueta etiqueta--' + cor + '">' + (enviado ? "Enviado" : "Pendente") + "</span>" +
          "</div>" +
          '<ul class="dados" style="margin-top:0">' +
            '<li><span class="chave">Vacina</span><span class="valor">' + esc(e.vacina) + "</span></li>" +
            '<li><span class="chave">Período</span><span class="valor">' + dataBr(e.data_evento) + " a " + dataBr(e.termina_em) + "</span></li>" +
            '<li><span class="chave">Público-alvo</span><span class="valor">' + esc(e.publico_alvo || "Todos") + "</span></li>" +
            '<li><span class="chave">Alcance</span><span class="valor">' + numero(e.alcance) + "</span></li>" +
          "</ul></article>";
      }).join("");

      preencherIcones(corpo);
      preencherIcones(cartoes);
    }

    buscaEl.addEventListener("input", desenhar);
    statusEl.addEventListener("change", desenhar);
    periodoEl.addEventListener("change", desenhar);

    return api("admin/envios.php").then(function (r) {
      eventos = r.eventos;
      var anos = [];
      eventos.forEach(function (e) {
        var ano = String(partesData(e.data_evento).ano);
        if (anos.indexOf(ano) === -1) anos.push(ano);
      });
      anos.sort().reverse();
      periodoEl.innerHTML = '<option value="todos">Período: todos</option>' + anos.map(function (a) {
        return '<option value="' + a + '">Período: ' + a + "</option>";
      }).join("");
      desenhar();
    });
  };

  TELAS.cadastro = function (admin) {
    var form = document.getElementById("form-cadastro");
    var formDose = document.getElementById("form-dose");
    var buscaEl = document.getElementById("busca-usuario");
    var resultados = document.getElementById("resultados-usuarios");
    var vacinas = [];
    var aberto = null;
    var ultimoCadastrado = null;
    var espera = null;
    var pedidoBusca = 0;

    if (admin.unidade_saude) {
      form.querySelector('[name="unidade_saude"]').placeholder = "Ex.: " + admin.unidade_saude;
    }

    function resumoUnidade() {
      return api("admin/visao.php").then(function (r) {
        document.getElementById("resumo-usuarios").textContent = numero(r.numeros.usuarios_cadastrados);
        document.getElementById("resumo-mes").textContent = numero(r.numeros.cadastros_no_mes);
        document.getElementById("resumo-pendencias").textContent = numero(r.numeros.pendencias_de_dados);
      });
    }

    function buscar() {
      var termo = buscaEl.value.trim();
      var meu = ++pedidoBusca;
      return api("admin/usuarios.php?busca=" + encodeURIComponent(termo)).then(function (r) {
        if (meu !== pedidoBusca) return;
        if (!r.usuarios.length) {
          resultados.innerHTML = '<p class="lista-vazia">Nenhum cadastro encontrado.</p>';
          return;
        }
        resultados.innerHTML = r.usuarios.map(function (u) {
          return '<button class="proxima proxima--botao" type="button" data-usuario="' + u.id + '">' +
            '<span class="avatar">' + esc(iniciais(u.nome)) + '</span>' +
            '<div style="flex:1"><b>' + esc(u.nome) + '</b><span>CPF ' + cpfBr(u.cpf) +
            (u.conta_ativa ? "" : " · aguardando criar a conta") + '</span></div>' +
            '<span style="color:var(--texto-fraco);display:flex" data-icone="seta_dir" data-tamanho="18"></span>' +
            '</button>';
        }).join("");
        preencherIcones(resultados);
      });
    }

    buscaEl.addEventListener("input", function () {
      clearTimeout(espera);
      espera = setTimeout(buscar, 300);
    });

    resultados.addEventListener("click", function (e) {
      var botao = e.target.closest("[data-usuario]");
      if (botao) abrirUsuario(+botao.dataset.usuario);
    });

    function desenharUsuario(r) {
      var u = r.usuario;
      aberto = u;
      document.getElementById("usuario-titulo").textContent = u.nome;
      document.getElementById("usuario-situacao").textContent = u.conta_ativa
        ? "Conta ativa · " + (u.email || "")
        : "Cadastro feito pela unidade. A pessoa ainda precisa clicar em “Criar conta” com este CPF.";
      document.getElementById("usuario-dados").innerHTML = [
        ["CPF", cpfBr(u.cpf)],
        ["Nascimento", ouNaoInformado(dataBr(u.data_nascimento))],
        ["Tipo sanguíneo", ouNaoInformado(u.tipo_sanguineo)],
        ["Unidade de saúde", ouNaoInformado(u.unidade_saude)]
      ].map(function (p) {
        return '<li><span class="chave">' + esc(p[0]) + '</span><span class="valor">' + esc(p[1]) + "</span></li>";
      }).join("");
      document.getElementById("usuario-vacinas").innerHTML = r.vacinas.length
        ? r.vacinas.map(function (v) {
          var proxima = v.doses.filter(function (d) { return d.status === "pendente"; })[0];
          return '<li><span class="chave">' + esc(v.nome) + '</span><span class="valor">' + v.aplicadas + "/" + v.total_doses +
            (proxima && proxima.data_prevista ? " · próx. " + dataBr(proxima.data_prevista) : "") + "</span></li>";
        }).join("")
        : '<li><span class="chave">Nenhuma dose registrada</span><span class="valor"></span></li>';
      atualizarNumeroDose(r.vacinas);
      aberto.vacinas = r.vacinas;
    }

    function atualizarNumeroDose(lista) {
      var vid = +formDose.querySelector('[name="vacina_id"]').value;
      var campo = formDose.querySelector('[name="numero_dose"]');
      var vacina = vacinas.filter(function (v) { return v.id === vid; })[0];
      if (!vacina) { campo.value = 1; return; }
      var registro = (lista || (aberto && aberto.vacinas) || []).filter(function (v) { return v.id === vid; })[0];
      var proxima = registro ? registro.doses.filter(function (d) { return d.status === "pendente"; })[0] : null;
      campo.max = vacina.total_doses + 5;
      campo.value = proxima ? proxima.numero_dose : registro ? Math.min(registro.aplicadas + 1, vacina.total_doses + 5) : 1;
    }

    function abrirUsuario(id) {
      limparAviso(formDose);
      formDose.reset();
      formDose.querySelector('[name="usuario_id"]').value = id;
      formDose.querySelector('[name="data_aplicacao"]').value = dataBr(hojeIso());
      if (admin.unidade_saude) formDose.querySelector('[name="local_aplicacao"]').value = admin.unidade_saude;
      return api("admin/usuarios.php?id=" + id).then(function (r) {
        desenharUsuario(r);
        abrirModal("modal-usuario");
      }).catch(function (erro) {
        mostrarAviso(form, erro.message);
      });
    }

    formDose.querySelector('[name="vacina_id"]').addEventListener("change", function () { atualizarNumeroDose(); });

    enviarForm(formDose, function (dados) {
      return api("admin/doses.php", { dados: dados }).then(function (r) {
        desenharUsuario({ usuario: aberto, vacinas: r.vacinas });
        var texto = "Dose registrada.";
        if (r.proxima_agendada) {
          texto += " A " + ordinal(r.proxima_agendada.numero_dose) + " dose ficou agendada para " + dataBr(r.proxima_agendada.data_prevista) + ".";
        }
        formDose.querySelector('[name="lote"]').value = "";
        mostrarAviso(formDose, texto, "verde");
      });
    });

    enviarForm(form, function (dados) {
      return api("admin/usuarios.php", { dados: dados }).then(function (r) {
        ultimoCadastrado = r.usuario;
        document.getElementById("cadastro-texto").textContent = "Cadastro de " + r.usuario.nome +
          " concluído. Para acessar a carteira digital, a pessoa clica em “Criar conta” e usa o CPF " + cpfBr(r.usuario.cpf) + ".";
        form.reset();
        abrirModal("modal-cadastro");
        buscaEl.value = "";
        buscar();
        resumoUnidade();
      });
    });

    form.addEventListener("reset", function () { limparAviso(form); });

    document.getElementById("ver-cadastro").addEventListener("click", function () {
      fecharModal(document.getElementById("modal-cadastro"));
      if (ultimoCadastrado) abrirUsuario(ultimoCadastrado.id);
    });

    return Promise.all([
      api("vacinas.php").then(function (r) {
        vacinas = r.vacinas;
        formDose.querySelector('[name="vacina_id"]').innerHTML = '<option value="">Selecione</option>' +
          r.vacinas.map(function (v) { return '<option value="' + v.id + '">' + esc(v.nome) + "</option>"; }).join("");
      }),
      buscar(),
      resumoUnidade()
    ]);
  };

  function mostrarPerfilAdmin(a) {
    var campos = {
      "admin-nome": a.nome,
      "admin-avatar": iniciais(a.nome),
      "admin-papel": papelAdmin(a),
      "admin-perfil-acesso": a.papel === "principal" ? "Administrador principal" : "Administrador",
      "admin-email": a.email,
      "admin-telefone": ouNaoInformado(a.telefone),
      "admin-cpf": "CPF " + cpfBr(a.cpf),
      "admin-nascimento": ouNaoInformado(dataBr(a.data_nascimento)),
      "admin-cpf2": cpfBr(a.cpf),
      "admin-sexo": ouNaoInformado(a.sexo),
      "admin-cidade": a.cidade ? a.cidade + (a.uf ? " — " + a.uf : "") : "Não informado",
      "admin-unidade": ouNaoInformado(a.unidade_saude),
      "admin-acesso": a.ultimo_acesso ? dataBr(a.ultimo_acesso) + " · " + horaBr(a.ultimo_acesso) : "Primeiro acesso"
    };
    Object.keys(campos).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = campos[id];
    });
  }

  function ligarAdministradores(admin) {
    var secao = document.getElementById("secao-administradores");
    var lista = document.getElementById("lista-administradores");
    var form = document.getElementById("form-liberar");
    if (!secao || admin.papel !== "principal") return;
    secao.classList.remove("oculto");

    function carregar() {
      return api("admin/administradores.php").then(function (r) {
        lista.innerHTML = r.administradores.map(function (a) {
          var situacao = a.papel === "principal" ? "Principal" : a.ativo ? "Ativo" : "Aguardando ativação";
          var cor = a.papel === "principal" ? "azul" : a.ativo ? "verde" : "ambar";
          var remover = a.papel === "principal" ? "" :
            '<button class="btn btn--neutro btn--pequeno" type="button" data-remover-admin="' + a.id + '" data-nome="' + esc(a.nome) + '">Remover</button>';
          return '<div class="proxima">' +
            '<span class="avatar avatar--roxo">' + esc(iniciais(a.nome)) + '</span>' +
            '<div style="flex:1"><b>' + esc(a.nome) + '</b><span>' + esc(a.email) + " · CPF " + cpfBr(a.cpf) +
            (a.unidade_saude ? " · " + esc(a.unidade_saude) : "") + '</span>' +
            '<span class="etiqueta etiqueta--' + cor + '" style="margin-top:6px;display:inline-flex">' + situacao + '</span></div>' +
            remover + '</div>';
        }).join("");
      });
    }

    lista.addEventListener("click", function (e) {
      var botao = e.target.closest("[data-remover-admin]");
      if (!botao) return;
      if (!window.confirm("Remover o acesso de " + botao.dataset.nome + "? A pessoa não vai mais conseguir entrar no painel.")) return;
      botao.disabled = true;
      api("admin/administradores.php?id=" + botao.dataset.removerAdmin, { metodo: "DELETE" })
        .then(function (r) {
          mostrarAviso(form, "Acesso de " + r.removido + " removido.", "verde");
          return carregar();
        })
        .catch(function (erro) {
          botao.disabled = false;
          mostrarAviso(form, erro.message);
        });
    });

    enviarForm(form, function (dados) {
      return api("admin/administradores.php", { dados: dados }).then(function (r) {
        form.reset();
        mostrarAviso(form, "Acesso liberado para " + r.admin.nome + ". Agora a pessoa entra em “Ativar acesso” com o CPF e o e-mail informados.", "verde");
        return carregar();
      });
    });

    return carregar();
  }

  TELAS.meuperfil = function (admin) {
    var form = document.getElementById("form-admin-perfil");
    mostrarPerfilAdmin(admin);
    ligarAdministradores(admin);

    document.querySelector('[data-abrir-modal="modal-admin-perfil"]').addEventListener("click", function () {
      limparAviso(form);
      preencherForm(form, admin);
    });

    enviarForm(form, function (dados) {
      return api("admin/perfil.php", { dados: dados }).then(function (r) {
        r.admin.ultimo_acesso = admin.ultimo_acesso;
        admin = r.admin;
        mostrarPerfilAdmin(admin);
        mostrarPessoa("admin", admin);
        fecharModal(document.getElementById("modal-admin-perfil"));
      });
    });
  };

  function iniciarAreaLogada(area, tela) {
    if (!lerToken(area)) {
      window.location.replace(MENUS[area].login);
      return;
    }
    montarLateral(area, tela);
    montarAbas(area, tela);
    montarTopo();
    ligarGaveta();
    ligarSair(area);
    ligarBuscaTopo();
    preencherIcones();

    var caminho = area === "admin" ? "admin/eu.php" : "usuario/eu.php";
    api(caminho).then(function (r) {
      var pessoa = area === "admin" ? r.admin : r.usuario;
      mostrarPessoa(area, pessoa);
      if (TELAS[tela]) return TELAS[tela](pessoa);
    }).catch(function (erro) {
      if (erro.status === 401) return;
      var conteudo = document.querySelector(".conteudo");
      if (!conteudo) return;
      var aviso = document.createElement("div");
      aviso.className = "aviso aviso--vermelho secao";
      aviso.setAttribute("role", "alert");
      aviso.innerHTML = icone("alerta", 20) + "<span>" + esc(erro.message) + "</span>";
      conteudo.insertBefore(aviso, conteudo.firstChild);
    });
  }

  function iniciarAcesso() {
    var formulario = document.querySelector("form[data-acesso]");
    if (!formulario) return;
    var tipo = formulario.dataset.acesso;
    if (tipo === "login") ligarEntrada(formulario, "usuario", "usuario/login.php", "inicio.html");
    if (tipo === "cadastro") ligarEntrada(formulario, "usuario", "usuario/cadastro.php", "inicio.html");
    if (tipo === "admin-login") ligarEntrada(formulario, "admin", "admin/login.php", "admin-visao.html");
    if (tipo === "admin-cadastro") ligarEntrada(formulario, "admin", "admin/cadastro.php", "admin-visao.html");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var area = document.body.dataset.area;
    var tela = document.body.dataset.tela;

    ligarModais();
    ligarMascaras();

    if (area && MENUS[area]) {
      iniciarAreaLogada(area, tela);
    } else {
      preencherIcones();
      ligarEsqueciSenha();
      iniciarAcesso();
    }
  });
})();
