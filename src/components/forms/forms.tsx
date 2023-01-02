import { component$, QRL, useContext, useStore } from "@builder.io/qwik";
import { globalData } from "../../routes";
interface formsProps {
  type: string;
  name: string;
  placeholder?: string;
  label: string;
}

export default component$(({nextQuestion}: {nextQuestion: QRL<() => void>}) => {
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
        class="peer block w-full appearance-none border-0 border-b border-[#FECD45] bg-transparent text-base lg:text-3xl text-gray-200 focus:border-yellow-300 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        onKeyPress$={(e) => {
          if (e.key !== "Enter") return;
          // @ts-ignore
          store.currentValue = "";
          nextQuestion();
        }}
        value={store.currentValue}
        onInput$={(e) => {
          globalStore.data[name] = (e.target as HTMLInputElement).value;
          store.currentValue = (e.target as HTMLInputElement).value; 
        }}
      />
      <label class="absolute translate-y-6 scale-75 transform text-sm lg:text-2xl text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-focus:text-yellow-300 peer-focus:dark:text-yellow-200">
        {label}
      </label>
    </div>
  );
});
