const API_KEY = process.env.KITS_VOICE_API_KEY;

export async function fetchTTSJobById(id: number) {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const url = `https://arpeggi.io/api/kits/v1/tts/${id}`;
  const response = await fetch(url, options).then((r) => r.json());
  return response;
}
