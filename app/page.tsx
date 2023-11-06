import Image from "next/image";
import { notFound } from "next/navigation";
import OpenAI from "openai";
import { getCompletion } from "./openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export default async function Page() {
  const html: any = await getCompletion("home");

  return (
    <main className="min-h-screen">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </main>
  );
}
