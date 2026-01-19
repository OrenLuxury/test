// --- PRODUCT DATABASE ---
const products = [
    {
        id: 1,
        name: "The Midnight Oversized",
        price: "₹799",
        image: "images/oversized_black.jpg",
        category: "Best Seller",
        description: "Crafted from heavy-weight cotton for the perfect drape. The Midnight Oversized Tee defines effortless luxury with its relaxed silhouette and premium finish.",
        reviews: [
            { user: "Arjun K.", text: "The quality is insane. Heavyweight but breathable. Fits perfectly.", rating: "★★★★★" },
            { user: "Rahul S.", text: "Best oversized tee I've bought in India. Worth the price.", rating: "★★★★★" },
            { user: "Dev P.", text: "Packaging was premium. Feels like a global brand.", rating: "★★★★☆" }
        ]
    },
    {
        id: 2,
        name: "Abstract Mind Graphic Tee",
        price: "₹699",
        image: "images/anxiety_being.jpg",
        category: "New Arrival",
        description: "Wear your thoughts. This graphic piece features high-definition printing on our signature soft-touch fabric. A statement piece for the bold.",
        reviews: [
            { user: "Ishaan M.", text: "The print quality is top-notch. Hasn't faded after 3 washes.", rating: "★★★★★" },
            { user: "Kabir R.", text: "Love the design. Very unique.", rating: "★★★★★" },
            { user: "Aryan T.", text: "Fabric is soft. Good fit.", rating: "★★★★☆" }
        ]
    },
    {
        id: 3,
        name: "Signature Back Print",
        price: "₹799",
        image: "images/oversized_back.jpg",
        category: "Limited Edition",
        description: "Business in the front, statement in the back. Our limited edition back-print series combines subtle branding with maximum impact.",
        reviews: [
            { user: "Vikram S.", text: "The back print turns heads. Love the minimalist front.", rating: "★★★★★" },
            { user: "Rohan D.", text: "Perfect for layering. 10/10.", rating: "★★★★★" },
            { user: "Sameer K.", text: "Great fit for gym and outings.", rating: "★★★★★" }
        ]
    }
];

// --- RENDER HOME PAGE GRID ---
const productGrid = document.getElementById('featuredGrid');

function renderProducts() {
    if (productGrid) {
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
const productDisplay = document.getElementById('product-display');

function renderSingleProduct() {
    if (productDisplay) {
        // Get the ID from the URL (e.g., product.html?id=1)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        // Find the product in our database
        const product = products.find(p => p.id == productId);

        if (product) {
            // Render Reviews HTML
            const reviewsHTML = product.reviews.map(review => `
                <div class="review-card">
                    <div class="review-stars">${review.rating}</div>
                    <p class="review-text">"${review.text}"</p>
                    <div class="review-author">${review.user}<span class="review-verified">Verified Buyer</span></div>
                </div>
            `).join('');

            // Inject Product + Reviews content
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
                            <span class="size-label">Select Size</span>
                            <div class="size-options">
                                <button class="size-btn" onclick="selectSize(this)">S</button>
                                <button class="size-btn" onclick="selectSize(this)">M</button>
                                <button class="size-btn active" onclick="selectSize(this)">L</button>
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
                            <button id="buyBtn" class="btn-buy" onclick="buyNow(${product.id})">Buy Now (WhatsApp)</button>
                        </div>
                    </div>
                </div>

                <div class="reviews-section">
                    <h3 class="reviews-title">Client Stories</h3>
                    <div class="reviews-grid">
                        ${reviewsHTML}
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
let currentSize = 'L'; // Default size

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
    // Remove active class from all buttons
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    // Add to clicked button
    btn.classList.add('active');
    currentSize = btn.innerText;
}

function buyNow(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const phoneNumber = "917970718439";
    // Get current page URL
    const productLink = window.location.href;
    
    // Construct message
    const message = `Hi ORÉN, I would like to buy:
-----------------------
Product: ${product.name}
Price: ${product.price}
Size: ${currentSize}
Quantity: ${currentQty}
-----------------------
Link: ${productLink}`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Run functions based on page
renderProducts();
renderSingleProduct();


// --- GLOBAL NAVIGATION LOGIC ---
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Newsletter form handler
function handleSubscribe(e) {
    e.preventDefault();
    alert('Thank you for subscribing! You\'ll be the first to know about our launches.');
    e.target.reset();
}

// Mobile toggle animation
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}
