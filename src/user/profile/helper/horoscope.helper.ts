export class Horoscope {
  calculateHoroscope(birthday: string): string {
    const [day, month] = birthday.split(' ').map(Number);

    if ((month === 1 && day >= 20 && day <= 31) || (month === 2 && day <= 18)) {
      return 'Aquarius';
    } else if (
      (month === 2 && day >= 19 && day <= 31) ||
      (month === 3 && day <= 20)
    ) {
      return 'Pisces';
    } else if (
      (month === 3 && day >= 21 && day <= 31) ||
      (month === 4 && day <= 19)
    ) {
      return 'Aries';
    } else if (
      (month === 4 && day >= 20 && day <= 31) ||
      (month === 5 && day <= 20)
    ) {
      return 'Taurus';
    } else if (
      (month === 5 && day >= 21 && day <= 31) ||
      (month === 6 && day <= 20)
    ) {
      return 'Gemini';
    } else if (
      (month === 6 && day >= 22 && day <= 31) ||
      (month === 7 && day <= 22)
    ) {
      return 'Cancer';
    } else if (
      (month === 7 && day >= 23 && day <= 31) ||
      (month === 8 && day <= 22)
    ) {
      return 'Leo';
    } else if (
      (month === 8 && day >= 23 && day <= 31) ||
      (month === 9 && day <= 22)
    ) {
      return 'Virgo';
    } else if (
      (month === 9 && day >= 23 && day <= 31) ||
      (month === 10 && day <= 23)
    ) {
      return 'Libra';
    } else if (
      (month === 10 && day >= 24 && day <= 31) ||
      (month === 11 && day <= 21)
    ) {
      return 'Scorpio';
    } else if (
      (month === 11 && day >= 22 && day <= 31) ||
      (month === 12 && day <= 21)
    ) {
      return 'Sagittarius';
    } else if (
      (month === 12 && day >= 22 && day <= 31) ||
      (month === 1 && day <= 19)
    ) {
      return 'Capricorn';
    } else {
      return 'Invalid date';
    }
  }
}
