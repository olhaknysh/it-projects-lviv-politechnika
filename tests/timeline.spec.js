import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Критичний шлях: Планування міжміської подорожі', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // =================================================================
  // СЦЕНАРІЙ 1: СТВОРЕННЯ МАРШРУТУ ПОДОРОЖІ
  // =================================================================
  test('1. Успішне створення нової подорожі через модальну форму', async ({ page }) => {
    await expect(page).toHaveTitle(/Multi-City Timeline/);
    
    const createTripBtn = page.locator('#create-trip-btn');
    await expect(createTripBtn).toBeVisible();
    await createTripBtn.click();

    await page.fill('#trip-title', 'Євротур 2026: Краків-Відень-Загреб');
    await page.fill('#trip-start-date', '2026-05-23');
    await page.fill('#trip-end-date', '2026-05-28');
    
    await page.click('#save-trip-submit');

    const tripCard = page.locator('.trip-card').first();
    await expect(tripCard).toBeVisible();
    await expect(tripCard).toContainText('Євротур 2026: Краків-Відень-Загреб');
  });
});