export function sortEvents(events) {
  if (!Array.isArray(events)) return [];
  return [...events].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeA - dateTimeB;
  });
}

export function validateEvent(event) {
  if (!event || !event.title || !event.date || !event.time) {
    throw new Error("Відсутні обов'язкові поля для події");
  }
  
  if (event.endTime && event.endTime < event.time) {
    throw new Error("Час завершення не може бути ранішим за час початку");
  }
  
  return true;
}

export function calculateTripDuration(events) {
  if (!events || events.length === 0) return 0;
  
  const sorted = sortEvents(events);
  const start = new Date(sorted[0].date);
  const end = new Date(sorted[sorted.length - 1].date);
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; 
}

export function saveTripToStorage(tripId, events) {
  const sorted = sortEvents(events);
  localStorage.setItem(`trip_${tripId}`, JSON.stringify(sorted));
  return sorted;
}