import { component$, useContext, useStore } from "@builder.io/qwik";
import { globalData } from "../../routes";
interface formsProps {
  type: string;
  name: string;
  placeholder?: string;
  label: string;
}

export default component$(() => {
  const globalStore: any = useContext(globalData);
  const store = useStore({ currentValue: "" });
  // @ts-ignore
  const { type, name, placeholder, label }: formsProps =
    globalStore.currentQuestion;
  return (
    <div class="w-full">
      <input
        type={type}
        name={name}
        class="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent text-base lg:text-3xl text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        onKeyPress$={(e) => {
          if (e.key !== "Enter") return;
          // @ts-ignore
          globalStore.data[name] = store.currentValue;
          // @ts-ignore
          globalStore.currentPage += 1;
          store.currentValue = "";
        }}
        value={store.currentValue}
        onInput$={(e) => {
          store.currentValue = (e.target as HTMLInputElement).value;
        }}
      />
      <label class="absolute -translate-y-6 scale-75 transform text-sm lg:text-2xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
        {label}
      </label>
    </div>
  );
});
