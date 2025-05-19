// cypress.config.cjs
module.exports = {
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // ここは今は使わないから空でOK
    },
  },
};
