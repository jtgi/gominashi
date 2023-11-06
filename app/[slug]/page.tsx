import Image from "next/image";
import { notFound } from "next/navigation";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return notFound();
  }

  const html: any = await getCompletion(params.slug);
  return (
    <main>
      <h1 className="text-3xl font-semibold">{params.slug}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </main>
  );
}

async function getCompletion(slug: string) {
  return openai.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: `
      Create HTML for Gominashi, a company specializing in on-demand garbage collection. The page should be styled with Tailwind CSS. Do not include <html><head>, or <body> tags, only the html for inside the body tag is needed.

      Here's the information about Gominashi:
      - Gominashi offers an on-demand network of humans carrying garbage cans on their backpacks.
      - This service is crucial in Japan where there are no public trash cans.
      - Gominashi solves the problem of people carrying garbage in their pockets or bags, which can mess up clothes and take up space.
      - The app allows users to tap a button, and a human will arrive with a garbage can on their back. Users can dispose of their trash, and the backpack will detect the weight, charging accordingly. It also compacts the trash to save space.
      
      You will be provided a few words only and expected to generate html content for an entire page of gominashi. For example, given the slug: about, you would generate html with company information, their founding, how to find them, mission and goals.
      
      given the slug: inquire, you might generate a page with a contact form.
      
      when images are required always use absolute urls. Keep the information relatively short and simple. 

      do no include any of the above information verbatim, the content should focus mostly on the word provided in context of the company info provided above.

      use a desing that would be trending on css aggregator websites like codepen, csszengarden. use award winning german typography and design. the page should be responsive to work on most browsers and easy to read.

      don't use any images unless you have the absolute url.

      do not include a navigation or footer only the content
      `,
        },
        { role: "user", content: slug },
      ],
      model: "gpt-3.5-turbo",
    })
    .then((res) => {
      console.log(res.choices);
      return res.choices[0].message.content;
    });
}
