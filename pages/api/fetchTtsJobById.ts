import { INFERENCE_JOB } from "@/types/voiceAPI";

const API_KEY = process.env.KITS_VOICE_API_KEY;

export async function fetchTTSJobById(id: number): Promise<INFERENCE_JOB> {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const url = `https://arpeggi.io/api/kits/v1/tts/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch the tts job data");
  }
  return response.json();
}
