const failFast = require('protractor-fail-fast');
const glob = require('glob');
const path = require('path');

let patterns;
let scenariosRoot;

process.argv.forEach((arg) => {
  patterns = arg.split('--patterns=')[1] || patterns;
  scenariosRoot = arg.split('--scenariosRoot=')[1] || scenariosRoot;
});

function specListFromPattern(patterns, scenariosRoot) {
  const files = patterns
    .split(',')
    .map((entry) => entry.trim())
    .reduce((files, pattern) => {
      return [
        ...files,
        ...glob.sync(pattern, {
          root: scenariosRoot,
          cwd: scenariosRoot
        })
      ];
    }, []);

  return files.map((filename) => `${process.cwd()}${path.sep}${scenariosRoot}${path.sep}${filename}`);
}

const config = {
  SELENIUM_PROMISE_MANAGER: false,
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 30000,
  directConnect: true,
  framework: 'jasmine',

  jasmineNodeOpts: {
    includeStackTrace: true,
    realtimeFailure: true,
    showColors: true,
    defaultTimeoutInterval: 1000 * 60 * 5
  },
  plugins: [failFast.init()],
  afterLaunch: () => {
    failFast.clean();
  },
  //ignoreSynchronization: true,
  params: {
    timeToWaitExitOtterMs: 2000
  },
  specs: specListFromPattern(patterns, scenariosRoot),
  onPrepare: () => {
    browser.driver.ignoreSynchronization = true; 
    browser.waitForAngularEnabled(false);
    browser
      .manage()
      .window()
      .setSize(1920, 1080);
    browser
      .manage()
      .timeouts()
      .setScriptTimeout(60000);
  },
  capabilities: {
    maxInstances: 1,
    shardTestFiles: true,
    name: 'Protractor test',
    browserName: 'chrome',
    chromeOptions: {
       args: ['--headless', '--disable-web-security', '--disable-extension', '--allow-file-access', '--allow-insecure-localhost', '--allow-running-insecure-content', '--windowTypes=Window']
    },
    idleTimeout: 10000,
    commandTimeout: 6000,
    maxDuration: 3600 * 3 // 3 hours
  }
};


// eslint-disable-next-line no-console
console.log(`Running on : ${config.specs}`);

exports.config = config;