// =============================================================
//  NEXUSSHOP — app.js
//  Dados JSON compartilhados + lógica das páginas index e detalhes
//  Matrícula: 1638573
// =============================================================

const dados = [
  {
    id: 1,
    nome: "iPhone 15 Pro Max",
    preco: 9499.90,
    categoria: "Celulares",
    imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
    descricao: "O iPhone 15 Pro Max traz chip A17 Pro, câmera de 48MP com zoom óptico 5x, titanium design e USB-C com velocidades ProRes. Uma experiência premium sem igual.",
    especificacoes: {
      "Processador": "Apple A17 Pro (3nm)",
      "Tela": "6.7\" Super Retina XDR OLED",
      "Câmera Principal": "48MP, f/1.78, OIS",
      "Zoom Óptico": "5x (120mm)",
      "Bateria": "4422 mAh",
      "Armazenamento": "256GB / 512GB / 1TB",
      "Conectividade": "5G, Wi-Fi 6E, USB-C 3.0",
      "Sistema": "iOS 17",
      "Peso": "221g"
    },
    rating: 4.9,
    avaliacoes: 3847,
    emEstoque: true,
    lancamento: "Setembro 2023"
  },
  {
    id: 2,
    nome: "Samsung Galaxy S24 Ultra",
    preco: 8299.00,
    categoria: "Celulares",
    imagem: "https://images.unsplash.com/photo-1706430942079-e25ee1a97a09?w=600&q=80",
    descricao: "Galaxy S24 Ultra com S Pen integrada, câmera de 200MP, processador Snapdragon 8 Gen 3 e tela Dynamic AMOLED 2X de 6.8 polegadas.",
    especificacoes: {
      "Processador": "Snapdragon 8 Gen 3",
      "Tela": "6.8\" Dynamic AMOLED 2X, 120Hz",
      "Câmera Principal": "200MP, f/1.7, OIS",
      "Zoom Óptico": "10x (Space Zoom 100x)",
      "Bateria": "5000 mAh, 45W",
      "Armazenamento": "256GB / 512GB / 1TB",
      "Conectividade": "5G, Wi-Fi 7, USB-C 3.2",
      "Sistema": "Android 14 / One UI 6.1",
      "Peso": "232g"
    },
    rating: 4.8,
    avaliacoes: 2156,
    emEstoque: true,
    lancamento: "Janeiro 2024"
  },
  {
    id: 3,
    nome: "MacBook Pro 14\" M3 Pro",
    preco: 16999.00,
    categoria: "Notebooks",
    imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    descricao: "MacBook Pro com chip M3 Pro, tela Liquid Retina XDR de 14 polegadas, até 18h de bateria e desempenho imbatível para profissionais criativos.",
    especificacoes: {
      "Processador": "Apple M3 Pro (12 núcleos)",
      "Tela": "14.2\" Liquid Retina XDR, 120Hz",
      "Memória RAM": "18GB / 36GB Unified",
      "Armazenamento": "512GB / 1TB / 2TB SSD",
      "GPU": "18 núcleos",
      "Bateria": "Até 18 horas",
      "Portas": "3x Thunderbolt 4, HDMI 2.1, SD",
      "Sistema": "macOS Sonoma",
      "Peso": "1.61 kg"
    },
    rating: 4.9,
    avaliacoes: 1923,
    emEstoque: true,
    lancamento: "Outubro 2023"
  },
  {
    id: 4,
    nome: "Dell XPS 15 OLED",
    preco: 12499.00,
    categoria: "Notebooks",
    imagem: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    descricao: "Dell XPS 15 com display OLED 3.5K, Intel Core i9, NVIDIA RTX 4070 e 32GB RAM DDR5. O notebook Windows mais elegante para criação e produtividade.",
    especificacoes: {
      "Processador": "Intel Core i9-13900H",
      "Tela": "15.6\" OLED 3.5K, 60Hz",
      "Memória RAM": "32GB DDR5",
      "Armazenamento": "1TB NVMe SSD",
      "GPU": "NVIDIA RTX 4070 8GB",
      "Bateria": "86Wh, até 13 horas",
      "Portas": "2x Thunderbolt 4, USB-A, SD",
      "Sistema": "Windows 11 Pro",
      "Peso": "1.86 kg"
    },
    rating: 4.6,
    avaliacoes: 874,
    emEstoque: false,
    lancamento: "Março 2023"
  },
  {
    id: 5,
    nome: "Sony WH-1000XM5",
    preco: 1899.00,
    categoria: "Acessórios",
    imagem: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    descricao: "Fone over-ear com cancelamento de ruído líder da indústria, até 30h de bateria, áudio LDAC Hi-Res e design ultraleve de apenas 250g.",
    especificacoes: {
      "Tipo": "Over-ear, fechado",
      "Cancelamento de Ruído": "Ativo (8 microfones)",
      "Drivers": "30mm, neodímio",
      "Conectividade": "Bluetooth 5.2, NFC, P2",
      "Codecs": "LDAC, AAC, SBC",
      "Bateria": "30h (NC ativado) / 40h (sem NC)",
      "Carregamento": "USB-C, 3min = 3h de uso",
      "Peso": "250g"
    },
    rating: 4.8,
    avaliacoes: 5412,
    emEstoque: true,
    lancamento: "Maio 2022"
  },
  {
    id: 6,
    nome: "PlayStation 5 Slim",
    preco: 3999.00,
    categoria: "Games",
    imagem: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80",
    descricao: "PS5 Slim com SSD ultra-rápido de 1TB, Ray Tracing, 4K 120fps e controle DualSense com feedback háptico. A nova geração de jogos na palma da sua mão.",
    especificacoes: {
      "CPU": "AMD Zen 2, 8 núcleos, 3.5GHz",
      "GPU": "AMD RDNA 2, 10.28 TFLOPS",
      "Resolução": "4K, 8K (upscaling)",
      "Taxa de Frames": "Até 120fps",
      "SSD": "1TB NVMe",
      "Óptico": "Ultra HD Blu-ray 4K",
      "Conectividade": "USB-A 3.1, USB-C, HDMI 2.1",
      "Áudio": "Tempest 3D AudioTech",
      "Peso": "3.2 kg"
    },
    rating: 4.9,
    avaliacoes: 7231,
    emEstoque: true,
    lancamento: "Novembro 2023"
  },
  {
    id: 7,
    nome: "Xbox Series X",
    preco: 4299.00,
    categoria: "Games",
    imagem: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80",
    descricao: "Xbox Series X com 12 teraflops de poder, SSD NVMe de 1TB, Quick Resume e suporte nativo a 4K 60fps e 8K. O console mais poderoso já feito.",
    especificacoes: {
      "CPU": "AMD Zen 2, 8 núcleos, 3.8GHz",
      "GPU": "AMD RDNA 2, 12 TFLOPS",
      "Resolução": "4K nativo, 8K",
      "Taxa de Frames": "Até 120fps",
      "SSD": "1TB NVMe (Custom)",
      "Óptico": "Ultra HD Blu-ray",
      "Conectividade": "3x USB-A, HDMI 2.1, Storage Exp.",
      "Recurso": "Quick Resume, FPS Boost",
      "Peso": "4.45 kg"
    },
    rating: 4.7,
    avaliacoes: 4089,
    emEstoque: true,
    lancamento: "Novembro 2020"
  },
  {
    id: 8,
    nome: "iPad Pro 12.9\" M2",
    preco: 9799.00,
    categoria: "Celulares",
    imagem: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    descricao: "iPad Pro com chip M2, tela mini-LED Liquid Retina XDR, conectividade Thunderbolt e suporte a Apple Pencil 2. O tablet mais avançado do mundo.",
    especificacoes: {
      "Processador": "Apple M2 (8 núcleos)",
      "Tela": "12.9\" mini-LED Liquid Retina XDR",
      "Memória RAM": "8GB / 16GB",
      "Armazenamento": "128GB a 2TB",
      "GPU": "10 núcleos",
      "Câmera": "12MP Wide + 10MP Ultra Wide",
      "Conectividade": "Wi-Fi 6E, 5G (opcional), Thunderbolt",
      "Sistema": "iPadOS 16",
      "Peso": "682g"
    },
    rating: 4.8,
    avaliacoes: 2743,
    emEstoque: false,
    lancamento: "Outubro 2022"
  },
  {
    id: 9,
    nome: "Logitech MX Master 3S",
    preco: 599.90,
    categoria: "Acessórios",
    imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    descricao: "Mouse premium com scroll MagSpeed ultrasilencioso, sensor de 8000 DPI, bateria recarregável de 70 dias e conectividade em até 3 dispositivos.",
    especificacoes: {
      "Sensor": "Darkfield High Precision, 8000 DPI",
      "Botões": "7 programáveis",
      "Scroll": "MagSpeed Eletromagnético",
      "Conectividade": "Bluetooth, Logi Bolt (USB)",
      "Dispositivos": "Até 3 (Easy-Switch)",
      "Bateria": "70 dias (recarga USB-C)",
      "Compatibilidade": "Windows, macOS, iPadOS, Linux",
      "Peso": "141g"
    },
    rating: 4.7,
    avaliacoes: 9876,
    emEstoque: true,
    lancamento: "Junho 2022"
  },
  {
    id: 10,
    nome: "Nintendo Switch OLED",
    preco: 2199.00,
    categoria: "Games",
    imagem: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&q=80",
    descricao: "Nintendo Switch com tela OLED de 7 polegadas, 64GB de armazenamento interno, dock ajustável com porta LAN integrada e Joy-Cons em branco.",
    especificacoes: {
      "CPU/GPU": "NVIDIA Custom Tegra",
      "Tela": "7\" OLED, 1280×720",
      "Armazenamento": "64GB interno + microSD",
      "Bateria": "4310 mAh, 4.5–9h",
      "Conectividade": "Wi-Fi 802.11ac, Bluetooth 4.1",
      "Dock": "HDMI, USB-A x2, LAN integrada",
      "Modos": "TV, Mesa, Portátil",
      "Peso": "320g (sem Joy-Con)"
    },
    rating: 4.8,
    avaliacoes: 6521,
    emEstoque: true,
    lancamento: "Outubro 2021"
  }
];

