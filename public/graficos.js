const API_URL_GRAFICOS = "http://localhost:3000/produtos";

const CORES = {
  accent:  "#00e5ff",
  purple:  "#7c3aed",
  green:   "#22c55e",
  yellow:  "#f59e0b",
  pink:    "#ec4899",
  border:  "#2a2d3e",
  muted:   "#7b82a0",
};

const CATEGORIA_CORES = {
  "Acessórios": "#00e5ff",
  "Celulares":  "#7c3aed",
  "Games":      "#22c55e",
  "Notebooks":  "#f59e0b",
};

Chart.defaults.color       = CORES.muted;
Chart.defaults.borderColor = CORES.border;
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.font.size   = 13;

function agruparPorCategoria(arr, fn) {
  const cats = [...new Set(arr.map(p => p.categoria))].sort();
  return cats.map(cat => {
    const grupo = arr.filter(p => p.categoria === cat);
    return { cat, valor: fn(grupo) };
  });
}

function media(arr, campo) {
  return arr.reduce((s, p) => s + p[campo], 0) / arr.length;
}

function renderStats(dados) {
  const total     = dados.length;
  const emEstoque = dados.filter(p => p.emEstoque).length;
  const precoMed  = dados.reduce((s, p) => s + p.preco, 0) / total;
  const totalAv   = dados.reduce((s, p) => s + p.avaliacoes, 0);

  const items = [
    { label: "Produtos",     value: total,    sub: "no catálogo" },
    { label: "Em Estoque",   value: emEstoque, sub: `${total - emEstoque} esgotado(s)` },
    { label: "Preço Médio",  value: precoMed.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }), sub: "valor médio geral" },
    { label: "Avaliações",   value: totalAv.toLocaleString("pt-BR"), sub: "total acumulado" },
  ];

  const row = document.getElementById("stats-row");
  items.forEach(({ label, value, sub }) => {
    const card = document.createElement("div");
    card.classList.add("stat-card");
    card.innerHTML = `
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
      <div class="stat-sub">${sub}</div>
    `;
    row.appendChild(card);
  });
}

function renderPizza(dados) {
  const agrupado = agruparPorCategoria(dados, g => g.length);
  const labels   = agrupado.map(a => a.cat);
  const valores  = agrupado.map(a => a.valor);
  const cores    = labels.map(l => CATEGORIA_CORES[l] ?? CORES.pink);

  new Chart(document.getElementById("chartPizza"), {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data: valores,
        backgroundColor: cores.map(c => c + "cc"),
        borderColor: cores,
        borderWidth: 2,
        hoverOffset: 10,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { padding: 18, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed} produto(s)`
          }
        }
      }
    }
  });
}

function renderPreco(dados) {
  const agrupado = agruparPorCategoria(dados, g => Math.round(media(g, "preco")));
  const labels   = agrupado.map(a => a.cat);
  const valores  = agrupado.map(a => a.valor);
  const cores    = labels.map(l => CATEGORIA_CORES[l] ?? CORES.pink);

  new Chart(document.getElementById("chartPreco"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Preço Médio (R$)",
        data: valores,
        backgroundColor: cores.map(c => c + "33"),
        borderColor: cores,
        borderWidth: 2,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` R$ ${ctx.parsed.y.toLocaleString("pt-BR")}` } }
      },
      scales: {
        x: { grid: { color: CORES.border } },
        y: { grid: { color: CORES.border }, ticks: { callback: v => "R$ " + (v / 1000).toFixed(0) + "k" } }
      }
    }
  });
}

function renderRating(dados) {
  const agrupado = agruparPorCategoria(dados, g => +media(g, "rating").toFixed(2));
  const labels   = agrupado.map(a => a.cat);
  const valores  = agrupado.map(a => a.valor);
  const cores    = labels.map(l => CATEGORIA_CORES[l] ?? CORES.pink);

  new Chart(document.getElementById("chartRating"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Rating Médio",
        data: valores,
        backgroundColor: cores.map(c => c + "33"),
        borderColor: cores,
        borderWidth: 2,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: CORES.border } },
        y: { grid: { color: CORES.border }, min: 4.0, max: 5.0, ticks: { stepSize: 0.2 } }
      }
    }
  });
}

function renderAvaliacoes(dados) {
  const sorted = [...dados].sort((a, b) => b.avaliacoes - a.avaliacoes);
  const labels  = sorted.map(p => p.nome);
  const valores = sorted.map(p => p.avaliacoes);
  const cores   = sorted.map(p => CATEGORIA_CORES[p.categoria] ?? CORES.pink);

  new Chart(document.getElementById("chartAvaliacoes"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Avaliações",
        data: valores,
        backgroundColor: cores.map(c => c + "33"),
        borderColor: cores,
        borderWidth: 2,
        borderRadius: 6,
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x.toLocaleString("pt-BR")} avaliações` } }
      },
      scales: {
        x: { grid: { color: CORES.border }, ticks: { callback: v => v.toLocaleString("pt-BR") } },
        y: { grid: { display: false } }
      }
    }
  });
}

async function iniciarGraficos() {
  const statsRow = document.getElementById("stats-row");

  try {
    const res  = await fetch(API_URL_GRAFICOS);
    const dados = await res.json();

    renderStats(dados);
    renderPizza(dados);
    renderPreco(dados);
    renderRating(dados);
    renderAvaliacoes(dados);
  } catch {
    statsRow.innerHTML = `<p style="color:#ef4444;grid-column:1/-1">Erro ao carregar dados. Verifique se o JSON Server está rodando.</p>`;
  }
}

iniciarGraficos();
