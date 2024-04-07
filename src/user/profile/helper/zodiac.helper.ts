export class Zodiac {
  calculateZodiac(birthday: string): string {
    const [day, month] = birthday.split(' ').map(Number);

    if ((month === 1 && day >= 20 && day <= 31) || (month === 2 && day <= 18)) {
      return 'Water Bearer';
    } else if (
      (month === 2 && day >= 19 && day <= 31) ||
      (month === 3 && day <= 20)
    ) {
      return 'Fish';
    } else if (
      (month === 3 && day >= 21 && day <= 31) ||
      (month === 4 && day <= 19)
    ) {
      return 'Ram';
    } else if (
      (month === 4 && day >= 20 && day <= 31) ||
      (month === 5 && day <= 20)
    ) {
      return 'Bull';
    } else if (
      (month === 5 && day >= 21 && day <= 31) ||
      (month === 6 && day <= 20)
    ) {
      return 'Twins';
    } else if (
      (month === 6 && day >= 22 && day <= 31) ||
      (month === 7 && day <= 22)
    ) {
      return 'Crab';
    } else if (
      (month === 7 && day >= 23 && day <= 31) ||
      (month === 8 && day <= 22)
    ) {
      return 'Lion';
    } else if (
      (month === 8 && day >= 23 && day <= 31) ||
      (month === 9 && day <= 22)
    ) {
      return 'Virgin';
    } else if (
      (month === 9 && day >= 23 && day <= 31) ||
      (month === 10 && day <= 23)
    ) {
      return 'Balance';
    } else if (
      (month === 10 && day >= 24 && day <= 31) ||
      (month === 11 && day <= 21)
    ) {
      return 'Scorpion';
    } else if (
      (month === 11 && day >= 22 && day <= 31) ||
      (month === 12 && day <= 21)
    ) {
      return 'Archer';
    } else if (
      (month === 12 && day >= 22 && day <= 31) ||
      (month === 1 && day <= 19)
    ) {
      return 'Goat';
    } else {
      return 'Invalid date';
    }
  }
}
