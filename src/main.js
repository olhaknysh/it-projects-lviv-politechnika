import './assets/style.css';

console.log('Vite успішно запустив додаток! Develop change');

const addEventBtn = document.getElementById('add-event-btn');
const createTripBtn = document.getElementById('create-trip-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const tripModal = document.getElementById('trip-modal');
const tripForm = document.getElementById('trip-form');

// Функція відкриття модалки
if (createTripBtn && tripModal) {
  createTripBtn.addEventListener('click', () => {
    tripModal.classList.remove('hidden');
  });
}

if (addEventBtn && tripModal) {
  addEventBtn.addEventListener('click', () => {
    tripModal.classList.remove('hidden');
  });
}

// Функція закриття модалки
if (closeModalBtn && tripModal) {
  closeModalBtn.addEventListener('click', () => {
    tripModal.classList.add('hidden');
    tripForm ? tripForm.reset() : null; // Очищуємо поля форми при закритті
  });
}

// Закриття модалки при кліку на сірий бекдроп навколо неї
if (tripModal) {
  tripModal.addEventListener('click', (e) => {
    if (e.target === tripModal) {
      tripModal.classList.add('hidden');
      tripForm ? tripForm.reset() : null;
    }
  });
}
