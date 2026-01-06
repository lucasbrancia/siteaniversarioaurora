"use client";

export default function FailurePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Pagamento falhou ❌</h1>
      <p className="text-lg text-gray-700 mb-6">
        Infelizmente não conseguimos processar sua contribuição. Tente novamente mais tarde.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700"
      >
        Voltar para o site
      </a>
    </div>
  );
}