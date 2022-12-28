import {
  component$,
  createContext,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Forms from "../components/forms/forms";
import Preview from "../components/preview/preview";

interface question {
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  promp: string;
}

export const questions: question[] = [
  {
    type: "url",
    name: "redirectUrl",
    placeholder: "https://github.com/fazatholomew",
    label: "Link to shorten",
    promp:
      "Let's make your link shorter and looks better! And of course, QR Code.",
  },
  {
    type: "text",
    name: "title",
    placeholder: "Cuty.ink: an 😎 url shortener!",
    label: "Title",
    promp:
      "This is where you should put the click bait. Usually, title is the top text with bold styling.",
  },
  {
    type: "text",
    name: "description",
    placeholder: "Let's make your link shorter and looks better!",
    label: "Description",
    promp:
      "A brief explanation about the link or website. Keep it less than 3 sentences. It will get truncated.",
  },
  {
    type: "url",
    name: "photoUrl",
    placeholder:
      "https://static2.srcdn.com/wordpress/wp-content/uploads/2021/02/Rick-Astley-Never-Gonna-Give-You-Up-Remastered-Header.jpg",
    label: "Thumbnail URL",
    promp:
      "Use an image with a 1.91:1 ratio and minimum recommended dimensions of 1200x630.",
  },
  {
    type: "text",
    name: "shortUrl",
    placeholder: "awesome_link",
    label: "Short Link",
    promp:
      'Create your own short link. You may use _ or -.\nE.g "awesome_link" would be https://cuty.ink/awesome_link.',
  },
  {
    promp: 'This is how your link is going to look like.'
  }
];

export const globalData = createContext("global-data");

export default component$(() => {
  const store = useStore({
    currentPage: 4,
    data: {},
    currentQuestion: questions[4],
  });
  useTask$(({ track }) => {
    const currentPage = track(() => store.currentPage);
    store.currentQuestion = questions[currentPage];
  });
  const { promp } = store.currentQuestion;
  const renderPromp = promp.split("\n").map((row) => (
    <>
      {row} <br />
    </>
  ));
  useContextProvider(globalData, store);
  return (
    <div class="flex items-center justify-center grow shrink">
      <div class="lg:w-1/3 px-2 flex items-center justify-center flex-col">
        <h1 class="text-lg lg:text-5xl font-medium mb-10">
          {renderPromp}
          <span class="flex justify-between">{store.currentPage > 0 && (
            <span
              onClick$={() => (store.currentPage -= 1)}
              class="underline text-xs lg:text-3xl text-gray-500 hover:text-gray-300 hover:cursor-pointer"
            >
              ← back
            </span>
          )}
          {store.currentPage < 5 && (
            <span
              onClick$={() => (store.currentPage += 1)}
              class="underline text-xs lg:text-3xl text-gray-500 hover:text-gray-300 hover:cursor-pointer"
            >
               forward →
            </span>
          )}</span>
        </h1>
        {/* <Forms /> */}
        <Preview />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
