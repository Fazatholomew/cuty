import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <main>
        <section class="content flex items-center justify-center flex-col">
          <div class="w-full h-full flex justify-center items-center">
            <h2 class="text-base lg:text-3xl text-center">Cuty.ink</h2>
          </div>
          <Slot />
          <div class="w-full h-full flex items-center justify-center">
            <footer>Copyright © 2022 <a class="hover:text-xl transition-all" target="_blank" href="https://github.com/fazatholomew">Jimmy Hikmatullah</a>.</footer>
          </div>
        </section>
      </main>
    </>
  );
});
