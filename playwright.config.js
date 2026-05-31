import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173', // Порт нашого Vite сервера
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome', // Оскільки додаток Mobile-First, тестуємо на мобільному емуляторі
      use: { ...devices['Pixel 5'] },
    }
  ],
});