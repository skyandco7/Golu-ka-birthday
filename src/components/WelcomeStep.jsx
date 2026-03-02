import React from 'react';
import InstallerWindow from './InstallerWindow';
import { installerText } from '../data';

const WelcomeStep = ({ onNext }) => {
    return (
        <InstallerWindow title="Rutul Setup Wizard">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>{installerText.welcome.title}</h2>
                <p style={{ fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                    {installerText.welcome.description}
                </p>
                <div style={{ flexGrow: 1 }} />
                <div className="footer-btns">
                    <button className="win-btn" onClick={onNext}>Next &gt;</button>
                    <button className="win-btn" disabled>Cancel</button>
                </div>
            </div>
        </InstallerWindow>
    );
};

export default WelcomeStep;
