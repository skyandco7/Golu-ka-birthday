import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { birthdayCutouts } from '../data';

const BirthdayPage = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Trigger the appearance of the photo and confetti after a tiny delay
        const timer = setTimeout(() => {
            setReady(true);
            triggerConfetti();
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const triggerConfetti = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="birthday-page" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', height: '100vh', gap: '30px', textAlign: 'center'
        }}>

            {ready && (
                <>
                    <div className="fade-in-scale" style={{ animation: 'popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                        <img
                            src="/group_photo_full.jpeg" // Using the group photo in the park
                            alt="The Gang"
                            style={{
                                width: '450px',
                                maxWidth: '90vw',
                                height: 'auto',
                                borderRadius: '20px',
                                border: '6px solid white',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                objectFit: 'contain'
                            }}
                        />
                    </div>

                    <div className="birthday-wishes fade-in-scale" style={{ animation: 'slideUp 1s ease-out' }}>
                        <h1 style={{ fontSize: '3rem', margin: '0 0 10px', color: '#ff1493', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                            🎉 HAPPY BIRTHDAY RUTUL 🎉
                        </h1>
                        <p className="subtitle" style={{ fontSize: '1.2rem', color: '#d81b60', margin: '0 0 10px', fontWeight: 'bold' }}>
                            System Upgrade V2.0 Complete.
                        </p>
                        <p className="message" style={{ fontSize: '1.1rem', color: '#333', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
                            Here's to more chaos, more memories, and less hostel! We love you! 💕
                        </p>
                    </div>

                    <style>{`
                        @keyframes popIn {
                            0% { opacity: 0; transform: scale(0.8); }
                            100% { opacity: 1; transform: scale(1); }
                        }
                        @keyframes slideUp {
                            0% { opacity: 0; transform: translateY(30px); }
                            100% { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                </>
            )}
        </div>
    );
};

export default BirthdayPage;
