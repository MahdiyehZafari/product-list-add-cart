async function fetchData() {
    try {
        const response = await fetch('data.json'); // آدرس فایل JSON خود را وارد کنید
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // پاک کردن محتوای قبلی

    data.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-3'; // تنظیم عرض ستون
        col.innerHTML = `<div class="item">ID:${item.id}<img src="${item.image.thumbnail}" 
        srcset="${item.image.mobile} 576w, ${item.image.tablet} 768w, ${item.image.desktop} 1200w" 
        sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, 33vw" 
        alt="${item.name}" 
        class="img-fluid"> Name: ${item.name}</div>`;
        container.appendChild(col);
    });
}
fetchData();