function saveData(event) {
    event.preventDefault();
    let judul = document.getElementById('judul').value;
    let penulis = document.getElementById('penulis').value;
    let tahun = document.getElementById('tahun').value;
    let complete = document.getElementById('complete').checked;
    console.log(complete);
    let timestamp = +new Date();
    let existingData = localStorage.getItem('data');
    if (existingData) {
        let parseData = JSON.parse(existingData);
        if (parseData.judul === judul) {
            alert('Nama sudah ada dilocal storage, silahkan pilih nama lain');
            return;
        }
    }

    let data = {
        id: timestamp,
        title: judul,
        author: penulis,
        year: tahun,
        isComplete: complete
    };

    let jsonData = JSON.stringify(data);
    localStorage.setItem('data', jsonData);
    alert('Data berhasil disimpan')
}

let submit = document.querySelector('input[type="submit"]');
submit.addEventListener('click', saveData);