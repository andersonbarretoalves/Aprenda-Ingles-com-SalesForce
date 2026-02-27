import { useState, useEffect } from "react";

const vocabulary = [
  { en: "Lead", pt: "Lead / Potencial cliente" },
  { en: "Opportunity", pt: "Oportunidade" },
  { en: "Account", pt: "Conta" },
  { en: "Contact", pt: "Contato" },
  { en: "Dashboard", pt: "Dashboard / Painel" },
  { en: "Pipeline", pt: "Pipeline / Funil de vendas" },
  { en: "Campaign", pt: "Campanha" },
  { en: "Report", pt: "Relatório" },
  { en: "Workflow", pt: "Fluxo de trabalho" },
  { en: "Trigger", pt: "Gatilho" },
  { en: "Activities", pt: "Atividades" },
  { en: "tasks", pt: "tarefas" },
  { en: "Outline", pt: "Estrutura" },
  { en: "Filter", pt: "Filtro" },
  { en: "Fields ", pt: "Campos" },
  { en: "Chatter", pt: "Chatter / Comunicação" },
  { en: "Customer", pt: "Cliente" },
  { en: "Quick Find", pt: "Busca Rápida" },
  { en: "Installed Packages", pt: "Pacotes instalados" },
  { en: "Details", pt: "Detalhes" },
  { en: "schema", pt: "esquema" },
  { en: "Warm", pt: "Esquentar" },
  { en: "Flows", pt: "Fluxos" },
  { en: "Owner", pt: "Proprietário" },
  { en: "lead source", pt: "origem do lead" },
  { en: "Stage ", pt: "Estágio" },
  { en: "Amount ", pt: "Valor" },
  { en: "Summarize", pt: "Resumir" },
  { en: "Sum ", pt: "Soma" },
  { en: "Rows", pt: "Linhas" },
  { en: "Age", pt: "Duração" },
  { en: "Range", pt: "Intervalo" },
  { en: "Resize", pt: "Redimensionar" },
];

