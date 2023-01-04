import { component$ } from "@builder.io/qwik";
import { previewData } from "./preview";

export default component$(({ previewData }: { previewData: previewData }) => {
  const { redirectUrl, title, photoUrl } = previewData;
  const shortenRedirectUrl = redirectUrl?.split("/")
    ? redirectUrl.split("/")[2]
    : redirectUrl;
  return (
    <div class="w-full flex flex-col items-stretch basis-auto shrink-0 bg-[#eff3f7]">
      <div class="rounded-b-none">
        <a href={redirectUrl} class="w-full">
          <div class="block">
            <div
              style={{ backgroundImage: `url(${photoUrl})` }}
              class="w-full pb-[52%] bg-cover bg-no-repeat bg-center w-full h-full border-none"
            ></div>
          </div>
        </a>
      </div>
      <div class="px-3 py-5">
      <div class="grow flex gap-4 shrink gap-0.5">
          <div class="min-w-0 max-w-full text-ellipsis break-words text-xl font-normal text-black">
            <span>{title}</span>
          </div>
        </div>
        <div class="grow flex gap-4 shrink gap-0.5 mt-3">
          <div class="min-w-0 max-w-full text-ellipsis break-words text-base font-normal lowercase text-[#00000099]">
            <span>cuty.ink</span>
          </div>
        </div>
      </div>
    </div>
  );
});
