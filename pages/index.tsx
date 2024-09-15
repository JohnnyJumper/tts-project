import Header from "@/components/header";
import Outputs from "@/components/outputs";
import TTS from "@/components/tts";
import { cn } from "@/lib/utils";
import * as React from "react";

export default function Home() {
  return (
    <>
      <section>
        <Header />
      </section>
      <section
        className={cn(
          "flex container w-full flex-col items-center gap-5",
          "lg:flex-row lg:justify-center lg:gap-8 lg:items-start"
        )}
      >
        <TTS />
        <Outputs />
      </section>
    </>
  );
}
