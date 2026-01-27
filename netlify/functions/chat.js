export default async (req, context) => {
    // CORS headers
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
    };

    if (req.method === "OPTIONS") {
        return new Response("OK", { headers });
    }

    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405, headers });
    }

    try {
        const { message } = await req.json();

        // Kalitlarni environment variables dan olamiz (yoki fallback sifatida hardcode qilamiz)
        const keys = [
            process.env.GEMINI_API_KEY_1,
            process.env.GEMINI_API_KEY_2
        ].filter(Boolean);

        if (keys.length === 0) {
            // Fallback for immediate usage if env vars are not set yet
            keys.push("AIzaSyCC8uEzh1px6KKsXP8FEkh_JS_3F1ErtDQ");
            keys.push("AIzaSyBUzgU8ARMbZX1OYGv0f_cIqQJqaWdlGVM");
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