// =============================================================
//  UTILITÁRIOS COMPARTILHADOS
// =============================================================

function formatarPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

// =============================================================
//  HOME PAGE (index.html)
// =============================================================

function iniciarHomePage() {
  const productList    = document.getElementById("product-list");
  const productCount   = document.getElementById("product-count");
  const searchInput    = document.querySelector("#search");
  const categorySelect = document.querySelector("#category");
  const btnRender      = document.querySelector("#btnRender");

  if (!productList) return; // não está na home

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
      const highlighted = card.classList.contains("highlight");
      console.log(`[Destacar] id=${produto.id} – "${produto.nome}" ${highlighted ? "DESTACADO ★" : "destaque removido"}`);
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

    const cards = document.querySelectorAll(".card");
    console.log(`\n📦 querySelectorAll(".card") – ${cards.length} card(s) renderizado(s):`);
    cards.forEach(function (c) {
      console.log(`  → data-id=${c.getAttribute("data-id")} | "${c.querySelector(".card-title").textContent}"`);
    });
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
    console.log("🏷️  Categorias carregadas:", cats);
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
    console.log("↻ Catálogo recarregado com todos os produtos.");
  });

  console.log("🚀 NEXUSSHOP inicializado – Matrícula: 1638573");
  renderizarCategorias();
  renderizarProdutos(dados);
}

