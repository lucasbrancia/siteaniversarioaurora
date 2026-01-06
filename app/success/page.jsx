"use client";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Pagamento aprovado ✅</h1>
      <p className="text-lg text-gray-700 mb-6">
        Obrigado pela sua contribuição! Seu presente foi confirmado com sucesso 💖
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700"
      >
        Voltar para o site
      </a>
    </div>
  );
}