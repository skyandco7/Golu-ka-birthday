import React from 'react';

const CurrentVersionModal = ({ onViewVersion }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
        }}>
            <div className="window-frame" style={{ width: '400px', minHeight: '200px' }}>
                <div className="title-bar">
                    <div className="title-bar-text"><span>📸</span> Current Version Details Found!</div>
                </div>
                <div className="window-content" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ marginBottom: '20px', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>
                        Installation Paused.
                        <br /><br />
                        We've detected your current version data. Would you like to view the details before we finish unpacking the Cake Modules?
                    </p>

                    <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                        <button className="win-btn" onClick={onViewVersion} style={{ padding: '8px 20px', fontWeight: 'bold', color: '#000080' }}>
                            View Current Version
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentVersionModal;
