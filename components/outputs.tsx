"use client";
import { approximateProgressWidth, cn, LS_KEY, minutesPass } from "@/lib/utils";
import { fetchTTSJobById } from "@/pages/api/fetchTtsJobById";
import { INFERENCE_JOB } from "@/types/voiceAPI";
import { Button } from "@headlessui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";

export default function Outputs() {
  const [latestJob] = useLocalStorage<INFERENCE_JOB[]>(LS_KEY);
  return (
    <div className="max-w-[400px] w-full min-h-[416px] border border-slate-300 rounded-lg">
      <div className="p-5">
        <h1 className="font-semibold text-lg">Outputs</h1>
        <sub className="text-sm text-slate-500">
          This section will show your last 5 conversions.
        </sub>
      </div>
      {latestJob.map((job, index) => (
        <ConversionTile key={job.id} jobData={job} index={index} />
      ))}
    </div>
  );
}

function ConversionTile({
  jobData,
  index,
}: {
  jobData: INFERENCE_JOB;
  index: number;
}) {
  const [latestJobs, setLatestJobs] = useLocalStorage<INFERENCE_JOB[]>(LS_KEY);
  useQuery({
    queryFn: async () => {
      const jobUpdate = await fetchTTSJobById(jobData.id);
      const jobs = [...latestJobs];
      jobs[index] = jobUpdate;
      if (jobUpdate.status !== "success" && jobUpdate.status !== "running") {
        // delete this job
        jobs.splice(index, 1);
      }
      setLatestJobs(jobs);
      return jobUpdate;
    },
    queryKey: [`TTSJob#${jobData.id}`],
    refetchInterval: jobData.status === "running" ? 1_000 : 60_000,
    enabled: jobData.status === "running" || jobData.status === "success",
  });

  const jobStatus = jobData.status === "running" ? "Converting" : "Ready";
  const jobDate = new Date(jobData.createdAt);
  const modelTitle = jobData.model?.title;
  const minutesPast = minutesPass(jobDate);
  const progressBarWidth = approximateProgressWidth(jobDate);

  const handleDownloadClick = useCallback(() => {
    if (jobData.status !== "success" || !jobData.outputFileUrl) return;
    const link = document.createElement("a");
    link.href = jobData.outputFileUrl;
    link.download = "file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [jobData]);

  return (
    <div className="p-5 pt-3 pb-5 border border-x-0 border-t-slate-300 border-t-1 border-b-0 max-h-16">
      <div className="flex flex-row justify-between items-center text-xs w-full">
        <div>
          <span>{jobStatus}</span>
          <span className="text-slate-500">
            &nbsp;•&nbsp;{minutesPast} minutes ago&nbsp;•&nbsp;
          </span>
          <span className="underline underline-offset-4">{modelTitle}</span>
        </div>
        {jobStatus === "Ready" && (
          <Button
            className="w-8 h-8 flex justify-center border rounded-md items-center"
            onClick={handleDownloadClick}
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      {jobStatus === "Converting" && <ProgressBar width={progressBarWidth} />}
    </div>
  );
}

function ProgressBar({ width }: { width: `${number}%` }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-2 pr-5">
      <div className="bg-slate-900 h-2 rounded-full" style={{ width }}></div>
    </div>
  );
}
