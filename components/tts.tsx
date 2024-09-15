import * as React from "react";
import { Select, Field, Label, Textarea, Button } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchVoiceModelInfo } from "@/pages/api/fetchVoiceModelInfo";

export default function TTS() {
  const { data: models, isLoading } = useQuery({
    queryFn: async () => await fetchVoiceModelInfo(),
    queryKey: ["voiceModelInfo"], //Array according to Documentation
  });

  return (
    <div className="max-w-[400px] w-full border border-slate-300 rounded-lg p-5">
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Text to speech</h1>
        <sub className="text-sm text-slate-500">
          Select a voice and provide text to generate speech
        </sub>
      </div>

      <Field className="relative mb-6">
        <Label className="text-sm leading-[14px] font-medium mb-[6px]">
          Voice Model
        </Label>
        <Select
          disabled={isLoading}
          className={cn(
            "border rounded-md w-full py-2 px-3 group appearance-none",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          data-focus
        >
          {isLoading && <option>Loading...</option>}
          {models?.data.map((model) => (
            <option key={model.id} value={model.id}>
              {model.title}
            </option>
          ))}
        </Select>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-9 right-2.5 size-4 fill-slate-400"
          aria-hidden="true"
        />
      </Field>

      <Field className="flex flex-col mb-6">
        <Label className="text-sm leading-[14px] font-medium mb-[6px]">
          Input text
        </Label>
        <Textarea
          name="input_text"
          className="border border-slate-300 min-w-80 rounded-md py-2 px-3 text-sm min-h-20"
          placeholder="Add text here"
        />
      </Field>
      <div className="flex justify-end">
        <Button className="text-white text-sm font-medium bg-slate-900 py-2 px-4 rounded-md">
          Convert
        </Button>
      </div>
    </div>
  );
}
