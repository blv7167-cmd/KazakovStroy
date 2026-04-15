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
            nav.style.zIndex = '999';
        }
    });
    
    // Закрывать меню при клике на ссылку
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    nav.style.display = '';
                }, 100);
            }
        });
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

// Валидация телефона
function validatePhone(phone) {
    const phoneClean = phone.replace(/[^\d+]/g, '');
    return phoneClean.length >= 10;
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Honeypot check
        const honeypot = contactForm.querySelector('input[name="honeypot"]');
        if (honeypot && honeypot.value !== '') {
            console.log('Bot detected, form ignored');
            return;
        }
        
        const phoneInput = contactForm.querySelector('input[type="tel"]');
        if (phoneInput && !validatePhone(phoneInput.value)) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }
        
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
    startPromoTimer(new Date(2026, 4, 31, 23, 59, 59));
});

// Promo Timer
function startPromoTimer(targetDate) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl) return;
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            const timerDiv = document.getElementById('promoTimer');
            if (timerDiv) timerDiv.innerHTML = '<div class="timer-expired">Акция завершена</div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Кнопка "Наверх"
const btnTop = document.createElement('button');
btnTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
btnTop.className = 'btn-top';
btnTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(btnTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnTop.style.display = 'flex';
    } else {
        btnTop.style.display = 'none';
    }
});