const { config, event } = require("codeceptjs");

module.exports = function () {
  event.dispatcher.on(event.test.before, (test) => {
    if (process.env.profile !== "local") {
      config.append({
        helpers: {
          WebDriver: {
            desiredCapabilities: {
              desiredCapabilities: {
                name:  test.title,
            },
            },
          },
        },
      });
    }
  });
};
