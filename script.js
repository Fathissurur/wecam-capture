// Mengakses elemen video dan canvas
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const snap = document.getElementById('snap');

// Meminta izin kamera dan menampilkan di video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error('Error accessing webcam:', err);
    });

// Mengambil foto saat tombol diklik
snap.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Mengambil data URL dari canvas (foto)
    const dataURL = canvas.toDataURL('image/png');

    // Mengirim data URL ke server untuk disimpan
    fetch('/upload', {
        method: 'POST',
        body: JSON.stringify({ image: dataURL }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Photo captured and uploaded successfully!');
        } else {
            alert('Failed to upload photo.');
        }
    });
});
