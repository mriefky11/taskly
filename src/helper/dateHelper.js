import {format} from 'date-fns';
import {id} from 'date-fns/locale';

export function formatDate(date, dateFormat = 'dd MMMM yyyy') {
  if (!date) return '';
  return format(new Date(date), dateFormat, {locale: id});
}

export function formatDateTime(date, dateFormat = 'dd MMMM yyyy HH:mm') {
  if (!date) return '';
  return format(new Date(date), dateFormat, {locale: id});
}
