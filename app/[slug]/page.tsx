import Image from "next/image";
import { notFound } from "next/navigation";
import { getCompletion } from "../openai";

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return notFound();
  }

  const html: any = await getCompletion(params.slug);
  return (
    <main className="min-h-screen">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </main>
  );
}
