import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  sortEvents,
  validateEvent,
  calculateTripDuration,
  saveTripToStorage,
} from './timelineService';

describe('Тестування бізнес-логіки Multi-City Timeline', () => {
  // Тестові дані (оновлені під травневий трип 2026 року)
  const mockEvents = [
    {
      id: 2,
      title: 'Чек-ін у готель (Відень)',
      date: '2026-05-23',
      time: '14:00',
      type: 'Житло',
    },
    {
      id: 1,
      title: 'Поїзд Краків - Відень',
      date: '2026-05-23',
      time: '08:30',
      type: 'Транспорт',
    },
    {
      id: 3,
      title: 'Оренда велосипедів (Загреб)',
      date: '2026-05-25',
      time: '13:00',
      type: 'Активності',
    },
  ];

  // Перед кожним тестом очищуємо моки
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // =================================================================
  // БЛОК 1: ТЕСТИ З ВИКОРИСТАННЯМ ASSERTIONS (ПЕРЕВІРОК)
  // =================================================================

  test('1. sortEvents має правильно сортувати події хронологічно', () => {
    const sorted = sortEvents(mockEvents);

    // Перевіряємо послідовність ID після сортування
    expect(sorted[0].id).toBe(1); // Спочатку ранковий поїзд 23-го числа
    expect(sorted[1].id).toBe(2); // Потім заселення о 14:00 того ж дня
    expect(sorted[2].id).toBe(3); // Оренда велика аж 25-го числа
  });

  test('2. validateEvent має повертати true для коректної картки події', () => {
    const validEvent = {
      title: 'Плітвіцькі озера',
      date: '2026-05-24',
      time: '09:00',
    };

    const result = validateEvent(validEvent);
    expect(result).toBe(true);
  });

  test('3. validateEvent має викидати помилку, якщо пропущено назву або дату', () => {
    const invalidEvent = { date: '2026-05-22', time: '13:00' }; // немає title

    // Перевірка на перехоплення Error (Exception Assertion)
    expect(() => validateEvent(invalidEvent)).toThrow(
      "Відсутні обов'язкові поля для події"
    );
  });

  test('4. validateEvent має викидати помилку, якщо час завершення менший за час початку', () => {
    const brokenTimeEvent = {
      title: 'Вечеря в ресторані',
      date: '2026-05-22',
      time: '20:00',
      endTime: '19:00', // закінчення раніше початку
    };

    expect(() => validateEvent(brokenTimeEvent)).toThrow(
      'Час завершення не може бути ранішим за час початку'
    );
  });

  test('5. calculateTripDuration має коректно рахувати загальну кількість днів туру', () => {
    // Трип з 23 травня по 25 травня включно = 3 дні
    const duration = calculateTripDuration(mockEvents);

    expect(duration).toBe(3);
    expect(duration).not.toBeNull();
    expect(duration).toBeGreaterThan(0);
  });

  // =================================================================
  // БЛОК 2: ПРАКТИКА З MOCK-ОБ'ЄКТАМИ (ІЗОЛЯЦІЯ LOGIC)
  // =================================================================

  test('6. saveTripToStorage має викликати метод localStorage.setItem із правильними параметрами', () => {
    // Створюємо Mock для методу setItem глобального об'єкта localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const tripId = 'trip_123';
    saveTripToStorage(tripId, mockEvents);

    // Перевіряємо, чи взагалі викликався localStorage
    expect(setItemSpy).toHaveBeenCalledTimes(1);

    // Перевіряємо, чи правильний ключ та застрінгований об'єкт туди передалися
    expect(setItemSpy).toHaveBeenCalledWith(
      `trip_${tripId}`,
      expect.stringContaining('Поїзд Краків - Відень')
    );
  });

  test('7. saveTripToStorage повертає вже відсортований масив перед збереженням', () => {
    // ПРАВИЛЬНО: глушимо функцію за допомогою mockImplementation
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

    const result = saveTripToStorage('456', mockEvents);

    // Перевіряємо бізнес-логіку: метод повернув дані, але вони вже пройшли сортування всередині
    expect(result[0].id).toBe(1); // Першим став Краківський поїзд
    expect(result[result.length - 1].type).toBe('Активності'); // Останнім став Загреб
  });
});
