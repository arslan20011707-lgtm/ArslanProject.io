    // Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.horizontal-nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });

    // Активная ссылка в навигации (для обоих меню)
    try {
        // Получаем текущий URL и путь
        const currentLocation = window.location.href;
        const currentPath = window.location.pathname;
        let currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Нормализуем имя страницы
        if (!currentPage || currentPage === '' || currentPage === '/' || currentPath.endsWith('/')) {
            currentPage = 'index.html';
        }
        
        // Получаем все ссылки навигации
        const allNavLinks = document.querySelectorAll('.horizontal-nav a, .vertical-nav a');
        
        allNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            if (!linkHref) return;
            
            // Убираем класс active
            link.classList.remove('active');
            
            // Метод 1: Точное совпадение имени файла
            if (linkHref === currentPage) {
                link.classList.add('active');
                return;
            }
            
            // Метод 2: URL заканчивается на href ссылки
            if (currentLocation.endsWith('/' + linkHref) || currentLocation.endsWith(linkHref)) {
                link.classList.add('active');
                return;
            }
            
            // Метод 3: Путь содержит href (для вложенных страниц)
            if (currentPath.endsWith('/' + linkHref) || currentPath.endsWith(linkHref)) {
                link.classList.add('active');
                return;
            }
            
            // Метод 4: Специальная проверка для главной страницы
            if ((currentPage === 'index.html' || currentPage === '' || currentPath === '/') && 
                (linkHref === 'index.html' || linkHref === '/' || linkHref === '')) {
                link.classList.add('active');
                return;
            }
        });
    } catch (error) {
        console.error('Error setting active navigation link:', error);
    }

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Модальное окно для просмотра PDF
function openPdfModal(pdfPath) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.innerHTML = `
        <div class="pdf-modal-overlay"></div>
        <div class="pdf-modal-content">
            <button class="pdf-modal-close" onclick="closePdfModal()">&times;</button>
            <iframe src="${pdfPath}" frameborder="0"></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    
    // Закрытие по клику на overlay
    modal.querySelector('.pdf-modal-overlay').addEventListener('click', closePdfModal);
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', handleEscapeKey);
}

function closePdfModal() {
    const modal = document.querySelector('.pdf-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closePdfModal();
    }
}

// Инициализация PDF ссылок
document.addEventListener('DOMContentLoaded', function() {
    // Автоматически добавляем обработчики для всех ссылок с классом 'pdf-link'
    document.querySelectorAll('.pdf-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfPath = this.getAttribute('href') || this.getAttribute('data-pdf');
            openPdfModal(pdfPath);
        });
    });
});

// Модальное окно для просмотра изображений документов
function openImageModal(imagePath) {
    const modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.innerHTML = `
        <div class="pdf-modal-overlay"></div>
        <div class="pdf-modal-content">
            <button class="pdf-modal-close" onclick="closeImageModal()">&times;</button>
            <img src="${imagePath}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.querySelector('.pdf-modal-overlay').addEventListener('click', closeImageModal);
    document.addEventListener('keydown', handleImageEscapeKey);
}

function closeImageModal() {
    const modal = document.querySelector('.pdf-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleImageEscapeKey);
    }
}

function handleImageEscapeKey(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
}

// Инициализация ссылок на документы
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.document-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imagePath = this.getAttribute('href');
            openImageModal(imagePath);
        });
    });
});
