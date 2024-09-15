import Header from "@/components/header";
import Outputs from "@/components/outputs";
import TTS from "@/components/tts";
import * as React from "react";

export default function Home() {
  return (
    <>
      <section>
        <Header/>
      </section>
      <section className="flex w-full justify-between container">
        <TTS />
        <Outputs/>
      </section>
    </>
  );
}
