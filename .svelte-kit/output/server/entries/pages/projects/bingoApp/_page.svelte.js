import {
  c as create_ssr_component,
  v as validate_component,
} from "../../../../chunks/ssr.js";
import "../../../../chunks/pocketbase.js";
import { B as Button } from "../../../../chunks/Button.js";
import { C as Card } from "../../../../chunks/Card.js";
import { A as ArrowRightToBracketOutline } from "../../../../chunks/ArrowRightToBracketOutline.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="box-border p-8 w-full h-full">${validate_component(
    Card,
    "Card",
  ).$$render(
    $$result,
    {
      class: "w-full max-w-full h-full bg-white/50",
    },
    {},
    {
      default: () => {
        return `<div class="flex flex-col space-y-4"><span class="text-4xl font-bold" data-svelte-h="svelte-1crtp5g">dropzones.io</span> <div data-svelte-h="svelte-17w46of"><span class="font-bold">Straight up bingo.</span> <div class="h-96 2xl:h-192 md:h-128 border-solid border-3 bg-primary-600 rounded box-border p-1 m-4 flex justify-center items-center" style="max-height: 50vh"><iframe src="https://dropzones.io/sheet/3fv45nzt3gko5us" class="w-full h-full"></iframe></div></div> <div class="flex space-x-4">${validate_component(
          Button,
          "Button",
        ).$$render(
          $$result,
          {
            href: "/projects",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `back`;
            },
          },
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            href: "https://dropzones.io/",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `${validate_component(ArrowRightToBracketOutline, "ArrowRightToBracketOutline").$$render($$result, { class: "w-5 h-5 pr-2" }, {}, {})}visit`;
            },
          },
        )}</div></div>`;
      },
    },
  )}</div>`;
});
export { Page as default };