const phrases = [
  {
    en: "Can you grant me access to the org?",
    pt: "Você pode me conceder acesso à org?"
  },
  {
    en: "I will deploy this component to production.",
    pt: "Vou implantar este componente em produção."
  },
  {
    en: "The validation rule is blocking the record.",
    pt: "A regra de validação está bloqueando o registro."
  },
  {
    en: "We need to run the tests before deploying.",
    pt: "Precisamos executar os testes antes de implantação."
  },
  {
    en: "The SOQL query is returning too many records.",
    pt: "A consulta SOQL está retornando muitos registros."
  },
  {
    en: "Can you review my pull request?",
    pt: "Você pode revisar meu pull request?"
  },
  {
    en: "The batch apex job has failed.",
    pt: "O job batch apex falhou."
  },
  {
    en: "I need to profile the user's permission.",
    pt: "Preciso verificar as permissões do usuário."
  },
  {
    en: "Let's schedule a demo for next week.",
    pt: "Vamos agendar uma demonstração para a próxima semana."
  },
  {
    en: "The integration is not syncing correctly.",
    pt: "A integração não está sincronizando corretamente."
  },
  {
    en: "Opportunities with Projects",
    pt: "Oportunidades com projetos"
  },
  {
    en: "Campaigns with Contacts",
    pt: "Campanhas com contatos"
  },
  {
    en: "Leads with Activities",
    pt: "Leads com Atividades"
  },
  {
    en: "sales overviwer",
    pt: "supervisor de vendas"
  },
  {
    en: "Validation Rule",
    pt: "Regra de validação"
  },
  {
    en: "Lightning Component",
    pt: "Componente Lightning"
  },
  {
    en: "Visualforce Page",
    pt: "Página Visualforce"
  },
  {
    en: "Apex Class",
    pt: "Classe Apex"
  },
  {
    en: "Salesforce Object",
    pt: "Objeto Salesforce"
  },
  {
    en: "Object Manager",
    pt: "Gerenciador de Objetos"
  },
  {
    en: "New Report",
    pt: "Novo relatório"
  },
  {
    en: "Direct Customer Accounts",
    pt: "Contas de clientes diretos"
  },
  {
    en: "Permission Sets",
    pt: "Conjuntos de Permissões"
  },
  {
    en: "Lightning App Builder",
    pt: "Criador de aplicativo Lightning"
  },
  {
    en: "Lead Source Report",
    pt: "Relatório de origem do lead"
  },
  {
    en: "Add Opportunity Filter",
    pt: "Adicionar filtro de oportunidade"
  },
  {
    en: "Stale Opportunities",
    pt: "Oportunidades obsoletas"
  },
  {
    en: "Orphan Contacts",
    pt: "Contatos órfãos"
  },
  {
    en: "Contains Partner",
    pt: "Contém Parceiro"
  },
  {
    en: "Open Opportunities This Year",
    pt: "Oportunidades Abertas Este Ano"
  },
  {
    en: "Detail Rows",
    pt: "Linhas de detalhe"
  },
  {
    en: "Closed Cases for All Time",
    pt: "Casos Fechados de Todos os Tempos"
  },
  {
    en: "Closed Won Opportunities",
    pt: "Oportunidades Fechadas e Ganhas"
  },
  {
    en: "Next Steps",
    pt: "Próxima etapa"
  },
  {
    en: "Fiscal Period",
    pt: "Período Fiscal"
  },
  {
    en: "Opportunity Owner",
    pt: "Proprietário da Oportunidade"
  },
  {
    en: "Owner Role",
    pt: "Função do Proprietário"
  },
  {
    en: "Customer Support Reports",
    pt: "Relatórios de Suporte ao Cliente"
  },
  {
    en: "Leads by Lead Source",
    pt: "Leads por Origem do Lead"
  },
  {
    en: "Donut Chart",
    pt: "Gráfico de Anel"
  },
  {
    en: "Let dashboard viewers choose whom they view the dashboard as",
    pt: "Permitir que os visualizadores do painel escolham como exibir o painel"
  }
];

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default function App() {
  const [current, setCurrent] = useState(null);
  const [showRandom, setShowRandom] = useState(false);
  const [randomVocab, setRandomVocab] = useState(null);
  const [randomPhrase, setRandomPhrase] = useState(null);


  const generateRandom = () => {
    setRandomVocab(getRandomItem(vocabulary));
    setRandomPhrase(getRandomItem(phrases));
  };

  useEffect(() => {
    if (showRandom) {
      setRandomVocab(getRandomItem(vocabulary));
      setRandomPhrase(getRandomItem(phrases));
    }
  }, [showRandom]);

  const lessons = [
    {
      id: 1,
      title: "Vocabulário Básico de Salesforce",
      items: vocabulary
    },
    {
      id: 2,
      title: "Frases Comuns no Trabalho",
      items: phrases
    }
  ];

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 600 }}>
      <h1>Aprender Inglês - Salesforce</h1>
      <p>Escolha uma opção abaixo:</p>

      <div
        onClick={() => setShowRandom(true)}
        style={{
          border: "2px solid #28a745",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
          cursor: "pointer",
          background: "#f0f8f0"
        }}
      >
        <strong>🎲 Vocabulário e Frase Aleatória</strong>
        <p style={{ margin: "5px 0 0 0", fontSize: 14, color: "#666" }}>
          Veja uma palavra e uma frase aleatória
        </p>
      </div>

      <p style={{ marginTop: 20 }}>Ou clique em uma lição para estudar:</p>

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          onClick={() => setCurrent(lesson)}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            cursor: "pointer"
          }}
        >
          <strong>{lesson.title}</strong>
        </div>
      ))}

      {current && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid #aaa",
            borderRadius: 10
          }}
        >
          <h2>{current.title}</h2>
          <ul>
            {current.items.map((item, index) => (
              <li key={index}>
                <strong>{item.en}</strong> — {item.pt}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setCurrent(null)}
            style={{
              marginTop: 15,
              padding: "8px 12px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 5
            }}
          >
            Voltar
          </button>
        </div>
      )}
      {showRandom && randomVocab && randomPhrase && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            border: "2px solid #28a745",
            borderRadius: 10,
            background: "#f9f9f9"
          }}
        >
          <h2>🎲 Vocabulário Aleatório</h2>
          <div style={{ marginBottom: 20 }}>
            <strong style={{ fontSize: 18, color: "#333" }}>{randomVocab.en}</strong>
            <p style={{ margin: "5px 0 0 0", color: "#666" }}>{randomVocab.pt}</p>
          </div>

          <h2>📝 Frase Aleatória</h2>
          <div>
            <strong style={{ fontSize: 18, color: "#333" }}>{randomPhrase.en}</strong>
            <p style={{ margin: "5px 0 0 0", color: "#666" }}>{randomPhrase.pt}</p>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button
              onClick={generateRandom}
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                fontSize: 14
              }}
            >
              🔄 Nova Palavra
            </button>
            <button
              onClick={() => setShowRandom(false)}
              style={{
                padding: "10px 20px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                fontSize: 14
              }}
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
