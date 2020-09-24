const moment = require('moment');

moment.locale('ru');

const nowDate = new Date();
// or make it constant?
const offSetMin = nowDate.getTimezoneOffset() * -1;

module.exports = function formatDate({ src, options }) {
  const formats = [
    moment.ISO_8601,
    'YYYY-MM-DDZ',
    'YYYY-MM-DD',
    'DD-MM-YYYY HH:mm', 
    'YYYY-MM-DD HH:mm', 
    'DD.MM.YYYY HH:mm', 
    'YYYY.MM.DD HH:mm', 
    'DD-MM-YYYY', 
    'YYYY-MM-DD', 
    'DD.MM.YYYY', 
    'DD.MM.YYYY',
    "D MMMM YYYY",
    "DD MMMM YYYY",
    "DD MMM YYYY",
    'DD "MMM" YYYY',
    "DD «MMM» YYYY",
    "DD/MM/YYYY",
  ];
  const date = moment(src[options], formats);
  let result;
  if (src[options][src[options].length-6] === '+') {
    result = date.toISOString(true);
  } else if (src[options].substr(-1) === 'Z') {
    result = date.toISOString(false);
  } else {
    result = date.add(offSetMin, 'minutes').toISOString(false);
  }

  return result;
}
