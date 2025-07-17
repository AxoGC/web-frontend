import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(date: Date) {
  return dayjs(date).tz('Asia/Shanghai').format('YYYY年MM月DD日 HH:mm');
};
