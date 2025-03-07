import { differenceInMinutes, set } from "date-fns";

/**
 * Returns the difference in minutes as if both dates were
 * in the same day
 */
export const differenceOnlyMinutes = (a: Date, b: Date) => {
  const now = new Date();
  const _a = set(now, {
    hours: a.getHours(),
    minutes: a.getMinutes(),
  });
  const _b = set(now, {
    hours: b.getHours(),
    minutes: b.getMinutes(),
  });

  return differenceInMinutes(_a, _b);
};
