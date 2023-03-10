import { component$ } from "@builder.io/qwik";
import { previewData } from "./preview";

export default component$(({ previewData }: { previewData: previewData }) => {
  const { redirectUrl, title, description, photoUrl } = previewData;
  // const shortenRedirectUrl = redirectUrl?.split("/")
  //   ? redirectUrl.split("/")[2]
  //   : redirectUrl;
  return (
    <div class="w-full flex flex-col items-stretch basis-auto shrink-0 bg-gray-700 pb-3">
      <div class="border-b border-gray-800 rounded-b-none">
        <a href={redirectUrl} class="w-full">
          <div class="block">
            <div
              style={{ backgroundImage: `url(${photoUrl})` }}
              class="w-full pb-[52%] bg-cover bg-no-repeat bg-center w-full h-full border-none"
            ></div>
          </div>
        </a>
      </div>
      <div class="px-3 pt-3 grow flex gap-4 shrink gap-0.5">
        <div class="min-w-0 max-w-full text-ellipsis break-words text-[1rem] font-normal uppercase text-stone-400">
          <span>cuty.ink</span>
        </div>
      </div>
      <div class="px-3 grow flex gap-4 shrink gap-0.5">
        <div class="min-w-0 max-w-full text-ellipsis break-words text-[1.25rem] font-normal text-gray-200">
          <span>{title}</span>
        </div>
      </div>
      <div class="px-3 grow flex gap-4 shrink gap-0.5">
        <div class="min-w-0 text-ellipsis break-words text-[1rem] font-normal text-stone-400">
          {description}
        </div>
      </div>
    </div>
  );
});
