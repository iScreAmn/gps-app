function pad(value) {
  return value.toString().padStart(2, '0');
}

export function getRemainingTime(targetDate) {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;

  const days = Math.floor(diff / daysInMs);
  const hours = Math.floor((diff % daysInMs) / hoursInMs);
  const minutes = Math.floor((diff % hoursInMs) / minutesInMs);
  const seconds = Math.floor((diff % minutesInMs) / secondsInMs);

  const d = pad(days);
  const h = pad(hours);
  const m = pad(minutes);
  const s = pad(seconds);

  return {
    days: d,
    hours: h,
    minutes: m,
    seconds: s,
  };
}

