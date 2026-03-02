import React from 'react';

const ProgressBar = ({ progress, label }) => {
    return (
        <div style={{ marginTop: '20px', width: '100%' }}>
            <p style={{ fontSize: '13px', marginBottom: '5px' }}>{label}</p>
            <div style={{
                height: '20px',
                backgroundColor: '#fff',
                border: '1px solid #808080',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#000080',
                    transition: 'width 0.3s ease-out'
                }} />
            </div>
            <p style={{ fontSize: '12px', textAlign: 'right', marginTop: '2px' }}>{Math.floor(progress)}%</p>
        </div>
    );
};

export default ProgressBar;