// =============================================================
//  PÁGINA DE DETALHES (detalhes.html)
// =============================================================

function iniciarPaginaDetalhes() {
  const container = document.getElementById("detalhe-container");
  if (!container) return; // não está na página de detalhes

  // Lê o id da query string: detalhes.html?id=3
  const params  = new URLSearchParams(window.location.search);
  const idParam = parseInt(params.get("id"), 10);
  const produto = dados.find(function (p) { return p.id === idParam; });

  console.log(`\n🔍 Query string → id=${idParam}`);

  if (!produto) {
    container.innerHTML = `
      <div class="nao-encontrado">
        <span class="nf-icon">⚠️</span>
        <h2>Produto não encontrado</h2>
        <p>O produto com id=${idParam} não existe no catálogo.</p>
        <a href="index.html" class="btn-voltar">← Voltar ao catálogo</a>
      </div>`;
    return;
  }

  // Atualiza o <title> da aba
  document.title = `${produto.nome} — NEXUSSHOP`;

  const stockClass = produto.emEstoque ? "status-em-estoque" : "status-fora-de-estoque";
  const stockLabel = produto.emEstoque ? "✓ Em Estoque"      : "✕ Fora de Estoque";

  // Monta as linhas de especificações
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

      <!-- Coluna esquerda: imagem -->
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

      <!-- Coluna direita: informações -->
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

  console.log(`✅ Produto carregado → id=${produto.id} | "${produto.nome}" | ${formatarPreco(produto.preco)}`);
}

// =============================================================
//  INICIALIZAÇÃO: detecta qual página está ativa
// =============================================================
iniciarHomePage();
iniciarPaginaDetalhes();
