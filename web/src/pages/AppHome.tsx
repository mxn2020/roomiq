import { useState } from "react";
import { Home, Upload, Camera, Sparkles, History, TrendingUp } from "lucide-react";

export default function AppHome() {
    const [dragOver, setDragOver] = useState(false);

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
            {/* Hero */}
            <div style={{
                textAlign: "center", marginBottom: "2rem",
                background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.08))",
                borderRadius: 16, padding: "2.5rem 1.5rem", border: "1px solid rgba(16,185,129,0.2)"
            }}>
                <Home size={48} style={{ color: "var(--color-accent)", marginBottom: 12 }} />
                <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>RoomIQ</h1>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem" }}>
                    Upload a room photo — AI identifies furniture, estimates prices, and suggests improvements
                </p>
            </div>

            {/* Upload Area */}
            <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); }}
                style={{
                    padding: "3rem", textAlign: "center", borderRadius: 16, marginBottom: "2rem",
                    border: `2px dashed ${dragOver ? "var(--color-accent)" : "var(--color-border)"}`,
                    background: dragOver ? "rgba(16,185,129,0.05)" : "var(--color-surface)",
                    cursor: "pointer", transition: "all 0.2s"
                }}
            >
                <Upload size={40} style={{ color: "var(--color-accent)", marginBottom: 12 }} />
                <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Drop a room photo here</h3>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>or click to browse • JPG, PNG up to 10MB</p>
                <button style={{
                    padding: "0.6rem 2rem", borderRadius: 10, background: "var(--color-accent)",
                    color: "white", fontWeight: 600, border: "none", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 6
                }}>
                    <Camera size={16} /> Select Photo
                </button>
            </div>

            {/* Feature Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {[
                    { icon: Sparkles, title: "AI Analysis", desc: "Identifies furniture, decor, and materials", color: "#8B5CF6" },
                    { icon: TrendingUp, title: "Price Estimates", desc: "Get estimated costs for each item", color: "#10B981" },
                    { icon: History, title: "Design Tips", desc: "Personalized improvement suggestions", color: "#3B82F6" },
                ].map((f, i) => (
                    <div key={i} style={{
                        padding: "1.25rem", borderRadius: 12, background: `${f.color}08`,
                        border: `1px solid ${f.color}20`, textAlign: "center"
                    }}>
                        <f.icon size={28} style={{ color: f.color, marginBottom: 8 }} />
                        <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{f.title}</h4>
                        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
