import moment from 'moment-timezone';
import config from '../config/config.json';

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertAndDisplayTZ(utcDate) {
  return moment.utc(utcDate).tz(config.timeZone).format('D-M-Y');
}

export function convertToWeekDayNames(utcDate) {
  return moment.utc(utcDate).tz(config.timeZone).format('ddd');
}