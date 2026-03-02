import { useState, useCallback, useRef } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface ScanResult {
    roomStyle: string;
    items: { name: string; category: string; estimatedPrice: string; style: string }[];
    suggestions: string[];
}

function ImageUploader({ onSelect, preview, onClear }: { onSelect: (b64: string) => void; preview: string | null; onClear: () => void }) {
    const [dragging, setDragging] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const handle = useCallback((f: File) => {
        if (!f.type.startsWith('image/')) return;
        const r = new FileReader();
        r.onload = (e) => onSelect(e.target?.result as string);
        r.readAsDataURL(f);
    }, [onSelect]);

    if (preview) return (
        <div className="roomiq-preview">
            <img src={preview} alt="Room" />
            <button className="btn btn--ghost" onClick={onClear} style={{ marginTop: 'var(--space-sm)' }}>✕ Remove</button>
        </div>
    );

    return (
        <div
            className={`roomiq-dropzone ${dragging ? 'active' : ''}`}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => ref.current?.click()}
        >
            <span style={{ fontSize: '3rem' }}>🏠</span>
            <p style={{ fontWeight: 600, marginTop: 'var(--space-sm)' }}>Drop a room photo or click to upload</p>
            <p style={{ color: 'var(--color-smoke-gray)', fontSize: '0.85rem' }}>JPG, PNG, WebP — up to 10MB</p>
            <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }} />
        </div>
    );
}

const CATEGORY_ICONS: Record<string, string> = {
    furniture: '🪑', decor: '🎨', lighting: '💡', textile: '🧵', storage: '📦',
};

export default function AppHome() {
    const [img, setImg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const analyze = useAction(api.ai.analyzeRoom);
    const save = useMutation(api.functions.saveScan);

    const handleAnalyze = useCallback(async () => {
        if (!img) return;
        setLoading(true);
        setError(null);
        try {
            const r = await analyze({ imageBase64: img });
            setResult(r);
            await save(r);
        } catch (e: any) {
            setError(e.message || 'Analysis failed');
        } finally {
            setLoading(false);
        }
    }, [img, analyze, save]);

    const reset = () => { setImg(null); setResult(null); setError(null); };

    if (loading) {
        return (
            <div className="roomiq-page animate-fade-in">
                <div className="card" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', padding: 'var(--space-2xl)' }}>
                    <div className="animate-spin" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>🔍</div>
                    <h2 style={{ marginBottom: 'var(--space-sm)' }}>Analyzing Your Room</h2>
                    <p style={{ color: 'var(--color-smoke-gray)' }}>Identifying furniture, estimating prices, and generating suggestions…</p>
                </div>
            </div>
        );
    }

    if (result) {
        return (
            <div className="roomiq-page animate-fade-in">
                <div className="card" style={{ maxWidth: 680, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                        <span style={{ fontSize: '2rem' }}>🎨</span>
                        <div>
                            <h2>Room Analysis</h2>
                            <p style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{result.roomStyle}</p>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Identified Items</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                        {result.items?.map((item, i) => (
                            <div key={i} className="card" style={{ padding: 'var(--space-md)' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-xs)' }}>
                                    {CATEGORY_ICONS[item.category] || '📦'}
                                </div>
                                <div style={{ fontWeight: 600, marginBottom: 2 }}>{item.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-smoke-gray)', marginBottom: 'var(--space-xs)' }}>{item.category} • {item.style}</div>
                                <div style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{item.estimatedPrice}</div>
                            </div>
                        ))}
                    </div>

                    {result.suggestions?.length > 0 && (
                        <>
                            <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '1rem' }}>💡 Suggestions</h3>
                            <ul style={{ color: 'var(--color-smoke-gray)', fontSize: '0.9rem', paddingLeft: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </>
                    )}

                    <div style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
                        <button className="btn btn--primary" onClick={reset}>📸 Scan Another Room</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="roomiq-page animate-fade-in">
            <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ marginBottom: 'var(--space-md)' }}>
                    Scan Your <span style={{ color: 'var(--color-accent)' }}>Room</span>
                </h1>
                <p style={{ color: 'var(--color-smoke-gray)', fontSize: '1.05rem', marginBottom: 'var(--space-xl)', lineHeight: 1.7 }}>
                    Upload a room photo — AI identifies furniture, estimates prices, and suggests improvements.
                </p>

                <ImageUploader onSelect={setImg} preview={img} onClear={() => setImg(null)} />

                {error && (
                    <p style={{ color: 'var(--color-hot-red)', marginTop: 'var(--space-md)', fontSize: '0.9rem' }}>{error}</p>
                )}

                <button className="btn btn--primary btn--lg" disabled={!img} onClick={handleAnalyze} style={{ marginTop: 'var(--space-lg)' }}>
                    🔍 Analyze Room
                </button>
            </div>
        </div>
    );
}
