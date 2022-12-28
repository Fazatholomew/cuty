import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const { params } = useLocation();
  const link = `https://cuty.ink/${params.slug}`;
  return (
    <div class="lg:w-1/3 px-2">
      <h1 class="text-lg lg:text-5xl font-medium mb-5">
        Thank you for using Cuty.ink.
      </h1>
      <h2 class="text-base lg:text-3xl font-medium mb-5">Here is your link:</h2>
      <div class="w-full flex items-center justify-center">
        <a class="text-center transition-all hover:underline lg:text-4xl text-2xl" href={link}>
          {link}
        </a>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Cuty.ink: Beautify your link.",
  meta: [
    {
      name: "description",
      content: "Cuty.ink: Let's shorten and make your link look good!",
    },
  ],
};
