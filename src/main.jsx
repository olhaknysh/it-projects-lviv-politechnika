import React from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';
import App from './App.jsx';
import './assets/style.css';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://5c40d3b769863fb1cc138f36023fa291@o4511491756720128.ingest.de.sentry.io/4511491760848976",
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  integrations: [Sentry.browserTracingIntegration()],
});

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
