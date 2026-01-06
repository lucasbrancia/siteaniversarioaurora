import React, { useState } from "react";
import { CardPayment } from "@mercadopago/sdk-react";

const gifts = [
   { id: 1, name: 'Jogo de encaixe', price: 'R$ 50,00', icon: 'https://m.media-amazon.com/images/I/61NFQOTxNxL._AC_SX679_.jpg', qrcode:"/qrcodes/50.jpeg" },
  { id: 2, name: 'Livro sensorial', price: 'R$ 100,00', icon: 'https://m.media-amazon.com/images/I/712O6F+wUTL._SY342_.jpg', qrcode:"/qrcodes/100.jpeg"},
  { id: 3, name: 'Coleção de livros', price: 'R$ 120,00', icon: 'https://images.tcdn.com.br/img/img_prod/1359051/meu_primeiro_clssico_o_pequeno_prncipe_1_20250825172612_77ecc995c0b4.jpg', qrcode:"/qrcodes/120.jpeg" },
  { id: 4, name: 'Bicicleta de equilibrio', price: 'R$ 190,00', icon: 'https://http2.mlstatic.com/D_NQ_NP_2X_832764-MLA99988975421_112025-F.webp', qrcode:"/qrcodes/190.jpeg" },
  { id: 5, name: 'Fisher-Price Brinquedo para Bebês Girafa com Blocos', price: 'R$ 210,00', icon: 'https://m.media-amazon.com/images/I/51ZD5QAtRpL._AC_SY450_.jpg', qrcode:"/qrcodes/210.jpeg" },
  { id: 6, name: 'Torre de Aprendizagem Montessori', price: 'R$ 250,00', icon: 'https://m.media-amazon.com/images/I/51-stjm4MFL._AC_SY450_.jpg', qrcode:"/qrcodes/250.jpeg" },
  { id: 7, name: 'Mini Quadriciclo Elétrico Infantil Rosa', price: 'R$ 340,00', icon: 'https://http2.mlstatic.com/D_NQ_NP_2X_894812-MLA80072204872_102024-F.webp', qrcode:"/qrcodes/340.jpeg" },
  { id: 8, name: 'Cama montessoriana', price: 'R$ 600,00', icon: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTuB1GrfkJT9Ws0o4DcG8cyjLzlb2jsgz6latuum8eON1YQLP9zlQLOZPS2I3cEtM5b86vJYJU8gPlkFeGLKwKoh4o4Wx83YME4l0V1qJBoskO8aWpf3VX4', qrcode:"/qrcodes/600.jpeg" },
  { id: 9, name: 'Carrinho, Triciclo, Andador E Bicicleta', price: 'R$ 700,00', icon: 'https://http2.mlstatic.com/D_NQ_NP_2X_608115-MLA100008942543_122025-F.webp', qrcode:"/qrcodes/700.jpeg" },
  { id: 10, name: 'Jipe Infantil Elétrico', price: 'R$ 900,00', icon: 'https://a-static.mlcdn.com.br/420x420/jipe-infantil-eletrico-12v-caminhonete-motorizado-controle-remoto-musica-brinq-kids/brinquei/p12489/ed8847336d3ec0582415be0b3f9b1c7f.jpeg', qrcode:"/qrcodes/900.jpeg" },
  { id: 11, name: 'Boneco Labubu', price: 'R$ 1.500,00', icon: 'https://http2.mlstatic.com/D_NQ_NP_2X_796899-MLB93064472540_092025-F-boneco-labubu-mokoko-rosa-close-to-sweet-39cm-pop-mart.webp', qrcode:"/qrcodes/1500.jpeg" },
  { id: 12, name: 'PlayStation 5', price: 'R$ 3.300,00', icon: 'https://http2.mlstatic.com/D_NQ_NP_2X_921596-MLA100042443481_122025-F.webp', qrcode:"/qrcodes/1500.jpeg" },
];

function toNumberBRL(label) {
  return Number(label.replace("R$", "").replace(".", "").replace(",", ".").trim());
}

export default function GiftCheckout() {
  const [selected, setSelected] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = async (gift) => {
    setConfirmed(false);
    setSelected(gift);
    const price = toNumberBRL(gift.price);

    const res = await fetch("http://localhost:5000/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: gift.id, name: gift.name, price }),
    });

    const data = await res.json();
    setPreferenceId(data.preferenceId);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Escolha um presente 🎁</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            onClick={() => handleSelect(gift)}
            className={`p-4 rounded-xl border transition ${
              selected?.id === gift.id ? "border-pink-500 bg-pink-50" : "border-gray-200"
            }`}
          >
            <div className="text-4xl mb-2">{gift.icon}</div>
            <div className="font-semibold">{gift.name}</div>
            <div className="text-pink-600">{gift.price}</div>
          </button>
        ))}
      </div>

      {preferenceId && (
        <>
          <CardPayment
          initialization={{ amount: toNumberBRL(selected.price) }}
          customization={{ visual: { style: { theme: "default" } } }}
          onSubmit={(param) => {
          console.log("Dados do pagamento:", param);
          setConfirmed(true);
          }}
          />

          {confirmed && (
            <div className="mt-6 text-center text-green-600 font-semibold">
              ✅ Presente confirmado! Obrigado pela contribuição 💖
            </div>
          )}
        </>
      )}
    </div>
  );
}