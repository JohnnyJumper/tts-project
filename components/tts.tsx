import * as React from "react";
import { Select, Field, Label, Textarea, Button } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

export default function TTS() {
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
          className={cn(
            "border rounded-md w-full py-2 px-3 group appearance-none",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          data-focus
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="delayed">Delayed</option>
          <option value="canceled">Canceled</option>
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
