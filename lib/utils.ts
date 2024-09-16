import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LS_KEY = "latestJobs" as const;

export function secondsPass(fromDate: Date): number {
  const now = new Date().getTime();
  const past = fromDate.getTime();
  const milliDiff = now - past;
  if (milliDiff < 10) {
    // hack to make sure the bar is not 100% imidiatelly after clicking
    return 0;
  }
  return Math.floor(milliDiff / 1000);
}

export function minutesPass(fromDate: Date): number {
  const secondsPast = secondsPass(fromDate);
  return Math.floor(secondsPast / 60);
}

export function approximateProgressWidth(fromDate: Date): `${number}%` {
  const secondsPast = secondsPass(fromDate) * 60;
  const maxWaitTime = 1 * 60; // 1 minutes
  if (secondsPast > maxWaitTime) return "98%";

  const approximateProcentile = Math.floor((100 * secondsPast) / maxWaitTime);
  console.log({ approximateProcentile });
  return `${approximateProcentile}%`;
}
