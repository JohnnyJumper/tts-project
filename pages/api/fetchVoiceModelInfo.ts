import { PAGINATION_META, VOICE_MODEL_DATA } from "@/types/voiceAPI";

const API_KEY = process.env.KITS_VOICE_API_KEY;

type VOICE_API_RESPONSE = {
  data: VOICE_MODEL_DATA[];
  meta: PAGINATION_META;
};

export async function fetchVoiceModelInfo(): Promise<VOICE_API_RESPONSE> {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const url = "https://arpeggi.io/api/kits/v1/voice-models";
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch the voice model data");
  }

  return response.json();
}
