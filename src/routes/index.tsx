import {
  $,
  component$,
  createContext,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";
import Forms from "../components/forms/forms";
import Preview from "../components/preview/preview";
import { generateSlug, isUrl } from "../utils/utils";

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
      "Let's make your link shorter and looks better! Type your link and get going.",
  },
  {
    type: "text",
    name: "title",
    placeholder: "Cuty.ink: an 😎 url shortener!",
    label: "Title",
    promp: "This is where you should put the click bait.",
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
      'Create your own short link. You may use _ or -.\nE.g "awesome_link" would be https://cuty.ink/awesome_link.\nsIf blank, we\'ll generate it randomly.',
  },
  {
    promp:
      "This is how your link is going to look like.\nIt may differ a little bit depends on the user browser/night-mode/font size.",
    
  },
  {
    promp: "Generating link...",
  },
];

export const globalData = createContext("global-data");

export default component$(() => {
  const store = useStore({
    currentPage: 0,
    data: {},
    currentQuestion: questions[0],
    isLoading: false,
  });
  useTask$(({ track }) => {
    const currentPage = track(() => store.currentPage);
    store.currentQuestion = questions[currentPage];
  });
  const navigate = useNavigate();
  const { promp } = store.currentQuestion;
  const renderPromp = promp.split("\n").map((row) => (
    <>
      {row} <br />
    </>
  ));
  useContextProvider(globalData, store);
  const password = useSignal<HTMLInputElement>();
  const nextQuestion = $(() => {
    if (password.value?.value) {
      window.location.replace("https://cnn.com");
    }
    // @ts-ignore
    const currentValue = store.data[questions[store.currentPage].name] || "";
    switch (store.currentPage) {
      case 0:
        if (currentValue.length > 0) {
          if (isUrl(currentValue)) {
            store.currentPage += 1;
          } else {
            alert("Please enter a valid URL.");
            return;
          }
        } else {
          store.currentPage += 1;
        }
        break;
      case 3:
        if (currentValue.length > 0) {
          if (isUrl(currentValue)) {
            store.currentPage += 1;
          } else {
            alert("Please enter a valid URL.");
            return;
          }
        } else {
          store.currentPage += 1;
        }
        break;
      case 4:
        // Check shortUrl availbility
        // @ts-ignore
        if (!store.data.shortUrl) {
          // @ts-ignore
          store.data.shortUrl = generateSlug();
        }
        // @ts-ignore
        fetch(`https://cuty.ink/${store.data.shortUrl}`).then((res) => {
          if (res.status === 404) {
            store.currentPage += 1;
            return;
          } else {
            alert("Sorry, short Url already used. Please enter different URL.");
            return;
          }
        });
        break;
      default:
        store.currentPage += 1;
    }
  });
  // const renderStep = questions.slice(0,5).map((_, i) => {
  //   return (<div class="w-1/6 flex justify-center items-center">
  //     <div class={`w-2 h-2 rounded-full ${i === store.currentPage ? 'bg-[#2568FB]' : 'bg-gray-300'}`}></div>
  //   </div>)
  // })
  return (
    <div class="flex items-center justify-center grow shrink flex-col">
      <input ref={password} type="password" class="hidden" />
      {/* {questions[store.currentPage].label && <div class="h-9 w-24 bg-white rounded flex flex-row mb-5 items-center justify-center">{renderStep}</div>}
      {questions[store.currentPage].label && <h5 class="mb-10">{`Step ${store.currentPage + 1}: ${questions[store.currentPage].label}`}</h5>} */}
      <div class="lg:w-1/3 px-2 flex items-center justify-center flex-col">
        <h1 class="text-lg lg:text-5xl font-medium mb-20">
          {renderPromp}
          <span class="flex justify-between">
            {store.currentPage > 0 && !store.isLoading && (
              <span
                onClick$={() => (store.currentPage -= 1)}
                class="hover:underline text-xs lg:text-3xl text-gray-400 hover:text-gray-500 hover:cursor-pointer"
              >
                ← back
              </span>
            )}
            {store.currentPage < 5 && (
              <span
                onClick$={() => {
                  // input validation
                  nextQuestion();
                }}
                class="underline transition-all text-xs lg:text-3xl text-gray-200 hover:text-gray-400 hover:cursor-pointer"
              >
                forward →
              </span>
            )}
            {store.currentPage === 5 && !store.isLoading && (
              <span
                onClick$={() => {
                  store.currentPage += 1;
                  store.isLoading = true;
                  // @ts-ignore
                  grecaptcha
                    .execute("6LejW8YjAAAAAOYwG-7P47fLejI_e9YQ2m857tOe", {
                      action: "submit",
                    })
                    .then(function (token: string) {
                      fetch("https://cuty.ink", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify({
                          ...store.data,
                          token,
                        }),
                      })
                        .then((res) => {
                          if (res.status < 300) {
                            // @ts-ignore
                            navigate.path = `/view/${store.data.shortUrl}`;
                            return;
                          }
                          res.text().then((text_error) => {
                            alert(
                              `Sorry there's this error:\n${text_error}\nPlease let me know if this keeps happening.\njimmy@allinenergy.org`
                            );
                            store.currentPage -= 1;
                          });
                        })
                        .catch((err) => {
                          alert(err);
                          store.currentPage -= 1;
                        });
                    });
                }}
                class="underline transition-all text-xs lg:text-3xl text-gray-200 hover:text-gray-400 hover:cursor-pointer"
              >
                generate →
              </span>
            )}
          </span>
        </h1>
        {store.currentPage < 5 && <Forms nextQuestion={nextQuestion} />}
        {store.currentPage === 5 && <Preview />}
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
