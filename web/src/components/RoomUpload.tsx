import { useState, useCallback } from "react";
import { Upload, Camera, Loader2 } from "lucide-react";

interface RoomUploadProps {
    onAnalyze: (imageBase64: string) => Promise<void>;
    isAnalyzing: boolean;
}

export default function RoomUpload({ onAnalyze, isAnalyzing }: RoomUploadProps) {
    const [dragOver, setDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const processFile = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target?.result as string;
            setPreview(base64);
        };
        reader.readAsDataURL(file);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    }, [processFile]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }, [processFile]);

    const handleAnalyze = async () => {
        if (!preview) return;
        await onAnalyze(preview);
    };

    return (
        <div>
            {!preview ? (
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                        padding: "3rem", textAlign: "center", borderRadius: 16,
                        border: `2px dashed ${dragOver ? "var(--color-accent)" : "var(--color-border)"}`,
                        background: dragOver ? "rgba(16,185,129,0.05)" : "var(--color-surface)",
                        cursor: "pointer", transition: "all 0.2s"
                    }}
                >
                    <Upload size={40} style={{ color: "var(--color-accent)", marginBottom: 12 }} />
                    <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Drop a room photo here</h3>
                    <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>
                        JPG, PNG up to 10MB
                    </p>
                    <label style={{
                        padding: "0.6rem 2rem", borderRadius: 10,
                        background: "var(--color-accent)", color: "white",
                        fontWeight: 600, cursor: "pointer", display: "inline-flex",
                        alignItems: "center", gap: 6
                    }}>
                        <Camera size={16} /> Select Photo
                        <input type="file" accept="image/*" onChange={handleFileSelect}
                            style={{ display: "none" }} />
                    </label>
                </div>
            ) : (
                <div style={{
                    borderRadius: 16, overflow: "hidden",
                    border: "1px solid var(--color-border)", background: "var(--color-surface)"
                }}>
                    <img src={preview} alt="Room preview"
                        style={{ width: "100%", maxHeight: 300, objectFit: "cover" }} />
                    <div style={{ padding: "1rem", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                        <button onClick={() => { setPreview(null); }}
                            style={{
                                padding: "0.5rem 1.5rem", borderRadius: 8, fontWeight: 600,
                                background: "transparent", border: "1px solid var(--color-border)",
                                cursor: "pointer", color: "inherit"
                            }}>
                            Change
                        </button>
                        <button onClick={handleAnalyze} disabled={isAnalyzing}
                            style={{
                                padding: "0.5rem 1.5rem", borderRadius: 8, fontWeight: 600,
                                background: "var(--color-accent)", color: "white", border: "none",
                                cursor: isAnalyzing ? "wait" : "pointer",
                                display: "flex", alignItems: "center", gap: 6,
                                opacity: isAnalyzing ? 0.7 : 1
                            }}>
                            {isAnalyzing ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Analyzing...</> : "Analyze Room"}
                        </button>
                    </div>
                </div>
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
    );
}
