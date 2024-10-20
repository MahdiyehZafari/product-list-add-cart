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
        col.className = 'col-12 col-sm-5 col-md-4 col-lg-3 bg-red shadow-lg rounded-2 p-1  justify-content-center';
        col.innerHTML = `<div class="row position-relative">
        <div class="position-absolute add top-92 w-75 start-12 bg-white d-flex gap-2 justify-content-center border border-danger rounded-pill  mx-auto z-3 p-1">
                <img src="./assets/images/icon-add-to-cart.svg"  alt="">
                <span>Add To Cart</span>
        </div>
        <img class="rounded-me w-100" src="${item.image.thumbnail}" 
        srcset="${item.image.mobile} 400w, ${item.image.tablet} 768w, ${item.image.desktop} 1200w" 
        sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, 33vw" 
        alt="${item.name}" 
        class="img-fluid"></div>
        <div class="col-12 text-start text-white ps-3 mt-4 ">
            <div class="row text-333 fst-normal mt-1">${item.category}</div>
            <div class="row mt-1 fw-bold text-dark">${item.name}</div>
            <div class="row mt-1 fw-bold text-333">$ ${item.price}</div>
        </div>`;
        container.appendChild(col);
    });
}
fetchData();