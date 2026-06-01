import { useState } from 'react';

export default function App() {
  // 1. Стейт відображення та модалок
  const [currentView, setCurrentView] = useState('dashboard');
  const [isTripModalOpen, setTripModalOpen] = useState(false);
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  // 2. Стейт даних подорожей
  const [trips, setTrips] = useState([
    {
      id: 'trip-1',
      title: 'Євротур 2026: Краків-Відень-Загреб',
      startDate: '2026-05-23',
      endDate: '2026-05-28'
    }
  ]);

  // 3. Стейт даних подій
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      tripId: 'trip-1',
      type: 'activity',
      title: 'Оренда велосипедів (Загреб)',
      date: '2026-05-24',
      time: '13:00',
      notes: 'Заброньовано на 13:00, перевірити зручне взуття'
    }
  ]);

  // --- Логіка подорожей ---
  const handleAddTrip = (newTripData) => {
    const newTrip = {
      ...newTripData,
      id: `trip-${Date.now()}`
    };
    setTrips([...trips, newTrip]);
    setTripModalOpen(false);
  };

  const openTimelineForTrip = (tripId) => {
    setSelectedTripId(tripId);
    setCurrentView('timeline');
  };

  // --- Логіка подій ---
  const handleAddEvent = (newEventData) => {
    const newEvent = {
      ...newEventData,
      id: `event-${Date.now()}`,
      tripId: selectedTripId // Прив'язуємо подію до поточної відкритої подорожі
    };
    // Сортуємо події за часом (просте сортування)
    const updatedEvents = [...events, newEvent].sort((a, b) => 
      a.time.localeCompare(b.time)
    );
    setEvents(updatedEvents);
    setEventModalOpen(false);
  };

  const activeTrip = trips.find(t => t.id === selectedTripId);
  // Фільтруємо події тільки для поточної подорожі
  const activeTripEvents = events.filter(e => e.tripId === selectedTripId);

  return (
    <div id="app">
      {currentView === 'dashboard' ? (
        <Dashboard 
          trips={trips}
          openModal={() => setTripModalOpen(true)} 
          openTimeline={openTimelineForTrip} 
        />
      ) : (
        <Timeline 
          trip={activeTrip}
          events={activeTripEvents}
          goBack={() => setCurrentView('dashboard')} 
          openEventModal={() => setEventModalOpen(true)}
        />
      )}

      {/* Модалка створення подорожі */}
      {isTripModalOpen && (
        <TripModal 
          closeModal={() => setTripModalOpen(false)} 
          onSubmit={handleAddTrip}
        />
      )}

      {/* Модалка створення події */}
      {isEventModalOpen && (
        <EventModal 
          closeModal={() => setEventModalOpen(false)} 
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
}

function Dashboard({ trips, openModal, openTimeline }) {
  return (
    <div id="dashboard-screen">
      <header className="flex justify-between p-4">
        <h1>Мої подорожі</h1>
        <button className="btn-primary" onClick={openModal}>
          + Нова подорож
        </button>
      </header>
      <main id="trips-list" className="grid gap-4 p-4">
        {trips.length === 0 ? (
          <p>Немає запланованих подорожей.</p>
        ) : (
          trips.map((trip) => (
            <div 
              key={trip.id}
              className="trip-card cursor-pointer border p-4 rounded-lg" 
              onClick={() => openTimeline(trip.id)}
            >
              <h3>{trip.title}</h3>
              <p>Дати: {trip.startDate} - {trip.endDate}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

function Timeline({ trip, events, goBack, openEventModal }) {
  if (!trip) return null;

  // Мапа для перекладу типів подій (можна винести в константи)
  const typeLabels = {
    transport: 'Транспорт',
    accommodation: 'Житло',
    food: 'Їжа',
    activity: 'Активності'
  };

  return (
    <div id="timeline-screen">
      <header className="p-4">
        <button onClick={goBack} className="text-blue-500 mb-2 block">← Назад</button>
        <div className="flex justify-between items-center">
          <h2 id="current-trip-title" className="text-xl font-bold">{trip.title}</h2>
          <button className="btn-secondary" onClick={openEventModal}>+ Додати подію</button>
        </div>
      </header>
      <main id="timeline-container" className="timeline-line p-4">
        {events.length === 0 ? (
          <p>Подій ще немає. Додайте першу!</p>
        ) : (
          events.map(event => (
            <div key={event.id} className={`event-card event-type-${event.type} border-l-4 p-4 my-2`}>
              <div className="flex justify-between">
                <span className="time font-bold">{event.date} {event.time}</span>
                <span className="badge">{typeLabels[event.type]}</span>
              </div>
              <h4 className="event-title font-semibold mt-1">{event.title}</h4>
              {event.notes && <p className="notes text-gray-600 text-sm mt-1">{event.notes}</p>}
            </div>
          ))
        )}
      </main>
    </div>
  );
}

function TripModal({ closeModal, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(Object.fromEntries(formData.entries()));
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <form className="modal-content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>Створити маршрут</h2>
        <label>Назва подорожі</label>
        <input type="text" name="title" required />
        <label>Дата початку</label>
        <input type="date" name="startDate" required />
        <label>Дата завершення</label>
        <input type="date" name="endDate" required />
        <div className="actions mt-4 flex gap-2">
          <button type="button" className="btn-cancel" onClick={closeModal}>Скасувати</button>
          <button type="submit" className="btn-success">Зберегти</button>
        </div>
      </form>
    </div>
  );
}

function EventModal({ closeModal, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(Object.fromEntries(formData.entries()));
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <form className="modal-content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Нова подія</h3>
  
        <label>Що планується?</label>
        <input type="text" name="title" required />
  
        <label>Тип події</label>
        <select name="type">
          <option value="transport">Транспорт</option>
          <option value="accommodation">Житло</option>
          <option value="food">Їжа</option>
          <option value="activity">Активності</option>
        </select>
  
        <label>Дата</label>
        <input type="date" name="date" required />
  
        <label>Час початку</label>
        <input type="time" name="time" required />
  
        <label>Нотатки</label>
        <textarea name="notes" placeholder="Бронювання, адреси тощо..."></textarea>
  
        <div className="actions mt-4 flex gap-2">
          <button type="button" className="btn-cancel" onClick={closeModal}>Скасувати</button>
          <button type="submit" className="btn-success">Додати у таймлайн</button>
        </div>
      </form>
    </div>
  );
}