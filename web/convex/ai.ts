import { action } from "./_generated/server";
import { v } from "convex/values";
export const analyzeRoom = action({
    args: { imageBase64: v.string() },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are RoomIQ, an interior design AI. Analyze room photos: identify furniture, estimate prices, suggest improvements. Output JSON:
{"roomStyle":"<e.g. modern minimalist>","items":[{"name":"","category":"furniture|decor|lighting|textile|storage","estimatedPrice":"$X-$Y","style":"<specific style>"}],"suggestions":["improvement idea"]}` },
                    { role: "user", content: [{ type: "text", text: "Analyze this room." }, { type: "image_url", image_url: { url: args.imageBase64 } }] },
                ], temperature: 0.4, max_tokens: 2000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
