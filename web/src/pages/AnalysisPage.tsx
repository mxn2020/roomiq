import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import RoomUpload from "../components/RoomUpload";
import AnalysisCard from "../components/AnalysisCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AnalysisResult {
    roomStyle: string;
    items: Array<{ name: string; category: string; estimatedPrice: string; style: string; buyLink?: string }>;
    suggestions: string[];
}

export default function AnalysisPage() {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const analyzeRoom = useAction(api.ai.analyzeRoom);
    const saveScan = useMutation(api.functions.saveScan);

    const handleAnalyze = async (imageBase64: string) => {
        setAnalyzing(true);
        setError(null);
        try {
            const analysis = await analyzeRoom({ imageBase64 });
            setResult(analysis as AnalysisResult);
            await saveScan({
                items: (analysis as AnalysisResult).items,
                roomStyle: (analysis as AnalysisResult).roomStyle,
                suggestions: (analysis as AnalysisResult).suggestions,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Analysis failed");
        }
        setAnalyzing(false);
    };

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" }}>
            <Link to="/app" style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                color: "var(--color-text-secondary)", textDecoration: "none", marginBottom: "1rem", fontSize: "0.9rem"
            }}>
                <ArrowLeft size={16} /> Back to Home
            </Link>

            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Room Analysis</h1>

            <RoomUpload onAnalyze={handleAnalyze} isAnalyzing={analyzing} />

            {error && (
                <div style={{
                    marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: 10,
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                    color: "#EF4444"
                }}>
                    {error}
                </div>
            )}

            {result && (
                <div style={{ marginTop: "1.5rem" }}>
                    <AnalysisCard result={result} />
                </div>
            )}
        </div>
    );
}
