export type VOICE_MODEL_DATA = {
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

export type PAGINATION_META = {
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

export type INFERENCE_JOB = {
  id: number;
  createdAt: string;
  type: "infer" | "tts";
  status: "running" | "success" | "error" | "cancelled";
  jobStartTime: string | null;
  jobEndTime: string | null;
  outputFileUrl: string | null;
  lossyOutputFileUrl: string | null;
  recombinedAudioFileUrl: string | null;
  voiceModelId: string | null | undefined;
  model: VOICE_MODEL_DATA | null;
};
