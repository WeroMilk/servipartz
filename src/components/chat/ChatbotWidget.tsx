"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "¿Qué tal compa? 👋 Aquí el técnico de Servipartz, en Hermosillo. Cuéntame qué equipo traes y qué le pasa (ej: \"mi lavadora no gira el centro\", \"el refri no enfría\"). Te voy guiando con qué revisar y al rato te digo la solución; si necesitas la pieza o un técnico a domicilio, te lo armamos. ¿Qué tienes?",
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const reply = await getExpertReply(text, newMessages);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Hubo un error. Puedes llamarnos al 662 404 9965 o cotizar y agendar cita desde la página.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/20 sm:bg-transparent sm:pointer-events-none"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:w-[380px] max-h-[70vh] z-[101] rounded-2xl border border-zinc-200 bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-900 text-white">
              <span className="font-semibold">Asistente Servipartz</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-zinc-900 text-white rounded-br-md"
                        : "bg-zinc-100 text-zinc-900 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-2.5">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t border-zinc-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe el problema..."
                  className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-zinc-900 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 text-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-red-600 p-2.5 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Enviar"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors focus:ring-4 focus:ring-red-300"
        aria-label="Abrir asistente"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>
    </>
  );
}

async function getExpertReply(userMessage: string, allMessages: Message[]): Promise<string> {
  const payload = {
    message: userMessage,
    messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
  };
  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
      return getLocalExpertReply(allMessages);
    }
  } catch {
    // fallback to local expert
  }
  return getLocalExpertReply(allMessages);
}

const CIERRE_SERVIPARTZ = " Puedes cotizar la pieza aquí en la página o te consigo un técnico a domicilio: mano de obra aprox $300-$500 más la pieza. Tú dime compa, aquí estaré esperando 😊 Tel. 662 404 9965.";

