import {
  c as create_ssr_component,
  v as validate_component,
} from "../../../chunks/ssr.js"
import "../../../chunks/pocketbase.js"
import { B as Button } from "../../../chunks/Button.js"
import { C as Card } from "../../../chunks/Card.js"
import { A as ArrowRightToBracketOutline } from "../../../chunks/ArrowRightToBracketOutline.js"
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
        return `<div class="flex flex-col space-y-4"><span class="text-4xl font-bold" data-svelte-h="svelte-qomhdo">Published sites</span> ${validate_component(
          Button,
          "Button",
        ).$$render(
          $$result,
          {
            href: "/projects/bingoApp",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `dropzones`
            },
          },
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            href: "/projects/pento",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `pento`
            },
          },
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            href: "/projects/vybs",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `vybs`
            },
          },
        )} <span class="text-4xl font-bold" data-svelte-h="svelte-1fh6nt2">My projects</span> ${validate_component(
          Button,
          "Button",
        ).$$render(
          $$result,
          {
            href: "https://github.com/KooperL/svelte-pocketbase-quickstart",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `${validate_component(ArrowRightToBracketOutline, "ArrowRightToBracketOutline").$$render($$result, { class: "w-5 pr-2 h-5" }, {}, {})}<span class="text-xxs" data-svelte-h="svelte-72kvfv">svelte-pocketbase-quickstart</span>`
            },
          },
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            href: "https://github.com/KooperL/mdApp",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `${validate_component(ArrowRightToBracketOutline, "ArrowRightToBracketOutline").$$render($$result, { class: "w-5 h-5 pr-2" }, {}, {})}mdApp`
            },
          },
        )}</div>`
      },
    },
  )}</div>`
})
export { Page as default }
