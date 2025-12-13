import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertTime(time) {
  const convertedTime = dayjs.utc(time).tz(dayjs.tz.guess());
  const formatedTime = convertedTime.format("YYYY-MM-DD HH:mm:ss");
  return formatedTime;
}
