import React, { useState, useEffect, useRef } from 'react';
import { currentVersionPhotos, familyVoice } from '../data';
import InstallerWindow from './InstallerWindow';

const STEPS = [
    { left: null, right: null },
    { left: { img: '/diamonds.png', msg: 'abe aaj college jaldi khatam hogya chalo be kahi chalte hai', imgSide: 'left' }, right: null },
    { left: { img: '/diamonds.png', msg: 'chalo be elpro chalte', imgSide: 'left' }, right: null },
    { left: null, right: { img: '/rutul.png', msg: 'krushna yaar mujhe hostel chod de tu me nhi aari', imgSide: 'right' } },
    { left: null, right: { img: '/rutul.png', msg: 'tumlog jao me hostel jaati', imgSide: 'right' } },
    { left: { img: '/whyy.jpg', msg: null, imgSide: 'left' }, right: null },
    { left: null, right: { img: '/rutul.png', msg: 'yaar tum log jao na mera man nhi hai', imgSide: 'right' } },
    { left: { img: '/cat.jpg', msg: null, imgSide: 'left' }, right: null },
];

const AVATAR_SIZE = '140px';

const BubbleLeft = ({ msg }) => (
    <div style={{
        background: 'white', padding: '12px 16px',
        borderRadius: '18px 18px 18px 4px', border: '2px solid #ffb6c1',
        fontSize: '14px', color: '#333', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        marginBottom: '10px', animation: 'slideFromLeft 0.4s ease-out',
        maxWidth: '260px', lineHeight: '1.5'
    }}>
        {msg}
    </div>
);

const BubbleRight = ({ msg }) => (
    <div style={{
        background: 'white', padding: '12px 16px',
        borderRadius: '18px 18px 4px 18px', border: '2px solid #ffb6c1',
        fontSize: '14px', color: '#333', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        marginBottom: '10px', animation: 'slideFromRight 0.4s ease-out',
        maxWidth: '260px', lineHeight: '1.5', textAlign: 'right'
    }}>
        {msg}
    </div>
);

