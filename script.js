// --- CONFIGURATION ---
const PHONE_NUMBER = "917970718439"; 

// --- LOADER LOGIC ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// --- FETCH PRODUCT DATA ---
async function getProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error loading products:", error);
        return [];
    }
}

// --- RENDER HOME PAGE GRID ---
async function renderProducts() {
    const productGrid = document.getElementById('featuredGrid');
    if (productGrid) {
        const products = await getProducts();
        
        if (products.length === 0) {
            productGrid.innerHTML = '<p style="color:white; text-align:center;">Loading collection...</p>';
            return;
        }

        productGrid.innerHTML = products.map(product => `
            <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                <div class="featured-item">
                    <div class="item-placeholder">
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div class="item-info">
                        <div class="item-category">${product.category}</div>
                        <div class="item-name">${product.name}</div>
                        <div class="item-price" style="color: var(--gold); margin-top: 5px; letter-spacing: 1px; font-weight: 500;">${product.price}</div>
                    </div>
                </div>
            </a>
        `).join('');
    }
}

// --- RENDER SINGLE PRODUCT PAGE ---
async function renderSingleProduct() {
    const productDisplay = document.getElementById('product-display');
    if (productDisplay) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const products = await getProducts();
        const product = products.find(p => p.id == productId);

        if (product) {
            const reviewsHTML = product.reviews ? product.reviews.map(review => `
                <div class="review-card">
                    <div class="review-stars">${review.rating}</div>
                    <p class="review-text">"${review.text}"</p>
                    <div class="review-author">${review.user}<span class="review-verified">Verified Buyer</span></div>
                </div>
            `).join('') : '<p style="color:gray;">No reviews yet.</p>';

            productDisplay.innerHTML = `
                <div class="product-container">
                    <div class="product-image-section">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-details">
                        <div class="product-category">${product.category}</div>
                        <h1 class="product-title">${product.name}</h1>
                        <div class="product-price">${product.price}</div>
                        <p class="product-description">${product.description}</p>
                        
                        <div class="size-selector">
                            <div class="size-header">
                                <span class="size-label">Select Size</span>
                                <button class="size-guide-btn" onclick="openSizeGuide()">Size Guide</button>
                            </div>
                            <div class="size-options">
                                <button class="size-btn" onclick="selectSize(this)">S</button>
                                <button class="size-btn" onclick="selectSize(this)">M</button>
                                <button class="size-btn" onclick="selectSize(this)">L</button>
                                <button class="size-btn" onclick="selectSize(this)">XL</button>
                            </div>
                        </div>

                        <div class="quantity-selector">
                            <span class="size-label">Quantity</span>
                            <div class="quantity-wrapper">
                                <button class="qty-btn" onclick="updateQty(-1)">-</button>
                                <span id="qty-display" class="qty-display">1</span>
                                <button class="qty-btn" onclick="updateQty(1)">+</button>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <button id="buyBtn" class="btn-buy" onclick="buyNow(${product.id}, '${product.name.replace(/'/g, "\\'")}', '${product.price}')">Buy Now (WhatsApp)</button>
                        </div>
                    </div>
                </div>

                <div class="reviews-section">
                    <h3 class="reviews-title">Client Stories</h3>
                    <div class="reviews-grid">
                        ${reviewsHTML}
                    </div>
                </div>
                
                <div id="sizeModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal" onclick="closeSizeGuide()">&times;</span>
                        <h3 class="modal-title">Size Guide (Inches)</h3>
                        <table class="size-table">
                            <thead>
                                <tr><th>Size</th><th>Chest</th><th>Length</th><th>Shoulder</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>S</td><td>42</td><td>28</td><td>20</td></tr>
                                <tr><td>M</td><td>44</td><td>29</td><td>21</td></tr>
                                <tr><td>L</td><td>46</td><td>30</td><td>22</td></tr>
                                <tr><td>XL</td><td>48</td><td>31</td><td>23</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else {
            productDisplay.innerHTML = '<div style="text-align:center; padding: 5rem; color: white;"><h2>Product not found</h2><a href="index.html" style="color: var(--gold);">Return to Home</a></div>';
        }
    }
}

// --- INTERACTIVE FUNCTIONS ---
let currentQty = 1;
let currentSize = null; // No size selected by default

function updateQty(change) {
    const qtyDisplay = document.getElementById('qty-display');
    if (qtyDisplay) {
        let newQty = currentQty + change;
        if (newQty < 1) newQty = 1;
        if (newQty > 10) newQty = 10;
        currentQty = newQty;
        qtyDisplay.innerText = currentQty;
    }
}

function selectSize(btn) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSize = btn.innerText;
}

function buyNow(id, name, price) {
    // VALIDATION CHECK
    if (!currentSize) {
        alert("Please select a size before adding to cart.");
        return; 
    }

    const productLink = window.location.href;
    const message = `Hi ORÉN, I would like to buy:
-----------------------
Product: ${name}
Price: ${price}
Size: ${currentSize}
Quantity: ${currentQty}
-----------------------
Link: ${productLink}`;

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Size Guide Logic
function openSizeGuide() {
    const modal = document.getElementById('sizeModal');
    if(modal) modal.style.display = "flex";
}

function closeSizeGuide() {
    const modal = document.getElementById('sizeModal');
    if(modal) modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('sizeModal');
    if (event.target == modal) modal.style.display = "none";
}

// --- GLOBAL UTILS ---
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Initialize
renderProducts();
renderSingleProduct();
