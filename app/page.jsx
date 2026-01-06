import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, MapPin, Gift, Calendar, Clock, Heart, ChevronDown, Pause, Play, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import GiftCheckout from "./components/GiftCheckout";
import CustomForm from "./CustomForm";
import './App.css';

const MUSIC_URL = 'https://customer-assets.emergentagent.com/job_bowmouse-gifts/artifacts/x0opus9h_Giramille_-_Alecrim_Dourado.mp3';
const GOOGLE_FORM_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmYkdYhUl_UU_31cY0cvV207qxQJbzjP6M-JsC1rt8liRNu--1ppTKVz8lSUpv7OH9wE5fQEh_UI2G/pubhtml';
initMercadoPago('TEST-5e57ffe6-7d58-4b63-a2eb-65ab2c3bf832');

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


const MinnieIcon = () => (
  <div className="relative w-32 h-32 mx-auto">
    {/* Orelha esquerda */}
    <div className="absolute top-0 left-0 w-12 h-12 bg-gray-900 rounded-full"></div>
    {/* Orelha direita */}
    <div className="absolute top-0 right-0 w-12 h-12 bg-gray-900 rounded-full"></div>
    {/* Cabeça */}
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-900 rounded-full"></div>

    {/* Laço rosa com bolinhas brancas */}
    <svg
  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-14"
  viewBox="0 0 100 100"
>
  {/* Laço esquerdo */}
  <ellipse cx="30" cy="50" rx="20" ry="15" fill="#FF69B4" />
  {/* Laço direito */}
  <ellipse cx="70" cy="50" rx="20" ry="15" fill="#FF69B4" />
  {/* Nó central */}
  <circle cx="50" cy="50" r="10" fill="#FF1493" />

  {/* Bolinhas brancas no laço esquerdo */}
  <circle cx="25" cy="45" r="3" fill="white" />
  <circle cx="35" cy="55" r="2.5" fill="white" />
  <circle cx="30" cy="60" r="2" fill="white" />

  {/* Bolinhas brancas no laço direito */}
  <circle cx="65" cy="45" r="3" fill="white" />
  <circle cx="75" cy="55" r="2.5" fill="white" />
  <circle cx="70" cy="60" r="2" fill="white" />
</svg>
  </div>
);

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked. User interaction needed.');
      }
    };
    
    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      data-testid="audio-player-button"
      onClick={togglePlay}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-pink-500 text-white shadow-lg flex items-center justify-center hover:bg-pink-600 ${
        isPlaying ? 'shadow-pink-300 shadow-2xl' : ''
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isPlaying ? { boxShadow: ['0 0 0 0 rgba(255, 105, 180, 0.7)', '0 0 0 20px rgba(255, 105, 180, 0)'] } : {}}
      transition={isPlaying ? { duration: 1.5, repeat: Infinity } : {}}
    >
      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
    </motion.button>
  );
};

