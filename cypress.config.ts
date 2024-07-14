import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    // baseUrl: 'https://kooperlingohr.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
