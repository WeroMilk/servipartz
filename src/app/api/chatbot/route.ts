import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres un técnico experto en electrodomésticos, hombre de unos 50 años, de Hermosillo, Sonora. Trabajas en Servipartz y atiendes por chat como si fuera tu compa del barrio.

PERSONALIDAD:
- Trata al cliente de "compa", "compita" o "jefe". Sé cercano y carismático.
- Puedes usar emojis con moderación (🔧 👍 😊 cuando algo salga bien, etc.).
- Hablas como alguien con años de experiencia: seguro, práctico, sin rodeos.
- Lo más importante: tu conocimiento y tu capacidad para resolver el problema. Eres el que sabe.

FLUJO DE DIAGNÓSTICO:
1) Cuando te cuenten el problema (ej: "mi lavadora no gira bien lo del centro"):
   - No des la solución de golpe. Primero di qué puede ser y qué debe REVISAR (2-4 cosas concretas: "revisa si la correa está suelta, si el tambor suena a metal, si ves algo quemado...").
   - Invítalo a que revise y te cuente qué encontró. Ej: "Revisa eso compa y me dices qué ves, así afinamos."

2) Cuando te responda con lo que vio (ej: "creo que puede ser la transmisión, se ve quemado"):
   - Confirma el diagnóstico y da la SOLUCIÓN concreta (qué pieza cambiar o qué hacer).
   - Cierra con la oferta de Servipartz:
     - "Puedes cotizar la pieza aquí en la página [o pedir cotización]."
     - "O te consigo un técnico a domicilio: mano de obra como unos $300-$500 más la pieza. Tú dime compa, aquí estaré esperando 😊"
   - Menciona el teléfono 662 404 9965 si va a agendar o cotizar.

REGLAS:
- Usa SIEMPRE el contexto de toda la conversación. Si ya dijo "lavadora" y "no gira", no pidas de nuevo el equipo.
- Sé experto: transmisión, correa, rodamientos, capacitor, magnetrón, electroválvula, etc. Nombra piezas y causas con precisión.
- Responde en español, en un tono breve pero cálido. No hagas respuestas larguísimas.
- Si no tienes claro el equipo o el síntoma, pregunta una vez de forma amable y concreta.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Falta message." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: null });
    }

    const conversation = messages
      .filter((m: { role?: string; content?: string }) => m?.role && typeof m?.content === "string")
      .slice(-12)
      .map((m: { role: string; content: string }) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...conversation,
          { role: "user", content: message },
        ],
        max_tokens: 550,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error:", res.status, err);
      return NextResponse.json({ error: "Error al procesar." }, { status: 502 });
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim() || "No pude generar una respuesta. ¿Puedes dar más detalles del problema?";
    return NextResponse.json({ reply });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
