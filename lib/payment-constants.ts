export const COURSE_AMOUNT_INR = 600;
export const COURSE_AMOUNT_PAISE = COURSE_AMOUNT_INR * 100;
export const INTERNSHIP_DURATION_DAYS = 30;

export function internshipDates(from: Date = new Date()) {
  const start = new Date(from);
  const end = new Date(start);
  end.setDate(start.getDate() + INTERNSHIP_DURATION_DAYS);
  return { start, end };
}
