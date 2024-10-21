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
    // container.innerHTML = ''; // پاک کردن محتوای قبلی

    data.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-3 bg-pink rounded-2 p-1'; // تنظیم عرض ستون
        col.innerHTML = `<div class="row"><img class="rounded-me" src="${item.image.thumbnail}" 
        srcset="${item.image.mobile} 576w, ${item.image.tablet} 768w, ${item.image.desktop} 1200w" 
        sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, 33vw" 
        alt="${item.name}" 
        class="img-fluid"></div>
        <div class="col-12 text-start text-white ps-3 mt-2 ">
            <div class="row text-333 fst-normal mt-1">${item.category}</div>
            <div class="row mt-1 fw-bold text-dark">${item.name}</div>
            <div class="row mt-1 fw-bold text-333">$ ${item.price}</div>
        </div>`;
        container.appendChild(col);
    });
}
fetchData();