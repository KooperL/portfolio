import {
  c as create_ssr_component,
  h as compute_rest_props,
  g as getContext,
  k as spread,
  p as escape_object,
  l as escape_attribute_value,
  e as add_attribute,
} from "./ssr.js"
import { twMerge } from "tailwind-merge"
const ArrowRightToBracketOutline = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, [
      "size",
      "role",
      "strokeLinecap",
      "strokeLinejoin",
      "strokeWidth",
      "ariaLabel",
    ])
    const ctx = getContext("iconCtx") ?? {}
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    }
    let { size = ctx.size || "md" } = $$props
    let { role = ctx.role || "img" } = $$props
    let { strokeLinecap = ctx.strokeLinecap || "round" } = $$props
    let { strokeLinejoin = ctx.strokeLinejoin || "round" } = $$props
    let { strokeWidth = ctx.strokeWidth || "2" } = $$props
    let { ariaLabel = "arrow right to bracket outline" } = $$props
    if ($$props.size === void 0 && $$bindings.size && size !== void 0)
      $$bindings.size(size)
    if ($$props.role === void 0 && $$bindings.role && role !== void 0)
      $$bindings.role(role)
    if (
      $$props.strokeLinecap === void 0 &&
      $$bindings.strokeLinecap &&
      strokeLinecap !== void 0
    )
      $$bindings.strokeLinecap(strokeLinecap)
    if (
      $$props.strokeLinejoin === void 0 &&
      $$bindings.strokeLinejoin &&
      strokeLinejoin !== void 0
    )
      $$bindings.strokeLinejoin(strokeLinejoin)
    if (
      $$props.strokeWidth === void 0 &&
      $$bindings.strokeWidth &&
      strokeWidth !== void 0
    )
      $$bindings.strokeWidth(strokeWidth)
    if (
      $$props.ariaLabel === void 0 &&
      $$bindings.ariaLabel &&
      ariaLabel !== void 0
    )
      $$bindings.ariaLabel(ariaLabel)
    return `<svg${spread(
      [
        { xmlns: "http://www.w3.org/2000/svg" },
        { fill: "none" },
        escape_object($$restProps),
        {
          class: escape_attribute_value(
            twMerge("shrink-0", sizes[size], $$props.class),
          ),
        },
        { role: escape_attribute_value(role) },
        {
          "aria-label": escape_attribute_value(ariaLabel),
        },
        { viewBox: "0 0 16 16" },
      ],
      {},
    )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}${add_attribute("stroke-width", strokeWidth, 0)} d="M4 7.64h11m0 0-4-3.79m4 3.79-4 3.791m-5 2.844H3c-.53 0-1.04-.2-1.414-.556A1.846 1.846 0 0 1 1 12.38V2.902c0-.503.21-.985.586-1.34A2.057 2.057 0 0 1 3 1.007h3"></path></svg> `
  },
)
export { ArrowRightToBracketOutline as A }
