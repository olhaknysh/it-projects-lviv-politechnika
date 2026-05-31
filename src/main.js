import './assets/style.css';

console.log('Vite успішно запустив додаток! Develop change');

function renderEventCard(event) {
  const container = document.getElementById('timeline-container');
  
  const card = document.createElement('div');
  // Важливо: додаємо загальний клас 'event-card' та специфічний для стилей
  card.className = `event-card event-type-${event.type.toLowerCase()} border p-4 my-2`;
  
  card.innerHTML = `
    <div class="event-header">
      <span class="time">${event.time}</span>
    </div>
    <h4>${event.title}</h4>
    <p>${event.notes || ''}</p>
  `;
  
  container.appendChild(card);
}

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