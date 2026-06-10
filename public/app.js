const API_URL = "http://localhost:3000/produtos";

function formatarPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

async function iniciarHomePage() {
  const productList    = document.getElementById("product-list");
  const productCount   = document.getElementById("product-count");
  const searchInput    = document.querySelector("#search");
  const categorySelect = document.querySelector("#category");
  const btnRender      = document.querySelector("#btnRender");

  if (!productList) return;

  let dados = [];

  function atualizarContador(n) {
    productCount.textContent = `${n} produto${n !== 1 ? "s" : ""}`;
  }

  function criarCard(produto) {
    const card = document.createElement("div");
    card.setAttribute("data-id", produto.id);
    card.setAttribute("data-category", produto.categoria);
    card.classList.add("card");
    card.style.animationDelay = `${(produto.id % 8) * 0.05}s`;

    const imgWrap = document.createElement("div");
    imgWrap.classList.add("card-image-wrap");

    const img = document.createElement("img");
    img.src = produto.imagem;
    img.alt = produto.nome;
    img.loading = "lazy";

    const catBadge = document.createElement("span");
    catBadge.classList.add("card-category-badge");
    catBadge.textContent = produto.categoria;

    const stockBadge = document.createElement("span");
    stockBadge.classList.add("stock-badge", produto.emEstoque ? "in-stock" : "out-stock");
    stockBadge.textContent = produto.emEstoque ? "Em estoque" : "Esgotado";

    imgWrap.appendChild(img);
    imgWrap.appendChild(catBadge);
    imgWrap.appendChild(stockBadge);

    const body = document.createElement("div");
    body.classList.add("card-body");

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = produto.nome;

    const stars = document.createElement("div");
    stars.classList.add("card-stars");
    stars.innerHTML = `<span class="stars-icons">${renderStars(produto.rating)}</span>
                       <span class="stars-count">${produto.rating} (${produto.avaliacoes.toLocaleString("pt-BR")})</span>`;

    const price = document.createElement("p");
    price.classList.add("card-price");
    price.textContent = formatarPreco(produto.preco);

    body.appendChild(title);
    body.appendChild(stars);
    body.appendChild(price);

    const actions = document.createElement("div");
    actions.classList.add("card-actions");

    const linkDetalhes = document.createElement("a");
    linkDetalhes.classList.add("btn-details");
    linkDetalhes.href = `detalhes.html?id=${produto.id}`;
    linkDetalhes.textContent = "Ver detalhes →";

    const btnHighlight = document.createElement("button");
    btnHighlight.classList.add("btn-highlight");
    btnHighlight.title = "Destacar produto";
    btnHighlight.textContent = "★";

    btnHighlight.addEventListener("click", function () {
      card.classList.toggle("highlight");
    });

    actions.appendChild(linkDetalhes);
    actions.appendChild(btnHighlight);

    card.appendChild(imgWrap);
    card.appendChild(body);
    card.appendChild(actions);

    return card;
  }

  function renderizarProdutos(lista) {
    productList.innerHTML = "";

    if (lista.length === 0) {
      const empty = document.createElement("div");
      empty.classList.add("empty-state");
      empty.innerHTML = `<span class="empty-icon">🔭</span>
                         <p>Nenhum produto encontrado com esses filtros.</p>`;
      productList.appendChild(empty);
      atualizarContador(0);
      return;
    }

    lista.forEach(function (produto) {
      productList.appendChild(criarCard(produto));
    });

    atualizarContador(lista.length);
  }

  function renderizarCategorias() {
    categorySelect.innerHTML = '<option value="">Todas</option>';
    const cats = [...new Set(dados.map(p => p.categoria))].sort();
    cats.forEach(function (cat) {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  function filtrarProdutos() {
    const termo = searchInput.value.toLowerCase().trim();
    const cat   = categorySelect.value;
    return dados.filter(function (p) {
      const matchSearch = p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo);
      const matchCat    = cat === "" || p.categoria === cat;
      return matchSearch && matchCat;
    });
  }

  searchInput.addEventListener("input", function () { renderizarProdutos(filtrarProdutos()); });
  categorySelect.addEventListener("change", function () { renderizarProdutos(filtrarProdutos()); });
  btnRender.addEventListener("click", function () {
    searchInput.value = "";
    categorySelect.value = "";
    renderizarProdutos(dados);
  });

  try {
    const res = await fetch(API_URL);
    dados = await res.json();
    renderizarCategorias();
    renderizarProdutos(dados);
  } catch {
    productList.innerHTML = `<div class="empty-state"><span class="empty-icon">⚠️</span><p>Erro ao carregar produtos. Verifique se o JSON Server está rodando.</p></div>`;
  }
}

async function iniciarPaginaDetalhes() {
  const container = document.getElementById("detalhe-container");
  if (!container) return;

  const params  = new URLSearchParams(window.location.search);
  const idParam = parseInt(params.get("id"), 10);

  let produto = null;

  try {
    const res = await fetch(`${API_URL}/${idParam}`);
    produto = await res.json();
  } catch {
    container.innerHTML = `
      <div class="nao-encontrado">
        <span class="nf-icon">⚠️</span>
        <h2>Erro ao carregar produto</h2>
        <p>Verifique se o JSON Server está rodando.</p>
        <a href="index.html" class="btn-voltar">← Voltar ao catálogo</a>
      </div>`;
    return;
  }

  if (!produto || !produto.id) {
    container.innerHTML = `
      <div class="nao-encontrado">
        <span class="nf-icon">⚠️</span>
        <h2>Produto não encontrado</h2>
        <p>O produto com id=${idParam} não existe no catálogo.</p>
        <a href="index.html" class="btn-voltar">← Voltar ao catálogo</a>
      </div>`;
    return;
  }

  document.title = `${produto.nome} — NEXUSSHOP`;

  const stockClass = produto.emEstoque ? "status-em-estoque" : "status-fora-de-estoque";
  const stockLabel = produto.emEstoque ? "✓ Em Estoque"      : "✕ Fora de Estoque";

  const specsHTML = Object.entries(produto.especificacoes)
    .map(function ([chave, valor]) {
      return `<tr><td class="spec-key">${chave}</td><td class="spec-val">${valor}</td></tr>`;
    })
    .join("");

  container.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Catálogo</a>
      <span class="bc-sep">›</span>
      <span>${produto.categoria}</span>
      <span class="bc-sep">›</span>
      <span>${produto.nome}</span>
    </div>

    <div class="detalhe-grid">

      <div class="detalhe-img-col">
        <div class="detalhe-img-wrap">
          <img src="${produto.imagem}" alt="${produto.nome}" />
          <span class="detalhe-id-badge">#${produto.id}</span>
        </div>
        <div class="detalhe-badges-row">
          <span class="detalhe-badge cat-badge">🗂 ${produto.categoria}</span>
          <span class="detalhe-badge ${stockClass}">${stockLabel}</span>
          <span class="detalhe-badge launch-badge">📅 ${produto.lancamento}</span>
        </div>
      </div>

      <div class="detalhe-info-col">
        <h1 class="detalhe-nome">${produto.nome}</h1>

        <div class="detalhe-rating">
          <span class="rating-stars">${renderStars(produto.rating)}</span>
          <span class="rating-num">${produto.rating}</span>
          <span class="rating-count">(${produto.avaliacoes.toLocaleString("pt-BR")} avaliações)</span>
        </div>

        <p class="detalhe-preco">${formatarPreco(produto.preco)}</p>

        <p class="detalhe-desc">${produto.descricao}</p>

        <div class="detalhe-specs-block">
          <h2 class="specs-titulo">Especificações Técnicas</h2>
          <table class="specs-table">
            <tbody>${specsHTML}</tbody>
          </table>
        </div>

        <div class="detalhe-acoes">
          <a href="index.html" class="btn-voltar">← Voltar ao catálogo</a>
        </div>
      </div>

    </div>
  `;
}

iniciarHomePage();
iniciarPaginaDetalhes();
