export async function POST(request) {
  try {
    const payment = await request.json();

    console.log("Webhook recebido:", payment);

    if (payment.type === "payment") {
      console.log("Pagamento ID:", payment.data.id);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return new Response("Erro interno", { status: 500 });
  }
}