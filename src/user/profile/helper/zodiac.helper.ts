export class Zodiac {
  private readonly zodiacSigns = [
    'Goat',
    'Water Bearer',
    'Fish',
    'Ram',
    'Bull',
    'Twins',
    'Crab',
    'Lion',
    'Virgin',
    'Balance',
    'Scorpion',
    'Archer',
    'Goat',
  ];
  calculateZodiac(birthday: string): string {
    const [day, month] = this.parseBirthday(birthday);
    if (!this.isValidDate(day, month)) {
      return 'Invalid date';
    }
    return this.getZodiacSign(day, month);
  }

  private parseBirthday(birthday: string): [number, number] {
    const [day, month] = birthday.split(' ').map(Number);
    return [day, month];
  }

  private isValidDate(day: number, month: number): boolean {
    return (
      !isNaN(day) &&
      !isNaN(month) &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31
    );
  }

  private getZodiacSign(day: number, month: number): string {
    const signIndex = month - (day < 20 ? 1 : 0);
    return this.zodiacSigns[signIndex];
  }
}