// ─── Family Voice Note Modal (All 3 photos + 1 audio) ─────────────────────────
const FamilyVoiceModal = ({ photos, onClose }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [error, setError] = useState(null);

    const togglePlay = () => {
        if (!audioRef.current) return;
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            const dur = audio.duration && isFinite(audio.duration) ? audio.duration : Math.max(duration, 0.1);
            if (audio.currentTime > 0 && Math.abs(audio.currentTime - dur) < 0.1) {
                audio.currentTime = 0;
                setProgress(0);
                setCurrentTime(0);
            }
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    if (err.name !== 'NotAllowedError' && err.name !== 'AbortError') {
                        setError(`Playback issue: ${err.message}`);
                    }
                    setIsPlaying(false);
                });
            }
        }
    };

    const formatTime = (secs) => {
        if (!secs || isNaN(secs) || !isFinite(secs)) return '0:00';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleSeek = (e) => {
        if (!audioRef.current || !duration || !isFinite(duration)) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newTime = (x / rect.width) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress((newTime / duration) * 100);
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 999,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'fadeIn 0.3s ease-out',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    border: '3px solid #ffb6c1',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    padding: '30px',
                    width: '380px',
                    maxWidth: '90vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '18px',
                    animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '12px', right: '12px',
                        background: '#fff0f5', border: 'none', borderRadius: '50%',
                        width: '32px', height: '32px', cursor: 'pointer',
                        color: '#ff69b4', fontSize: '18px', fontWeight: 'bold'
                    }}
                >✕</button>

                {/* All 3 photos in one row */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {photos.map((p, i) => (
                        <div key={p.name} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                            animation: `popIn ${0.3 + i * 0.15}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
                        }}>
                            <img
                                src={p.image}
                                alt={p.name}
                                style={{
                                    width: '90px', height: '90px',
                                    objectFit: 'cover', borderRadius: '50%',
                                    border: '3px solid #ff69b4',
                                    boxShadow: '0 6px 20px rgba(255,105,180,0.35)',
                                }}
                            />
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#d81b60' }}>
                                {p.emoji} {p.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '18px', margin: '0 0 2px', color: '#ff1493' }}>Family Voice Note 💕</h2>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                        🎙️ {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={familyVoice}
                    onPlay={() => { setIsPlaying(true); setError(null); }}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={(e) => {
                        const tgt = e.target;
                        setCurrentTime(tgt.currentTime);
                        if (tgt.duration && isFinite(tgt.duration)) {
                            setProgress((tgt.currentTime / tgt.duration) * 100);
                        }
                    }}
                    onLoadedMetadata={(e) => {
                        const dur = isFinite(e.target.duration) ? e.target.duration : (e.target.duration || 1);
                        setDuration(dur);
                        setLoading(false);
                    }}
                    onEnded={() => {
                        setIsPlaying(false);
                        setProgress(100);
                        setCurrentTime(duration);
                    }}
                    onError={(e) => {
                        const err = e.target.error;
                        let msg = "Could not load audio.";
                        if (err?.code === 2) msg = "Network error while loading audio.";
                        if (err?.code === 3) msg = "Decode Error: File might be corrupted.";
                        if (err?.code === 4) msg = "Not Supported: Browser can't play this format.";
                        if (err?.code >= 2) setError(msg);
                        setLoading(false);
                    }}
                />

                {error && (
                    <div style={{
                        background: '#fff0f0', border: '1px solid #ffc0c0',
                        color: '#d00', fontSize: '11px', padding: '10px',
                        borderRadius: '10px', width: '100%', textAlign: 'center'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <div style={{
                    width: '100%', padding: '15px', borderRadius: '20px',
                    background: '#fff5f8', border: '1px solid #ffdae9'
                }}>
                    <div onClick={handleSeek} style={{
                        height: '8px', background: '#ffd1e3', borderRadius: '4px',
                        marginBottom: '15px', cursor: 'pointer', position: 'relative'
                    }}>
                        <div style={{
                            height: '100%', width: `${progress}%`,
                            background: 'linear-gradient(90deg, #ff69b4, #ff1493)',
                            borderRadius: '4px', transition: 'width 0.1s linear'
                        }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={togglePlay}
                            disabled={loading}
                            style={{
                                width: '56px', height: '56px', borderRadius: '50%',
                                border: 'none', cursor: 'pointer',
                                background: loading ? '#ccc' : 'linear-gradient(135deg, #ff69b4, #ff1493)',
                                color: 'white', fontSize: '24px',
                                boxShadow: '0 5px 15px rgba(255,20,147,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            {loading ? '⏳' : (isPlaying ? '⏸' : '▶')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
const CurrentVersionPage = ({ onResume }) => {
    const [step, setStep] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) return;
        const initial = setTimeout(() => setStep(1), 1000);
        const timer = setInterval(() => {
            setStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }, 12000);
        return () => { clearTimeout(initial); clearInterval(timer); };
    }, [showModal]);

    const current = STEPS[step];
    const avatarStyle = { width: AVATAR_SIZE, height: AVATAR_SIZE, objectFit: 'contain', borderRadius: '15px', border: '3px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' };

    return (
        <>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                @keyframes slideFromLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes slideFromRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
            `}</style>

            <InstallerWindow title="Version 1.0 Snapshot">
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                        <h3 style={{ color: '#ff1493', margin: '0 0 4px' }}>Birthday Snapshot</h3>
                        <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>Tap the photo to hear the family voice note! 🎙️</p>
                    </div>

                    {/* All 3 photos in a single clickable frame */}
                    <div
                        onClick={() => setShowModal(true)}
                        style={{
                            border: '2px solid #ffb6c1',
                            borderRadius: '16px',
                            padding: '16px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: '0.2s transform, 0.2s box-shadow',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                            marginBottom: '15px',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,105,180,0.25)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
                            {currentVersionPhotos.map((p) => (
                                <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        style={{
                                            width: '80px', height: '80px',
                                            objectFit: 'cover', borderRadius: '50%',
                                            border: '3px solid #ff69b4',
                                            boxShadow: '0 4px 12px rgba(255,105,180,0.3)',
                                        }}
                                    />
                                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#d81b60' }}>
                                        {p.emoji} {p.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ff1493' }}>💕 Family Voice Note</div>
                        <div style={{ fontSize: '10px', color: '#ff69b4', marginTop: '2px' }}>🎙️ Tap to play</div>
                    </div>

                    <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                        <button className="win-btn" onClick={onResume} style={{ padding: '8px 40px' }}>Resume &gt;</button>
                    </div>
                </div>
            </InstallerWindow>

            <div style={{ position: 'fixed', left: '4vw', top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {current.left && (
                    <div key={`L-${step}`} style={{ animation: 'slideFromLeft 0.5s ease-out' }}>
                        {current.left.msg && <BubbleLeft msg={current.left.msg} />}
                        <img src={current.left.img} style={avatarStyle} alt="Avatar" />
                    </div>
                )}
            </div>

            <div style={{ position: 'fixed', right: '4vw', top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
                {current.right && (
                    <div key={`R-${step}`} style={{ animation: 'slideFromRight 0.5s ease-out' }}>
                        {current.right.msg && <BubbleRight msg={current.right.msg} />}
                        <img src={current.right.img} style={avatarStyle} alt="Avatar" />
                    </div>
                )}
            </div>

            {showModal && <FamilyVoiceModal photos={currentVersionPhotos} onClose={() => setShowModal(false)} />}
        </>
    );
};

export default CurrentVersionPage;
