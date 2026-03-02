const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = require(path.join(process.cwd(), 'node_modules', 'ffmpeg-static'));

// The ORIGINAL 8529-byte file is still in dist/kiwi.ogg!
const input = path.join(process.cwd(), 'dist', 'kiwi.ogg');
console.log('Using ORIGINAL input:', input, 'size:', fs.statSync(input).size, 'bytes');

// Probe
try {
    execSync(`"${ffmpegPath}" -i "${input}" 2>&1`, { encoding: 'utf8', timeout: 10000 });
} catch (e) {
    console.log('Probe:', ((e.stdout || '') + (e.stderr || '')).split('\n').filter(l => l.includes('Stream') || l.includes('Duration') || l.includes('Audio') || l.includes('Input')).join('\n'));
}

// Convert to WAV
const wavOutput = path.join(process.cwd(), 'public', 'kiwi.wav');
try {
    const result = execSync(`"${ffmpegPath}" -y -i "${input}" -f wav -acodec pcm_s16le -ar 44100 -ac 1 "${wavOutput}" 2>&1`, { encoding: 'utf8', timeout: 15000 });
    console.log('WAV created:', fs.statSync(wavOutput).size, 'bytes');
} catch (e) {
    console.log('WAV error output:', (e.stdout || '') + (e.stderr || ''));
    if (fs.existsSync(wavOutput)) console.log('WAV exists despite error:', fs.statSync(wavOutput).size, 'bytes');
}

// Convert WAV to OGG Vorbis
if (fs.existsSync(wavOutput) && fs.statSync(wavOutput).size > 100) {
    const oggOutput = path.join(process.cwd(), 'public', 'kiwi_new.ogg');
    try {
        execSync(`"${ffmpegPath}" -y -i "${wavOutput}" -c:a libvorbis -q:a 4 "${oggOutput}" 2>&1`, { encoding: 'utf8', timeout: 15000 });
        console.log('New OGG created:', fs.statSync(oggOutput).size, 'bytes');
    } catch (e) {
        console.log('OGG from WAV error:', (e.stdout || '') + (e.stderr || ''));
    }
} else {
    console.log('WAV file not created, trying direct OGG Vorbis from original...');
    const oggDirect = path.join(process.cwd(), 'public', 'kiwi_new.ogg');
    try {
        execSync(`"${ffmpegPath}" -y -i "${input}" -c:a libvorbis -q:a 4 "${oggDirect}" 2>&1`, { encoding: 'utf8', timeout: 15000 });
        console.log('Direct OGG Vorbis:', fs.statSync(oggDirect).size, 'bytes');
    } catch (e) {
        console.log('Direct OGG error:', (e.stdout || '') + (e.stderr || ''));
    }

    // Also try MP3 directly
    const mp3Output = path.join(process.cwd(), 'public', 'kiwi.mp3');
    try {
        execSync(`"${ffmpegPath}" -y -i "${input}" -c:a libmp3lame -b:a 128k "${mp3Output}" 2>&1`, { encoding: 'utf8', timeout: 15000 });
        console.log('MP3 created:', fs.statSync(mp3Output).size, 'bytes');
    } catch (e) {
        console.log('MP3 error:', (e.stdout || '') + (e.stderr || ''));
    }
}

// List results
console.log('\nFinal kiwi files:');
['public/kiwi.ogg', 'public/kiwi_new.ogg', 'public/kiwi.wav', 'public/kiwi.mp3'].forEach(f => {
    const fp = path.join(process.cwd(), f);
    if (fs.existsSync(fp)) console.log(`  ${f}: ${fs.statSync(fp).size} bytes`);
    else console.log(`  ${f}: NOT FOUND`);
});
