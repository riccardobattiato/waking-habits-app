import {
  add,
  differenceInDays,
  isBefore,
  isSameDay,
  startOfDay,
} from "date-fns";
import type { Transition } from "./types";
import { differenceOnlyMinutes } from "@/utils/date";

export function getWakingPlan({ from, to }: Transition): Date[] {
  if (isSameDay(to, from)) throw new Error("Cannot transition on the same day");
  if (isBefore(to, from))
    throw new Error("End date must come later than start date");

  const minutes = differenceOnlyMinutes(to, from);
  const days = differenceInDays(startOfDay(to), startOfDay(from));
  const slope = minutes / days; // TODO support more than linear transitions in the future

  return Array.from({ length: days + 1 }, (el, i) =>
    add(new Date(from), { days: i, minutes: i * slope }),
  );
}
