require('dotenv').config({ path: '.env' });
const _user = (process.env.profile === "remote") ? process.env.BROWSERSTACK_USERNAME : undefined

const _key = (process.env.profile === "remote") ? process.env.BROWSERSTACK_ACCESS_KEY : undefined
const build = process.env.BROWSERSTACK_BUILD_NAME;

exports.config = {
  helpers: {
    WebDriver: {
      url: "{{http://www.facebook.com}}",
      //MicrosoftEdge//firefox//chrome
      browser: "chrome",
      restart: true,
      //keepCookies:true, // save session information in cookies. May or may not delete later!!!!
      //keepBrowserState: false, //change browser state.   May or may not delete later!!!!
      user:_user,
      key: _key,
      windowSize: "maximize",  //maximizes the window size
      waitForTimeout: 10000,
      waitForElement: 5000,
      smartWait: 5000,
      waitForText: 5000,
      waitForInvisible: 10000,
      fullPageScreenshots: true, //full page screenshots on failure
      uniqueScreenshots: true, //prevents screenshot overrides if scenarios have same name
      timeouts: {
        "page load": 6000   //gives each page 6 seconds to load
      }
      
    },
    BrowserStackSession: {
      require: "./utils/browserstack_session.js",
    },
  },
  include: {
    I: "./steps_file.js",
  },
  bootstrap: null,
  timeout: null,
  teardown: null,
  gherkin: {
    features: "./features/**/*.feature",
    steps: ["./step_definitions/commonSteps.js"],
  },
  plugins: {
    autoLogin: {
      enabled: true,
      saveToFile: false,
      inject: "loginAs",
      users: {
        admin: {},
      },
    },
    screenshotOnFail: {
      enabled: true,
    },
    customHooks: {
      require: "./utils/hooks",
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
      minTimeout: 3000,
    },
    retryTo: {
      enabled: true,
    },
    eachElement: {
      enabled: true,
    },
    pauseOnFail: {},
    allure: {
      enabled: true,
      require: "@codeceptjs/allure-legacy",
      outputDir: "./out",
    },
    customLocator: {
      enabled: true,
      prefix: "&",
      attribute: "href",
    },
  },
  tests: "./features/**/*.feature",
  name: "{{automation11/13}}",
};
