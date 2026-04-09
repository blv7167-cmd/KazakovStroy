// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        if (nav.style.display === 'flex' && nav.style.flexDirection === 'column') {
            nav.style.display = '';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.backgroundColor = '#fff';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
    });
}

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        q.parentElement.classList.toggle('active');
    });
});

// Calculator
function calculatePrice() {
    const type = document.getElementById('houseType')?.value;
    const area = parseFloat(document.getElementById('houseArea')?.value);
    if (isNaN(area) || area <= 0) {
        const result = document.getElementById('calcResult');
        if (result) result.innerText = 'Введите корректную площадь';
        return;
    }
    const total = area * parseFloat(type);
    const resultDiv = document.getElementById('calcResult');
    if (resultDiv) resultDiv.innerHTML = `Примерная стоимость: ${total.toLocaleString()} ₽`;
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('successModal').classList.add('active');
        contactForm.reset();
    });
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    if (typeof calculatePrice === 'function') calculatePrice();
});