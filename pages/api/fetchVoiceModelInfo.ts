const API_KEY = process.env.KITS_VOICE_API_KEY;

type VOICE_MODEL_DATA = {
  id: number;
  title: string;
  tags: string[] | null;
  imageUrl: string | null;
  demoURl: string | null;
  twitterLink: string | null;
  instagramLink: string | null;
  tiktokLink: string | null;
  spotifyLink: string | null;
  youtubeLink: string | null;
};

type PAGINATION_META = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
};

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
  const response = await fetch(url, options).then((r) => r.json());
  return await response;
}