function getLocalExpertReply(messages: Message[]): string {
  const context = messages.map((m) => m.content).join(" ").toLowerCase();
  const lastUser = messages.filter((m) => m.role === "user").pop()?.content?.toLowerCase() ?? "";

  const has = (...words: string[]) => words.some((w) => context.includes(w));
  const userReportedBack = (...words: string[]) => words.some((w) => lastUser.includes(w));

  // ——— Lavadora: flujo diagnóstico (revisa → luego solución + oferta) ———
  if (has("lavadora")) {
    // Si ya dio seguimiento (quemado, revisé, creo que es, transmisión, correa, etc.) → dar solución y cierre
    if (userReportedBack("quemado", "quemada", "revisé", "revisé y", "creo que es", "es la transmisión", "es la correa", "son los rodamientos", "está rota", "se ve mal", "encontré", "la correa está", "la transmisión")) {
      return "Muy bien compa, con eso ya le atinamos 👍 La solución es cambiar esa pieza. En Servipartz la tenemos." + CIERRE_SERVIPARTZ;
    }
    if (has("no gira", "no centrifuga", "no lava bien", "no lava la ropa", "no lava", "tambor", "centro no gira", "lo del centro", "no gira lo del centro", "no lava bien la ropa")) {
      return "Compa, cuando no gira el tambor o no centrifuga puede ser transmisión, correa, rodamientos o amortiguadores. Revisa: 1) Si la correa está suelta o rota (por atrás), 2) Si el tambor suena a metal o hace ruido raro, 3) Si ves algo quemado o oliendo feo en la transmisión. Revisa eso y me dices qué ves, así afinamos 🔧";
    }
    if (has("no llena", "no toma agua", "no entra agua")) {
      return "Compa, revisa que la llave del agua esté abierta y que las mangueras no estén dobladas. Si eso está bien, puede ser la electroválvula o el presostato. Abre la tapa de arriba (si es de tapa superior) y dime si ves alguna manguera desconectada o algo raro. Cuéntame qué ves 👍";
    }
    if (has("fuga", "gotea")) {
      return "Las fugas suelen ser mangueras o la bomba de desagüe. Revisa las conexiones de las mangueras y por dónde exacto está goteando. Dime de dónde sale el agua y te digo qué pieza es.";
    }
    if (has("ruido", "hace ruido", "suena")) {
      return "Compa, los ruidos fuertes suelen ser rodamientos del tambor o amortiguadores. Si suena a metal rechinando, es rodamiento; si golpetea, puede ser amortiguadores o ropa desbalanceada. Revisa si el tambor se mueve mucho al girar y cuéntame qué oyes.";
    }
    return "Compa, cuéntame más: ¿no centrifuga, no llena, hace ruido o tiene fuga? Con eso te digo qué revisar y te guío paso a paso 👍";
  }

  // ——— Refrigerador / nevera ———
  if (has("refrigerador", "refri", "nevera", "refrigeradora")) {
    if (userReportedBack("quemado", "revisé", "creo que es", "es el compresor", "es el capacitor", "relé", "no arranca")) {
      return "Listo compa, con eso ya sabemos. La solución es cambiar esa pieza." + CIERRE_SERVIPARTZ;
    }
    if (has("no enfría", "no enfría bien", "no enfria")) {
      return "Compa, revisa: 1) Que la puerta cierre bien y el empaque no esté roto, 2) Que el condensador (rejilla atrás) no esté lleno de polvo, 3) Si el compresor (abajo atrás) arranca o hace ruido raro. Si no arranca o huele a quemado puede ser capacitor o relé. Revisa y me dices qué ves 👍";
    }
    return "Compa, ¿no enfría, hace ruido o no prende el compresor? Dime el síntoma y te digo qué revisar paso a paso.";
  }

  // ——— Licuadora ———
  if (has("licuadora")) {
    if (userReportedBack("quemado", "revisé", "es el motor", "huele feo")) {
      return "Sí compa, cuando huele a quemado casi siempre es el motor. Lo tenemos." + CIERRE_SERVIPARTZ;
    }
    if (has("no prende", "no enciende", "huele a quemado")) {
      return "Compa, si no prende o huele a quemado suele ser el motor. Revisa que el vaso esté bien puesto y que no haya nada atorado en las cuchillas. Si aun así huele a quemado o no gira, es el motor. Cuéntame qué ves 🔧";
    }
    if (has("ruido", "hace ruido")) {
      return "El ruido puede ser el eje, las cuchillas o el vaso mal colocado. Si el motor zumba y no gira, es el motor. Revisa y me dices.";
    }
    return "Compa, ¿no prende, hace ruido o huele raro? Dime y te guío.";
  }

  // ——— Microondas ———
  if (has("microondas", "microonda")) {
    if (has("no calienta", "no calienta bien")) {
      return "Compa, cuando no calienta suele ser magnetrón, capacitor o diodo. Eso no lo abras tú, es peligroso. Lo mejor es que un técnico lo revise. Te consigo uno a domicilio: mano de obra aprox $300-$500 más la pieza. Tú dime, aquí estaré 😊 662 404 9965.";
    }
    if (has("no gira", "charola", "bandeja")) {
      return "Si la charola no gira es el motor de la bandeja. Lo tenemos. Cotiza en la página o te consigo técnico." + CIERRE_SERVIPARTZ;
    }
    return "Compa, ¿no calienta o no gira la charola? Dime y te digo qué pieza es.";
  }

  // ——— Estufa ———
  if (has("estufa")) {
    return "Compa, revisa que haya gas y que los quemadores no estén tapados. Si el piloto no prende o no enciende, puede ser válvula o encendedor. Revisa eso y me dices qué hace. Tenemos quemadores y refacciones." + CIERRE_SERVIPARTZ;
  }

  // ——— Aire acondicionado ———
  if (has("aire", "minisplit", "aire acondicionado", "ac")) {
    if (userReportedBack("revisé", "creo que es", "capacitor", "compresor")) {
      return "Perfecto compa, con eso ya le atinamos. Esa pieza la tenemos." + CIERRE_SERVIPARTZ;
    }
    return "Compa, si no enfría limpia filtros y la rejilla del condensador. Si no prende o hace ruido raro puede ser capacitor o compresor. Revisa y cuéntame qué ves. Tenemos refacciones 👍";
  }

  // ——— Soldadura ———
  if (has("soldadura", "soldador")) {
    return "Compa, en soldadora revisa conexiones, tierra y que el amperaje vaya con el electrodo. Si necesitas electrodos, careta o refacciones las tenemos. Cotiza en la página o llámanos al 662 404 9965 👍";
  }

  // Sin electrodoméstico detectado
  return "Compa, cuéntame qué equipo es (lavadora, refri, licuadora, microondas, estufa, aire, etc.) y qué le pasa. Te voy guiando con qué revisar y al final te digo la solución o te consigo la pieza y hasta un técnico si lo necesitas 😊 662 404 9965.";
}
