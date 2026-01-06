import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, name, price } = body;

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: String(id),
            title: name,
            quantity: 1,
            unit_price: price,
          },
        ],
        back_urls: {
          success: `${process.env.BASE_URL}/success`,
          failure: `${process.env.BASE_URL}/failure`,
          pending: `${process.env.BASE_URL}/pending`,
        },
        auto_return: 'approved',
      },
    });

    return Response.json({ id: preference.id, init_point: preference.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return new Response(JSON.stringify({ error: 'Erro interno' }), { status: 500 });
  }
}