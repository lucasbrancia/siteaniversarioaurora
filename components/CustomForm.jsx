import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from 'sonner';

export default function CustomForm() {
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const scriptURL = "https://script.google.com/macros/s/AKfycbyjUaXPd-TTDm87_hdiUIw_ySoWW5W_7qoMHINKmDcguW_-x-G6IrL9XReh6El4Ebuh/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      toast.success("Dados enviados com sucesso!");
      setFormData({ nome: "", email: "" });
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-pink-100"
    >
      <div>
        <label className="block mb-2 text-gray-700 font-semibold">Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Digite seu nome"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Digite seu email"
        />
      </div>

      <div className="col-span-1 md:col-span-2 text-center mt-4">
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-4 rounded-full font-bold text-white transition ${
            loading
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 shadow"
          }`}
        >
          {loading ? "Enviando..." : "Confirmar Presença"}
        </button>
      </div>
    </motion.form>
  );
}