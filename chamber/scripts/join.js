document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.querySelector('#timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const infoButtons = document.querySelectorAll('.info-btn');
    const closeButtons = document.querySelectorAll('.close-modal');

    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.querySelector(`#${modalId}`);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });
});