const GiftCard = ({ gift }) => {
  const [showQR, setShowQR] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleOpen = async () => {
    setShowQR(true);
    setConfirmed(false);

    // Se quiser manter o QR Code Pix, ainda pode chamar o backend
    try {
      const price = Number(gift.price.replace("R$", "").replace(".", "").replace(",", ".").trim());
      const res = await fetch("/api/create_preference", ... {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: gift.id, name: gift.name, price }),
      });
      const data = await res.json();
      console.log("Preference criada:", data);
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
    }
  };

  return (
    <>
      <motion.div
        className="relative bg-white/90 rounded-3xl p-6 shadow-lg border-2 border-pink-100 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={handleOpen}
      >
        <div className="mb-3 text-center">
        <img
            src={gift.icon}
            alt={gift.name}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto object-contain"
            />
        </div>
        <h3 className="font-bold text-gray-900 text-center mb-2">{gift.name}</h3>
        <p className="text-pink-600 text-center text-lg">{gift.price}</p>
      </motion.div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="bg-white max-h-[90vh] overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-pink-600">{gift.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pb-6">
            {/* QR Code Pix (simulação visual) */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
              <div className="bg-white p-4 rounded-xl">
                <img
                src={gift.qrcode}
                alt={`QR Code para ${gift.name}`}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain mx-auto"
                loading="lazy"
                />
              </div>
            </div>

            {/* Checkout Transparente Mercado Pago */}
            <CardPayment
              initialization={{
                amount: Number(gift.price.replace("R$", "").replace(".", "").replace(",", ".").trim()),
              }}
              customization={{ visual: { style: { theme: "default" } } }}
              onSubmit={(param) => {
                console.log("Dados do pagamento:", param);
                setConfirmed(true);
              }}
            />

            {confirmed && (
              <div className="mt-4 text-center text-green-600 font-semibold">
                ✅ Presente confirmado! Obrigado pela contribuição 💖
              </div>
            )}

            <Button
              onClick={() => setShowQR(false)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

function App() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] relative overflow-hidden">
      <Toaster position="top-center" />
      <AudioPlayer />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#FFC0CB 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.15
      }}></div>

      <section data-testid="hero-section" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MinnieIcon />
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-900 mt-8 mb-4 text-center" style={{ fontFamily: 'Waltograph' }} >
            AURORA
          </h1>
          <p className="font-serif-accent text-2xl sm:text-3xl text-pink-600 mb-8">
            está fazendo 1 aninho!
          </p>
          
          <motion.div
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <span className="font-body text-gray-900 font-medium">Você está convidado!</span>
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          </motion.div>
        </motion.div>

        <motion.button
          data-testid="scroll-down-button"
          onClick={() => scrollToSection('details')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-pink-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      <section id="details" data-testid="details-section" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-5xl text-center text-gray-900 mb-12"
          >
            Detalhes da Festa
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-pink-100"
            >
              <Calendar className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="font-body font-bold text-xl text-gray-900 mb-2">Data</h3>
              <p className="font-serif-accent text-lg text-gray-700">14 de Fevereiro</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-pink-100"
            >
              <Clock className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="font-body font-bold text-xl text-gray-900 mb-2">Horário</h3>
              <p className="font-serif-accent text-lg text-gray-700">13:00 (1 da tarde)</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="location" data-testid="location-section" className="py-16 px-4 bg-white/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-5xl text-center text-gray-900 mb-12"
          >
            Local da Festa
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-pink-100 text-center"
          >
            <MapPin className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="font-body font-bold text-2xl text-gray-900 mb-4">Endereço</h3>
            <p className="font-body text-lg text-gray-700 mb-6">
              <div className="w-full h-64 sm:h-96 lg:h-[500px] rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1818.4279017439628!2d-46.7034629345008!3d-23.52571332853488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef87af8ced57d%3A0xe9d4f4d2d3926d84!2sKid%20Corner%20Buffet!5e0!3m2!1sen!2sbr!4v1767363328714!5m2!1sen!2sbr"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              </div>
            </p>
            <p className="text-sm text-gray-500 font-body italic">
              R. Coriolano, 1643 - Vila Romana, São Paulo - SP, 05047-001
            </p>
          </motion.div>
        </div>
      </section>

      <section id="gifts" data-testid="gifts-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-5xl text-center text-gray-900 mb-4"
          >
            Sugestões de Presente
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-center text-gray-600 mb-12"
          >
            Clique em um presente para contribuir com PIX, cartão de débito ou crédito.
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GiftCard gift={gift} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="rsvp" data-testid="rsvp-section" className="py-16 px-4 bg-white/30">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-5xl text-center text-gray-900 mb-12"
          >
            Confirme sua Presença
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-pink-100 text-center"
          >
            <Gift className="w-16 h-16 text-pink-500 mx-auto mb-6" />
            <p className="font-body text-lg text-gray-700 mb-8">
              Por favor confirme sua presença, é muito importante para nós!
              Confirme a presença do acompanhante se houver.
              <br />
            </p>
            <CustomForm />
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-gray-600"
        >
          Feito com <Heart className="w-4 h-4 inline text-pink-500 fill-pink-500" /> para Aurora
        </motion.p>
      </footer>
    </div>
  );
}

export default App;