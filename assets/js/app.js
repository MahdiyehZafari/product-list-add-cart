let quantity = 1;
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
               <button id="add-to-cart"   class="position-absolute add top-92 w-75 start-12 bg-white d-flex gap-2 justify-content-center border border-danger rounded-pill  mx-auto z-3 p-1">
                <img src="./assets/images/icon-add-to-cart.svg"  alt="">
                <span>Add To Cart</span>
        </button>
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
    document.querySelectorAll('#add-to-cart').forEach((button, index) => {
        button.addEventListener('click', function() {
            updateLocalStorage(data[index]); // ارسال محصول مربوطه
        });
    });

    function updateLocalStorage(item) {
        // خواندن سبد خرید از localStorage
        let cart = JSON.parse(localStorage.getItem('cart'));
    
        // بررسی اینکه آیا cart یک آرایه است یا خیر
        if (!Array.isArray(cart)) {
            cart = []; // اگر نیست، به یک آرایه خالی تبدیل می‌شود
        }
    
        // پیدا کردن ایندکس محصول در سبد خرید
        const existingProductIndex = cart.findIndex(product => product.productName === item.name);
    
        if (existingProductIndex > -1) {
            // اگر محصول در سبد خرید موجود است، تعداد آن را افزایش دهید
            cart[existingProductIndex].quantity += 1;
        } else {
            // اگر محصول جدید است، آن را به سبد خرید اضافه کنید
            cart.push({
                productName: item.name,
                price: item.price,
                quantity: 1
            });
        }
    
        // ذخیره سبد خرید به localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
}

fetchData();


// ////////

