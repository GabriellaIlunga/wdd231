const menuButton = document.getElementById('menu-button');
const navMenu = document.querySelector('.nav-menu');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        if (navMenu.classList.contains('open')) {
            menuButton.textContent = '❌';
        } else {
            menuButton.textContent = 'Menu';
        }
    });
}