"use client";
import { approximateProgressWidth, cn, LS_KEY, minutesPass } from "@/lib/utils";
import { INFERENCE_JOB } from "@/types/voiceAPI";
import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";

export default function Outputs() {
  const [latestJob] = useLocalStorage<INFERENCE_JOB[]>(LS_KEY);
  return (
    <div className="max-w-[400px] w-full min-h-96 border border-slate-300 rounded-lg">
      <div className="p-5">
        <h1 className="font-semibold text-lg">Outputs</h1>
        <sub className="text-sm text-slate-500">
          This section will show your last 5 conversions.
        </sub>
      </div>
      {latestJob.map((job) => (
        <ConversionTile key={job.id} jobData={job} />
      ))}
    </div>
  );
}

function ConversionTile({ jobData }: { jobData: INFERENCE_JOB }) {
  const jobStatus = jobData.status === "running" ? "Converting" : "Ready";
  const jobDate = new Date(jobData.createdAt);
  const modelTitle = jobData.model?.title;
  const minutesPast = minutesPass(jobDate);
  const progressBarWidth = approximateProgressWidth(jobDate);
  return (
    <div
      className={cn(
        "p-5 border border-x-0 border-t-slate-300 border-t-1 border-b-0 max-h-14",
        jobStatus === "Converting" && "pt-3"
      )}
    >
      <div className="flex flex-row items-center text-xs">
        <span>{jobStatus}</span>
        <span className="text-slate-500">
          &nbsp;•&nbsp;{minutesPast} minutes ago&nbsp;•&nbsp;
        </span>
        <span className="underline underline-offset-4">{modelTitle}</span>
      </div>
      {jobStatus === "Converting" && <ProgressBar width={progressBarWidth} />}
    </div>
  );
}

function ProgressBar({ width }: { width: `${number}%` }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-2">
      <div className="bg-slate-900 h-2 rounded-full" style={{ width }}></div>
    </div>
  );
}
