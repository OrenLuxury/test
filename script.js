// --- PRODUCT DATABASE ---
const products = [
    {
        id: 1,
        name: "The Midnight Oversized",
        price: "₹799",
        image: "images/oversized_black.jpg",
        category: "Best Seller",
        description: "Crafted from heavy-weight cotton for the perfect drape. The Midnight Oversized Tee defines effortless luxury with its relaxed silhouette and premium finish."
    },
    {
        id: 2,
        name: "Abstract Mind Graphic Tee",
        price: "₹699",
        image: "images/anxiety_being.jpg",
        category: "New Arrival",
        description: "Wear your thoughts. This graphic piece features high-definition printing on our signature soft-touch fabric. A statement piece for the bold."
    },
    {
        id: 3,
        name: "Signature Back Print",
        price: "₹799",
        image: "images/oversized_back.jpg",
        category: "Limited Edition",
        description: "Business in the front, statement in the back. Our limited edition back-print series combines subtle branding with maximum impact."
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
            // Create WhatsApp Link
            // Change '919876543210' to YOUR phone number
            const message = `Hi ORÉN, I would like to buy: ${product.name} - ${product.price}`;
            const whatsappUrl = `https://wa.me/917970718439?text=${encodeURIComponent(message)}`;

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
                                <button class="size-btn">S</button>
                                <button class="size-btn">M</button>
                                <button class="size-btn">L</button>
                                <button class="size-btn">XL</button>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <a href="${whatsappUrl}" target="_blank" class="btn-buy">Buy Now (WhatsApp)</a>
                        </div>
                    </div>
                </div>
            `;
            
            // Add size selection logic
            const sizeBtns = document.querySelectorAll('.size-btn');
            sizeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    sizeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });

        } else {
            productDisplay.innerHTML = '<div style="text-align:center; padding: 5rem; color: white;"><h2>Product not found</h2><a href="index.html" style="color: var(--gold);">Return to Home</a></div>';
        }
    }
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
