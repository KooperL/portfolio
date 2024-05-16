import {
  c as create_ssr_component,
  v as validate_component,
} from "../../../chunks/ssr.js"
import { C as Card } from "../../../chunks/Card.js"
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
        return `<div class="flex flex-col space-y-4 overflow-scroll" style="scrollbar-width: none;" data-svelte-h="svelte-7570lo"><span class="text-4xl font-bold">About me</span> <div><span class="font-bold">I&#39;m Kooper. We might have met already but I can&#39;t remember - I didn&#39;t want to annoy you with cookies.</span> <span class="md:block font-bold">I&#39;m a software developer and I like to make things. I wear the hat of web developer most often but I&#39;ve also dabbled in other areas of software development.</span></div> <div><span class="md:block font-bold">Continuous growth is important to me and I&#39;m always looking for new things to learn. From new frameworks and different programming languages, to biology and physiology.</span> <span class="md:block font-bold">There&#39;s a reason why I&#39;m a fan of the web. I get inspired by other websites who try to be different and love that anyone can contribute their ideas to the internet via weird websites, awesome toolkits/libraries and open source.</span></div></div>`
      },
    },
  )}</div>`
})
export { Page as default }
