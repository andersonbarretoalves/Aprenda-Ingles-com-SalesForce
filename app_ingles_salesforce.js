import { useState } from "react";

export default function App() {
  const [current, setCurrent] = useState(null);

  const lessons = [
    {
      id: 1,
      title: "Vocabulário Básico de Salesforce",
      items: [
        { en: "Lead", pt: "Lead / Potencial cliente" },
        { en: "Opportunity", pt: "Oportunidade" },
        { en: "Account", pt: "Conta" },
        { en: "Contact", pt: "Contato" },
        { en: "Dashboard", pt: "Dashboard / Painel" }
      ]
    },
    {
      id: 2,
      title: "Frases Comuns no Trabalho",
      items: [
        { en: "Can you grant me access to the org?", pt: "Você pode me conceder acesso à org?" },
        { en: "I will deploy this component to production.", pt: "Vou implantar este componente em produção." },
        { en: "The validation rule is blocking the record.", pt: "A regra de validação está bloqueando o registro." }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4">Aprender Inglês - Salesforce</h1>
      <p className="mb-4">Clique em uma lição para estudar o vocabulário e frases técnicas.</p>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="border rounded-xl p-4 shadow cursor-pointer hover:bg-gray-50"
            onClick={() => setCurrent(lesson)}
          >
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
          </div>
        ))}
      </div>

      {current && (
        <div className="mt-6 border rounded-xl p-4 shadow bg-white">
          <h2 className="text-2xl font-bold mb-3">{current.title}</h2>
          <ul className="space-y-2">
            {current.items.map((item, index) => (
              <li key={index} className="p-3 border rounded-lg">
                <strong>{item.en}</strong>
                <br />
                <span className="text-gray-600">{item.pt}</span>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => setCurrent(null)}
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
