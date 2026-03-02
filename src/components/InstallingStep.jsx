import React, { useState, useEffect } from 'react';
import InstallerWindow from './InstallerWindow';
import ProgressBar from './ProgressBar';
import { patchNotes } from '../data';

const InstallingStep = ({ onCheckVersion, onComplete, initialProgress = 0 }) => {
    const getInitialNote = (prog) => {
        if (prog >= 60) return patchNotes[4];
        if (prog >= 30) return patchNotes[1];
        return patchNotes[0];
    };

    const filesList = [
        { action: "Extracting", name: "confidence.dll" },
        { action: "Extracting", name: "aaj_java_padhungi.exe" },
        { action: "Extracting", name: "aaj_cloud_computing_dekhungi.sys" },
        { action: "Extracting", name: "machine_learning_bhi_dekh_leti_hu.pkg" },
        { action: "Deleting", name: "overthinking.tmp" },
        { action: "Deleting", name: "meko_hostel_jana_hai.log" }
    ];

    const [progress, setProgress] = useState(initialProgress);
    const [currentNote, setCurrentNote] = useState(getInitialNote(initialProgress));
    const [displayedFiles, setDisplayedFiles] = useState([]);

    // Independent timer to append file actions every 5 seconds
    useEffect(() => {
        let index = 0;
        if (initialProgress < 100) {
            setDisplayedFiles([`${filesList[0].action}: ${filesList[0].name}...`]);

            const fileTimer = setInterval(() => {
                index++;
                if (index < filesList.length) {
                    const file = filesList[index];
                    setDisplayedFiles(prev => [...prev, `${file.action}: ${file.name}...`]);
                } else {
                    clearInterval(fileTimer);
                }
            }, 5000);

            return () => clearInterval(fileTimer);
        } else {
            setDisplayedFiles(filesList.map(f => `${f.action}: ${f.name}...`));
        }
    }, [initialProgress]);

    // Handle initial progress updates (resume)
    useEffect(() => {
        setProgress(initialProgress);
    }, [initialProgress]);

    // Handle side-effects of hitting threshold marks (30) without updating them during render
    useEffect(() => {
        if (progress === 30 && initialProgress < 30) {
            if (onCheckVersion) onCheckVersion();
        }
    }, [progress, initialProgress, onCheckVersion]);

    // Main interval logic
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                // If we exactly hit a critical spot, don't increment until resumed
                if (prev === 30 && initialProgress < 30) return 30;
                if (prev >= 100) return 100;

                let next = prev + (Math.random() * 0.4);

                if (next >= 30 && prev < 30 && initialProgress < 30) {
                    next = 30;
                } else if (next >= 100) {
                    next = 100;
                }

                return next;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [initialProgress]);

    // Independent effect to handle UI dynamic patch notes without returning it inside setState updater
    useEffect(() => {
        if (progress >= 98) {
            setCurrentNote(patchNotes[6]); // Error 404
        } else if (progress >= 95) {
            setCurrentNote(patchNotes[5]); // Self-doubt patch
        } else if (initialProgress < 60) {
            if (progress < 15) setCurrentNote(patchNotes[0]);
            else if (progress < 30) setCurrentNote(patchNotes[1]);
            else if (progress < 45) setCurrentNote(patchNotes[2]);
            else if (progress < 55) setCurrentNote(patchNotes[3]);
            else if (progress >= 55 && progress < 95) setCurrentNote(patchNotes[4]);
        }
    }, [progress, initialProgress]);

    return (
        <InstallerWindow title="Rutul Setup Wizard - Installing..." image="/dettol.jpg">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                    Please wait while Setup installs Rutul 2.0 on your computer.
                </p>

                <ProgressBar progress={progress} label={currentNote} />
                <div style={{
                    fontSize: '11px',
                    marginTop: '10px',
                    height: '110px',
                    overflowY: 'auto',
                    border: '1px solid #999',
                    backgroundColor: '#fff',
                    padding: '6px',
                    color: '#333',
                    fontFamily: 'monospace',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                }}>
                    {displayedFiles.map((file, i) => (
                        <div key={i}>{file}</div>
                    ))}
                    {progress >= 100 && <div style={{ marginTop: '6px', fontWeight: 'bold' }}>Installation complete.</div>}
                </div>

                <div style={{ flexGrow: 1 }} />
                <div className="footer-btns">
                    <button
                        className="win-btn"
                        onClick={onComplete}
                        disabled={progress < 100}>
                        Next &gt;
                    </button>
                    <button className="win-btn" disabled>Cancel</button>
                </div>
            </div>
        </InstallerWindow>
    );
};

export default InstallingStep;
