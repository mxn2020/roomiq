import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Clock, Package, ArrowLeft } from "lucide-react";

export default function ScanHistoryPage() {
    const scans = useQuery(api.functions.getRecent);

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" }}>
            <Link to="/app" style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                color: "var(--color-text-secondary)", textDecoration: "none", marginBottom: "1rem", fontSize: "0.9rem"
            }}>
                <ArrowLeft size={16} /> Back to Home
            </Link>

            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Scan History</h1>

            {!scans ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>Loading...</div>
            ) : scans.length === 0 ? (
                <div style={{
                    textAlign: "center", padding: "3rem", borderRadius: 14,
                    background: "var(--color-surface)", border: "1px solid var(--color-border)"
                }}>
                    <Package size={40} style={{ color: "var(--color-text-secondary)", marginBottom: 12 }} />
                    <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>No scans yet.</p>
                    <Link to="/analyze" style={{
                        padding: "0.5rem 1.5rem", borderRadius: 8, background: "var(--color-accent)",
                        color: "white", fontWeight: 600, textDecoration: "none"
                    }}>
                        Analyze your first room
                    </Link>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {scans.map((scan: any) => (
                        <div key={scan._id} style={{
                            padding: "1.25rem", borderRadius: 14,
                            background: "var(--color-surface)", border: "1px solid var(--color-border)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <h3 style={{ fontWeight: 600, fontSize: "1rem" }}>{scan.roomStyle}</h3>
                                <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                                    <Clock size={14} /> {new Date(scan.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: 8 }}>
                                {scan.items.slice(0, 4).map((item: any, i: number) => (
                                    <span key={i} style={{
                                        padding: "2px 8px", borderRadius: 6, fontSize: "0.8rem",
                                        background: "rgba(16,185,129,0.1)", color: "var(--color-accent)"
                                    }}>
                                        {item.name} · {item.estimatedPrice}
                                    </span>
                                ))}
                                {scan.items.length > 4 && (
                                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>+{scan.items.length - 4} more</span>
                                )}
                            </div>
                            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                                {scan.items.length} items identified · {scan.suggestions.length} suggestions
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
