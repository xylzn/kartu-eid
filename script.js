// Fungsi untuk mengirim data ke Google Sheets/Web App
function sendToWebApp(name, uniqueID) {
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzcsUJ_i7JTR67pL36D5Vf3iUYm5NNK9paNAGH3AhcxNBA3hbCTb1uY8LL_rVAjp4lj/exec';
    
    // Tambah logging di frontend
    console.log('Sending data:', { name, uniqueID });
    
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            id: uniqueID
        })
    })
    .then(response => {
        console.log('Response:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Modifikasi script submit
document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('username');
    const name = nameInput.value.trim();

    if (name === '') {
        alert('Nama harus diisi!');
        nameInput.focus();
        return;
    }

    // Generate Unique ID
    const uniqueID = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Simpan di localStorage
    localStorage.setItem(uniqueID, JSON.stringify({
        name: name,
        timestamp: new Date().toISOString()
    }));

    // Kirim data ke Web App
    sendToWebApp(name, uniqueID);

    // Redirect ke Kartu
    window.location.href = `/html/card.html?id=${uniqueID}&name=${encodeURIComponent(name)}`;
});

// loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('opacity-0');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});


 // Fungsi untuk memulai musik
 const backgroundMusic = document.getElementById('backgroundMusic');


 document.body.addEventListener('click', () => {
     backgroundMusic.play().catch(error => {
         console.log('Autoplay was prevented:', error);
     });
 });