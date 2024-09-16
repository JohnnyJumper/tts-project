import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LS_KEY = "latestJobs" as const;

export function minutesPass(fromDate: Date): number {
  const now = new Date().getTime();
  const past = fromDate.getTime();
  const milliDiff = now - past;
  if (milliDiff < 10) {
    // hack to make sure the bar is not 100% imidiatelly after clicking
    return 0;
  }
  const totalSeconds = Math.floor(milliDiff / 1000);
  return Math.floor(totalSeconds / 60);
}

export function approximateProgressWidth(fromDate: Date): `${number}%` {
  const minutesPast = minutesPass(fromDate);
  const maxWaitTime = 5; // minutes
  if (minutesPast > maxWaitTime) return "98%";

  const approximateProcentile = Math.floor((100 * minutesPast) / maxWaitTime);
  return `${approximateProcentile}%`;
}
