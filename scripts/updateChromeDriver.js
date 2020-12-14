const request = require('request');
const {exec} = require('child_process');

request('https://chromedriver.storage.googleapis.com/LATEST_RELEASE', (err, res, body) => {
  exec('yarn wd:init --versions.chrome=' + body, (err, stdout, warnings) => {
    // eslint-disable-next-line no-console
    console.info('err' + err, 'out' + stdout, 'warnings' + warnings);
  });
});
