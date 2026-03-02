import React from 'react';
import InstallerWindow from './InstallerWindow';
import { installerText } from '../data';

const InstallLocationStep = ({ onBack, onInstall }) => {
    return (
        <InstallerWindow title="Rutul Setup Wizard - Installation Folder">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>Setup will install Rutul 2.0 in the following folder.</p>
                <div style={{
                    border: '1px solid #808080',
                    padding: '5px',
                    backgroundColor: '#fff',
                    fontSize: '13px',
                    marginBottom: '20px'
                }}>
                    {installerText.location.directory}
                </div>

                <div style={{ fontSize: '13px', border: '1px solid #808080', padding: '10px', backgroundColor: '#f9f9f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span>Space Required:</span>
                        <span>{installerText.location.spaceRequired}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Space Available:</span>
                        <span>{installerText.location.spaceAvailable}</span>
                    </div>
                </div>

                <div style={{ flexGrow: 1 }} />
                <div className="footer-btns">
                    <button className="win-btn" onClick={onBack}>&lt; Back</button>
                    <button className="win-btn" onClick={onInstall}>Install</button>
                    <button className="win-btn" disabled>Cancel</button>
                </div>
            </div>
        </InstallerWindow>
    );
};

export default InstallLocationStep;
