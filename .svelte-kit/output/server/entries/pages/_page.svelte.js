import {
  c as create_ssr_component,
  v as validate_component,
} from "../../chunks/ssr.js"
import "../../chunks/pocketbase.js"
import { B as Button } from "../../chunks/Button.js"
import { C as Card } from "../../chunks/Card.js"
import { A as ArrowRightToBracketOutline } from "../../chunks/ArrowRightToBracketOutline.js"
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
        return `<div class="flex flex-col space-y-4"><span class="text-4xl font-bold" data-svelte-h="svelte-4tyvej">Welcome to my portfolio</span> <div data-svelte-h="svelte-1ikuy2p"><span class="font-bold">I&#39;m Kooper. Have a poke around and enjoy your visit. Let me know if you like what you see!</span> <span class="hidden md:block">(Try playing around with the plane on the right)</span></div> ${validate_component(
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
              return `Projects`
            },
          },
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            href: "/about",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `About`
            },
          },
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            href: "/contact",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `Contact`
            },
          },
        )} <span class="text-4xl font-bold" data-svelte-h="svelte-1jt5udw">External links</span> ${validate_component(
          Button,
          "Button",
        ).$$render(
          $$result,
          {
            href: "https://github.com/KooperL",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `${validate_component(ArrowRightToBracketOutline, "ArrowRightToBracketOutline").$$render($$result, { class: "w-5 pr-2 h-5" }, {}, {})}GitHub`
            },
          },
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            href: "https://linkedin.com/in/kooper",
            class: "w-48",
            variant: "primary",
          },
          {},
          {
            default: () => {
              return `${validate_component(ArrowRightToBracketOutline, "ArrowRightToBracketOutline").$$render($$result, { class: "w-5 h-5 pr-2" }, {}, {})}LinkedIn`
            },
          },
        )}</div>`
      },
    },
  )}</div>`
})
export { Page as default }
