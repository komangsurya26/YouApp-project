export class Age {
  calculateAge(birthday: string): number {
    const [day, month, year] = birthday.split(' ').map(Number);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Month index starts from 0
    const currentDay = today.getDate();

    let age = currentYear - year;

    // Cek Age User
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      age = age - 1;
    }

    return age;
  }
}
