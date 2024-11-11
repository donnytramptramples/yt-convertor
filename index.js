// index.js
const express = require('express');
const yt_dlp = require('yt-dlp-exec');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API endpoint to handle YouTube conversion
app.post('/convert', async (req, res) => {
    const { url, formatType } = req.body;

    // Define download options
    let ydlOptions;
    if (formatType === 'mp3' || formatType === 'flac') {
        ydlOptions = {
            format: 'bestaudio/best',
            postprocessors: [{
                key: 'FFmpegExtractAudio',
                preferredcodec: formatType,
                preferredquality: '192',
            }],
            outtmpl: `downloads/%(title)s.%(ext)s`
        };
    } else if (formatType === 'mp4') {
        ydlOptions = {
            format: 'best[ext=mp4]',
            outtmpl: `downloads/%(title)s.%(ext)s`
        };
    } else {
        return res.status(400).send('Invalid format type');
    }

    try {
        // Download and convert the video
        const output = await yt_dlp(url, ydlOptions);
        res.json({ message: `Video converted to ${formatType}`, output });
    } catch (error) {
        res.status(500).json({ error: 'Error processing video conversion' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
