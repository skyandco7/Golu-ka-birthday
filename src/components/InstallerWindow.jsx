import React from 'react';

const InstallerWindow = ({ children, title = "Rutul.exe Setup", image = "https://img.icons8.com/color/96/000000/party-baloons.png" }) => {
    return (
        <div className="window-frame">
            <div className="title-bar">
                <div className="title-bar-text">
                    <span>🎁</span> {title}
                </div>
                <div className="title-bar-controls">
                    <button className="win-btn-small">_</button>
                    <button className="win-btn-small">□</button>
                    <button className="win-btn-small" style={{ marginLeft: '2px' }}>×</button>
                </div>
            </div>
            <div className="main-layout">
                <div className="installer-sidebar">
                    <img
                        src={image}
                        alt="Sidebar Icon"
                        style={image === '/dettol.jpg' ? { marginTop: '20px', maxWidth: '80%', borderRadius: '8px' } : { marginTop: '20px' }}
                    />
                </div>
                <div className="window-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InstallerWindow;
