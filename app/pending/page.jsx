"use client";

export default function PendingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50">
      <h1 className="text-4xl font-bold text-yellow-600 mb-4">Pagamento pendente ⏳</h1>
      <p className="text-lg text-gray-700 mb-6">
        Seu pagamento ainda está sendo processado. Você receberá a confirmação em breve.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
      >
        Voltar para o site
      </a>
    </div>
  );
}