const moment = require('moment');
const chalk = require('chalk');

/* Prelude
 *
 * A function that produces the default timestamp for all messages logged with
 * Log.
 **/
const prelude = () => (
  `${chalk.dim('[')}` +
  `${chalk.yellow(
    '𝒮 ' + moment(new Date()).format('hh:mm:ss')
  )}` +
  `${chalk.dim(']')} `
);


/* isJson
 *
 * Stringify's provided argument if said argument is an object. Otherwise it
 * returns it verbatim.
 *
 * WARNING: This will fail on circular objects, which is relatively common
 * amoungst node's more complex default objects.
 **/
const isJson = j => typeof j === 'object'
  ? JSON.stringify(j)
  : j;


/* Log
 *
 * A wrapper around console.log that produces colored, dated output. Currently
 * supports objects loosely. Might not be a good alternative to console.log for
 * debugging but is very good for providing distinct user-legible output.
 **/
const Log = function(opts, ...lines) {
  if (typeof opts !== 'object') { lines = [opts, ...lines]; }

  let display = lines
    .map(i => prelude() + chalk[opts.color || 'white']( isJson(i) ))
    .join('\n');

  console.log.call(console, display);
};

/*
 * The following block makes available several color defaults for common log
 * expressions.
 *
 * Log.info is an alias for the default color.
 * Log.error colors the text red.
 * Log.success colors it green.
 * Log.warning and Log.warn do yellow.
 * The other ones are useless but wonderful.
 **/
Log.info = Log.bind(null, {color: 'white'});
Log.error = Log.bind(null, {color: 'red'});
Log.success = Log.bind(null, {color: 'green'});
Log.warning = Log.warn = Log.bind(null, {color: 'yellow'});
Log.amazing = Log.incredible = Log.wow = Log.bind(null, {color: 'magenta'});

module.exports = Log;