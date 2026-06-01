<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Multi-City Timeline React + Vite application. PostHog was initialized in `src/main.jsx` with the `PostHogProvider` wrapping the root `App` component. Three key user actions are now captured via `usePostHog()` in `src/App.jsx`: trip creation, timeline navigation, and event scheduling. Environment variables were written to `.env` and the `posthog-js` and `@posthog/react` packages were installed.

| Event | Description | File |
|---|---|---|
| `trip_created` | Fired when the user submits the create trip form and a new trip is added to the dashboard. Properties: `trip_title`, `trip_start_date`, `trip_end_date`. | `src/App.jsx` |
| `trip_timeline_opened` | Fired when the user clicks on a trip card to open its timeline view. Properties: `trip_id`. | `src/App.jsx` |
| `trip_event_added` | Fired when the user submits the add event form and a new event is added to the timeline. Properties: `event_type`, `trip_id`, `event_date`. | `src/App.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://us.posthog.com/project/449823/dashboard/1655203)
- [Trips Created Over Time](https://us.posthog.com/project/449823/insights/5tVCUWPj) — daily trend of new trips created
- [Timelines Opened Over Time](https://us.posthog.com/project/449823/insights/nBYSshSb) — daily trend of timeline views
- [Events Added by Type](https://us.posthog.com/project/449823/insights/wbRDVKXH) — trip events broken down by type (transport, accommodation, food, activity)
- [Trip Engagement Funnel](https://us.posthog.com/project/449823/insights/W3PzH4S4) — conversion from opening a timeline to adding an event
- [Daily Active Users](https://us.posthog.com/project/449823/insights/kkJlXqrV) — unique users per day across all key actions

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
