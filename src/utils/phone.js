// Georgian phone numbers: +995 followed by exactly 9 digits.
export const PHONE_COUNTRY_CODE = '995';
export const PHONE_PREFIX = `+${PHONE_COUNTRY_CODE} `;
export const PHONE_LOCAL_DIGITS = 9;

// Digits after the country code, capped at 9.
export const getLocalPhoneDigits = (value) => {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith(PHONE_COUNTRY_CODE)) {
    digits = digits.slice(PHONE_COUNTRY_CODE.length);
  }
  return digits.slice(0, PHONE_LOCAL_DIGITS);
};

// Keeps the +995 prefix in place and formats as "+995 XXX XXX XXX".
export const formatPhone = (value) => {
  const digits = getLocalPhoneDigits(value);
  const groups = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9)].filter(Boolean);
  return PHONE_PREFIX + groups.join(' ');
};

export const isPhoneEmpty = (value) => getLocalPhoneDigits(value).length === 0;

export const isPhoneValid = (value) =>
  getLocalPhoneDigits(value).length === PHONE_LOCAL_DIGITS;
