export default function addPeriodToDate(start: Date, plan: 'monthly' | 'yearly'): Date {
  const d = new Date(start.getTime());
  if (plan === 'monthly') {
    // Use setMonth so JS handles month overflow (e.g., Jan 31 -> Feb/Mar edge cases)
    d.setMonth(d.getMonth() + 1);
  } else {
    d.setFullYear(d.getFullYear() + 1);
  }
  return d;
}
