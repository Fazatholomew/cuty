import { Component, component$, useContext, useStore } from "@builder.io/qwik";
import { globalData } from "../../routes";
import Facebook from "./facebook";
import Linkedin from "./linkedin";
import Twitter from "./twitter";

export interface previewData {
  redirectUrl?: string;
  title?: string;
  description?: string;
  photoUrl?: string;
  shortUrl?: string;
}

export interface socialMedia {
  name: string;
  component: Component<previewData>;
}

export const dummie: previewData = {
  redirectUrl: "https://jimmyganteng.com/test?id=123&q=test",
  title: "This can't be better than this!",
  description:
    "I love playing football since I was a little. It's my life. I wish things can get better really really soon.",
  photoUrl:
    "https://static2.srcdn.com/wordpress/wp-content/uploads/2021/02/Rick-Astley-Never-Gonna-Give-You-Up-Remastered-Header.jpg",
  shortUrl: "awesome_link",
};

export default component$(() => {
  const store = useStore({ currentSocialMedia: 0 });
  const socialMedias = [
    {
      name: "Twitter",
      component: <Twitter previewData={dummie} />,
    },
    {
      name: "LinkedIn",
      component: <Linkedin previewData={dummie} />,
    },
    {
      name: "Facebook",
      component: <Facebook previewData={dummie} />,
    },
  ];
  return (
    <div class="w-full flex items-center justify-center gap-4 flex-col">
      <span class="text-base lg:text-2xl">
        {store.currentSocialMedia > 0 && (
          <span
            class="cursor-pointer"
            onClick$={() => {
              store.currentSocialMedia -= 1;
            }}
          >
            ←{" "}
          </span>
        )}
        <span>{socialMedias[store.currentSocialMedia].name}</span>
        {store.currentSocialMedia < socialMedias.length - 1 && (
          <span
            class="cursor-pointer"
            onClick$={() => {
              store.currentSocialMedia += 1;
            }}
          >
            {" "}
            →
          </span>
        )}
      </span>
      {socialMedias[store.currentSocialMedia].component}
    </div>
  );
});
