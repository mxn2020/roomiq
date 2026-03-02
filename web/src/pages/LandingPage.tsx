import { useNavigate } from 'react-router-dom'
import { Camera, Zap, TrendingUp, Shield, Palette, Lightbulb } from 'lucide-react'

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="landing-page">
            <section className="landing-hero">
                <div className="landing-hero__content">
                    <h1 className="landing-hero__title">
                        <Camera size={40} style={{ color: 'var(--color-accent)' }} />
                        <span>RoomIQ</span>
                    </h1>
                    <p className="landing-hero__tagline">
                        Upload a room photo and let AI identify furniture, estimate prices, and suggest design improvements — all in seconds.
                    </p>
                    <div className="landing-hero__actions">
                        <button className="btn btn--primary btn--lg" onClick={() => navigate('/app')}>
                            🏠 Scan Your Room
                        </button>
                        <button className="btn btn--secondary btn--lg" onClick={() => navigate('/pricing')}>
                            View Plans
                        </button>
                    </div>
                </div>
            </section>

            <section className="landing-features">
                <h2 className="landing-section__title">How It Works</h2>
                <div className="landing-features__grid">
                    <div className="landing-feature">
                        <div className="landing-feature__icon"><Camera size={32} /></div>
                        <h3>Upload a Photo</h3>
                        <p>Snap a picture of any room — living room, bedroom, kitchen, or office.</p>
                    </div>
                    <div className="landing-feature">
                        <div className="landing-feature__icon"><Palette size={32} /></div>
                        <h3>AI Identifies Items</h3>
                        <p>Our AI identifies every piece of furniture, decor, lighting, and textile in the room.</p>
                    </div>
                    <div className="landing-feature">
                        <div className="landing-feature__icon"><Lightbulb size={32} /></div>
                        <h3>Get Suggestions</h3>
                        <p>Receive price estimates, style analysis, and actionable improvement suggestions.</p>
                    </div>
                </div>
            </section>

            <section className="landing-features">
                <h2 className="landing-section__title">Enterprise Ready</h2>
                <div className="landing-features__grid">
                    <div className="landing-feature">
                        <Shield size={28} style={{ color: 'var(--color-accent)' }} />
                        <h3>Secure by Default</h3>
                        <p>Authentication, authorization, and audit logging built in.</p>
                    </div>
                    <div className="landing-feature">
                        <Zap size={28} style={{ color: 'var(--color-warm-amber)' }} />
                        <h3>Lightning Fast</h3>
                        <p>Real-time serverless backend ensures instant room analysis.</p>
                    </div>
                    <div className="landing-feature">
                        <TrendingUp size={28} style={{ color: 'var(--color-neon-emerald)' }} />
                        <h3>Stripe Billing</h3>
                        <p>Subscription management with Stripe checkout and portal.</p>
                    </div>
                </div>
            </section>

            <section className="landing-cta">
                <h2>Ready to analyze your room?</h2>
                <p>Join today and discover the hidden potential of your spaces.</p>
                <button className="btn btn--primary btn--lg" onClick={() => navigate('/login')}>
                    🚀 Sign Up Free
                </button>
            </section>
        </div>
    )
}
