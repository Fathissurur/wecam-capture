const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public')); // Folder 'public' untuk menyimpan file frontend
app.use(express.json({ limit: '10mb' })); // Untuk menghandle data JSON berukuran besar

// Route untuk upload gambar
app.post('/upload', (req, res) => {
    const imgData = req.body.image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(imgData, 'base64');

    // Menyimpan gambar di folder uploads dengan nama file timestamp
    const filePath = path.join(__dirname, 'uploads', `${Date.now()}.png`);
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Failed to save image.');
        } else {
            console.log('Image saved:', filePath);
            res.send('Image saved successfully!');
        }
    });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
