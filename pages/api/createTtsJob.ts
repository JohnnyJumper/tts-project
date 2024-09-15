import { INFERENCE_JOB } from "@/types/voiceAPI";

const API_KEY = process.env.KITS_VOICE_API_KEY;

export async function createTTSJob({
  voiceModel,
  text,
}: {
  voiceModel: number;
  text: string;
}): Promise<INFERENCE_JOB | null> {
  const form = new FormData();

  form.append("voiceModelId", voiceModel.toString());
  form.append("inputTtsText", text);

  const options: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    body: form,
  };
  const url = "https://arpeggi.io/api/kits/v1/tts";

  const response = await fetch(url, options).then((r) => r.json());
  return response;
}
