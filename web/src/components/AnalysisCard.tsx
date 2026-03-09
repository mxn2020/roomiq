import { Armchair, Lamp, Frame, Sofa, Package } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    furniture: <Sofa size={18} />,
    decor: <Frame size={18} />,
    lighting: <Lamp size={18} />,
    textile: <Armchair size={18} />,
    storage: <Package size={18} />,
};

interface RoomItem {
    name: string;
    category: string;
    estimatedPrice: string;
    style: string;
    buyLink?: string;
}

interface AnalysisResult {
    roomStyle: string;
    items: RoomItem[];
    suggestions: string[];
}

export default function AnalysisCard({ result }: { result: AnalysisResult }) {
    return (
        <div style={{
            borderRadius: 16, background: "var(--color-surface)",
            border: "1px solid var(--color-border)", overflow: "hidden"
        }}>
            {/* Room Style Header */}
            <div style={{
                padding: "1rem 1.25rem",
                background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.05))",
                borderBottom: "1px solid var(--color-border)"
            }}>
                <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>Room Style</span>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginTop: 2 }}>{result.roomStyle}</h3>
            </div>

            {/* Items */}
            <div style={{ padding: "1rem 1.25rem" }}>
                <h4 style={{ fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                    Identified Items ({result.items.length})
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {result.items.map((item, i) => (
                        <div key={i} style={{
                            display: "flex", alignItems: "center", gap: "0.75rem",
                            padding: "0.6rem 0.75rem", borderRadius: 10,
                            background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.1)"
                        }}>
                            <span style={{ color: "var(--color-accent)" }}>
                                {CATEGORY_ICONS[item.category] || <Package size={18} />}
                            </span>
                            <div style={{ flex: 1 }}>
                                <span style={{ fontWeight: 500 }}>{item.name}</span>
                                <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginLeft: 8 }}>
                                    {item.style}
                                </span>
                            </div>
                            <span style={{ fontWeight: 600, color: "var(--color-accent)", fontSize: "0.9rem" }}>
                                {item.estimatedPrice}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
                <div style={{ padding: "0 1.25rem 1.25rem" }}>
                    <h4 style={{ fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>💡 Improvement Suggestions</h4>
                    <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                        {result.suggestions.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}
