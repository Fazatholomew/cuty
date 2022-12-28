import { component$, useContext, useStore } from "@builder.io/qwik";
import { globalData } from "../../routes";
import Twitter from "./twitter";

export interface previewData {
  redirectUrl?: string;
  title?: string;
  description?: string;
  photoUrl?: string;
  shortUrl?: string;
}

export const dummie: previewData = {
  redirectUrl: 'https://jimmyganteng.com/test?id=123&q=test',
  title: 'This can\'t be better than this!',
  description: "I love playing football since I was a little. It's my life. I wish things can get better really really soon.",
  photoUrl: "https://static2.srcdn.com/wordpress/wp-content/uploads/2021/02/Rick-Astley-Never-Gonna-Give-You-Up-Remastered-Header.jpg",
  shortUrl: "awesome_link"
}

export default component$(() => {
  return <div class="w-full flex items-center justify-center">
    <Twitter previewData={dummie} />
  </div>;
});
