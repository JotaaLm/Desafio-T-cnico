// Mock de dados
const colaboradores = [
  { id: 1, nome: "João Silva" },
  { id: 2, nome: "Maria Oliveira" },
  { id: 3, nome: "Carlos Souza" },
];

const workshops = [
  {
    id: 1,
    nome: "Workshop de C#",
    dataRealizacao: "2024-12-10",
    descricao: "Workshop introdutório sobre C#.",
    participantes: [1, 3],
  },
  {
    id: 2,
    nome: "Workshop de JavaScript",
    dataRealizacao: "2024-12-15",
    descricao: "Workshop avançado sobre JavaScript.",
    participantes: [2],
  },
];

// Referência para o container principal
const app = document.getElementById("app");

// Função para limpar a tela
function clearScreen() {
  app.innerHTML = "";
}

// Função para criar botões estilizados
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = "btn";
  button.addEventListener("click", onClick);
  return button;
}

// Tela 1: Lista de Colaboradores
function renderColaboradores() {
  clearScreen();

  const title = document.createElement("h1");
  title.textContent = "Colaboradores";
  app.appendChild(title);

  const list = document.createElement("div");
  list.className = "card-container";

  colaboradores.forEach((colaborador) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = colaborador.nome;
    list.appendChild(card);
  });

  app.appendChild(list);

  const backButton = createButton("Voltar", renderMenu);
  app.appendChild(backButton);
}

// Tela 2: Lista de Workshops
function renderWorkshops() {
  clearScreen();

  const title = document.createElement("h1");
  title.textContent = "Workshops";
  app.appendChild(title);

  const list = document.createElement("div");
  list.className = "card-container";

  workshops.forEach((workshop) => {
    const card = document.createElement("div");
    card.className = "card";
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = workshop.nome;
    link.className = "link";
    link.addEventListener("click", () => renderWorkshopDetails(workshop));
    card.appendChild(link);
    list.appendChild(card);
  });

  app.appendChild(list);

  const backButton = createButton("Voltar", renderMenu);
  app.appendChild(backButton);
}

// Tela de Detalhes do Workshop
function renderWorkshopDetails(workshop) {
  clearScreen();

  const title = document.createElement("h1");
  title.textContent = workshop.nome;
  app.appendChild(title);

  const details = document.createElement("p");
  details.innerHTML = `
    <strong>Data:</strong> ${workshop.dataRealizacao}<br>
    <strong>Descrição:</strong> ${workshop.descricao}
  `;
  app.appendChild(details);

  const participantsTitle = document.createElement("h2");
  participantsTitle.textContent = "Participantes";
  app.appendChild(participantsTitle);

  const list = document.createElement("div");
  list.className = "card-container";

  const participantes = colaboradores.filter((colaborador) =>
    workshop.participantes.includes(colaborador.id)
  );

  participantes.forEach((colaborador) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = colaborador.nome;
    list.appendChild(card);
  });

  app.appendChild(list);

  const backButton = createButton("Voltar", renderWorkshops);
  app.appendChild(backButton);

  // Exibir gráfico de barras
  renderBarChart();
  // Exibir gráfico de pizza
  renderPieChart();
}

// Tela Principal (Menu)
function renderMenu() {
  clearScreen();

  const title = document.createElement("h1");
  title.textContent = "Gestão de Workshops";
  app.appendChild(title);

  const colabButton = createButton("Ver Colaboradores", renderColaboradores);
  app.appendChild(colabButton);

  const workshopButton = createButton("Ver Workshops", renderWorkshops);
  app.appendChild(workshopButton);
}

// Função para gerar gráfico de barras
function renderBarChart() {
  const ctx = document.createElement("canvas");
  app.appendChild(ctx);

  const participantesPorColaborador = colaboradores.map((colaborador) => {
    const workshopsParticipados = workshops.filter(workshop =>
      workshop.participantes.includes(colaborador.id)
    );
    return workshopsParticipados.length;
  });

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: colaboradores.map(colab => colab.nome),
      datasets: [{
        label: 'Quantidade de Workshops Participados',
        data: participantesPorColaborador,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Função para gerar gráfico de pizza
function renderPieChart() {
  const ctx = document.createElement("canvas");
  app.appendChild(ctx);

  const participantesPorWorkshop = workshops.map((workshop) => {
    return workshop.participantes.length;
  });

  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: workshops.map(workshop => workshop.nome),
      datasets: [{
        data: participantesPorWorkshop,
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverOffset: 4
      }]
    }
  });
}

// Inicializa a aplicação com o menu principal
renderMenu();
