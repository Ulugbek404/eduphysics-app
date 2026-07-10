const ALLOWED_ORIGINS = [
    "https://eduphysics-app.web.app",
    "https://eduphysics-app.firebaseapp.com",
    "http://localhost:5173",
];

export default async (req, context) => {
    // CORS headers — faqat ruxsat etilgan originlar
    const origin = req.headers.get("origin") || "";
    const headers = {
        "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Vary": "Origin",
    };

    if (req.method === "OPTIONS") {
        return new Response("OK", { headers });
    }

    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405, headers });
    }

    try {
        const { message } = await req.json();

        if (typeof message !== "string" || message.length === 0 || message.length > 4000) {
            return new Response(JSON.stringify({ error: "Noto'g'ri so'rov" }), {
                status: 400,
                headers: { ...headers, "Content-Type": "application/json" },
            });
        }

        // Kalitlar FAQAT environment variables dan olinadi
        const keys = [
            process.env.GEMINI_API_KEY_1,
            process.env.GEMINI_API_KEY_2
        ].filter(Boolean);

        if (keys.length === 0) {
            return new Response(JSON.stringify({ error: "API key not configured" }), {
                status: 500,
                headers: { ...headers, "Content-Type": "application/json" },
            });
        }

        // Random bitta kalitni tanlash
        const apiKey = keys[Math.floor(Math.random() * keys.length)];

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: message }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    }
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Google API Error");
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Javob olinmadi.";

        return new Response(JSON.stringify({ text }), {
            headers: { ...headers, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...headers, "Content-Type": "application/json" },
        });
    }
};

export const config = {
    path: "/api/chat"
};
