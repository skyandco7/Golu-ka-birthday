import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import InstallerWindow from './InstallerWindow';
import { installerText } from '../data';

const CompletionStep = ({ onFinish }) => {
    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <InstallerWindow title="Installation Complete">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h2 style={{ marginBottom: '10px', fontSize: '18px' }}>{installerText.completion.title}</h2>
                <p style={{ fontSize: '14px', marginBottom: '20px', fontWeight: 'bold' }}>
                    {installerText.completion.message}
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #808080',
                    padding: '15px',
                    marginBottom: '20px'
                }}>
                    {installerText.completion.stats.map((stat, i) => (
                        <React.Fragment key={i}>
                            <span style={{ fontSize: '13px' }}>{stat.label}:</span>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#000080' }}>{stat.value}</span>
                        </React.Fragment>
                    ))}
                </div>

                <p style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', marginTop: '10px' }}>
                    {installerText.completion.footer}
                </p>

                <div style={{ flexGrow: 1 }} />
                <div className="footer-btns">
                    <button className="win-btn" onClick={onFinish}>Finish</button>
                </div>
            </div>
        </InstallerWindow>
    );
};

export default CompletionStep;
