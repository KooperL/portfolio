import { c as create_ssr_component, h as compute_rest_props, k as spread, p as escape_object, l as escape_attribute_value, e as add_attribute, g as getContext, v as validate_component, q as escape, u as compute_slots } from "../../../chunks/ssr.js";
import "../../../chunks/pocketbase.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { twMerge } from "tailwind-merge";
import { i as is_void } from "../../../chunks/Frame.js";
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
  let { tag = "div" } = $$props;
  let { show } = $$props;
  let { use = () => {
  } } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  return `${show ? `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelClass;
  let $$restProps = compute_rest_props($$props, ["color", "defaultClass", "show"]);
  let { color = "gray" } = $$props;
  let { defaultClass = "text-sm rtl:text-right font-medium block" } = $$props;
  let { show = true } = $$props;
  let node;
  const colorClasses = {
    gray: "text-gray-900 dark:text-gray-300",
    green: "text-green-700 dark:text-green-500",
    red: "text-red-700 dark:text-red-500",
    disabled: "text-gray-400 dark:text-gray-500"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  {
    {
      color = color;
    }
  }
  labelClass = twMerge(defaultClass, colorClasses[color], $$props.class);
  return `${show ? ` <label${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(labelClass)
      }
    ],
    {}
  )}${add_attribute("this", node, 0)}>${slots.default ? slots.default({}) : ``}</label>` : `${slots.default ? slots.default({}) : ``}`} `;
});
function clampSize(s) {
  return s && s === "xs" ? "sm" : s === "xl" ? "lg" : s;
}
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _size;
  let $$restProps = compute_rest_props($$props, ["type", "value", "size", "defaultClass", "color", "floatClass"]);
  let $$slots = compute_slots(slots);
  let { type = "text" } = $$props;
  let { value = void 0 } = $$props;
  let { size = void 0 } = $$props;
  let { defaultClass = "block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right" } = $$props;
  let { color = "base" } = $$props;
  let { floatClass = "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400" } = $$props;
  const borderClasses = {
    base: "border-gray-300 dark:border-gray-600",
    tinted: "border-gray-300 dark:border-gray-500",
    green: "border-green-500 dark:border-green-400",
    red: "border-red-500 dark:border-red-400"
  };
  const ringClasses = {
    base: "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500",
    green: "focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500",
    red: "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
  };
  const colorClasses = {
    base: "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
    tinted: "bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400",
    green: "bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700",
    red: "bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700"
  };
  let background = getContext("background");
  let group = getContext("group");
  const textSizes = {
    sm: "sm:text-xs",
    md: "text-sm",
    lg: "sm:text-base"
  };
  const leftPadding = { sm: "ps-9", md: "ps-10", lg: "ps-11" };
  const rightPadding = { sm: "pe-9", md: "pe-10", lg: "pe-11" };
  const inputPadding = { sm: "p-2", md: "p-2.5", lg: "p-3" };
  let inputClass;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.floatClass === void 0 && $$bindings.floatClass && floatClass !== void 0)
    $$bindings.floatClass(floatClass);
  _size = size || clampSize(group?.size) || "md";
  {
    {
      const _color = color === "base" && background ? "tinted" : color;
      inputClass = twMerge([
        defaultClass,
        inputPadding[_size],
        $$slots.left && leftPadding[_size] || $$slots.right && rightPadding[_size],
        ringClasses[color],
        colorClasses[_color],
        borderClasses[_color],
        textSizes[_size],
        group || "rounded-lg",
        group && "first:rounded-s-lg last:rounded-e-lg",
        group && "border-s-0 first:border-s last:border-e",
        $$props.class
      ]);
    }
  }
  return `${validate_component(Wrapper, "Wrapper").$$render(
    $$result,
    {
      class: "relative w-full",
      show: $$slots.left || $$slots.right
    },
    {},
    {
      default: () => {
        return `${$$slots.left ? `<div class="${escape(twMerge(floatClass, $$props.classLeft), true) + " start-0 ps-2.5 pointer-events-none"}">${slots.left ? slots.left({}) : ``}</div>` : ``} ${slots.default ? slots.default({
          props: { ...$$restProps, class: inputClass }
        }) : ` <input${spread(
          [
            escape_object($$restProps),
            escape_object({ type }),
            {
              class: escape_attribute_value(inputClass)
            }
          ],
          {}
        )}${add_attribute("value", value, 0)}> `} ${$$slots.right ? `<div class="${escape(twMerge(floatClass, $$props.classRight), true) + " end-0 pe-2.5"}">${slots.right ? slots.right({}) : ``}</div>` : ``}`;
      }
    }
  )} `;
});
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "wrappedClass", "unWrappedClass", "innerWrappedClass"]);
  let $$slots = compute_slots(slots);
  const background = getContext("background");
  let { value = void 0 } = $$props;
  let { wrappedClass = "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0" } = $$props;
  let { unWrappedClass = "p-2.5 text-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500" } = $$props;
  let { innerWrappedClass = "py-2 px-4 bg-white dark:bg-gray-800" } = $$props;
  let wrapped;
  let wrapperClass;
  let textareaClass;
  const headerClass = (header) => twMerge(header ? "border-b" : "border-t", "py-2 px-3 border-gray-200 dark:border-gray-600");
  let innerWrapperClass;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.wrappedClass === void 0 && $$bindings.wrappedClass && wrappedClass !== void 0)
    $$bindings.wrappedClass(wrappedClass);
  if ($$props.unWrappedClass === void 0 && $$bindings.unWrappedClass && unWrappedClass !== void 0)
    $$bindings.unWrappedClass(unWrappedClass);
  if ($$props.innerWrappedClass === void 0 && $$bindings.innerWrappedClass && innerWrappedClass !== void 0)
    $$bindings.innerWrappedClass(innerWrappedClass);
  wrapped = $$slots.header || $$slots.footer;
  wrapperClass = twMerge(
    "w-full rounded-lg",
    background ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700",
    "text-gray-900 dark:placeholder-gray-400 dark:text-white ",
    "border border-gray-200 dark:border-gray-600",
    $$props.class
  );
  textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);
  innerWrapperClass = twMerge(innerWrappedClass, $$slots.footer ? "" : "rounded-b-lg", $$slots.header ? "" : "rounded-t-lg");
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: wrapperClass }, {}, {
    default: () => {
      return `${$$slots.header ? `<div${add_attribute("class", headerClass(true), 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} ${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: innerWrapperClass }, {}, {
        default: () => {
          return `<textarea${spread(
            [
              escape_object($$restProps),
              {
                class: escape_attribute_value(textareaClass)
              }
            ],
            {}
          )}>${escape(value || "")}</textarea>`;
        }
      })} ${$$slots.footer ? `<div${add_attribute("class", headerClass(false), 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
    }
  })} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let email = "";
  let message = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="box-border p-8 w-full h-full">${validate_component(Card, "Card").$$render(
      $$result,
      {
        class: "w-full max-w-full h-full bg-white/50"
      },
      {},
      {
        default: () => {
          return `<div class="flex flex-col space-y-4"><span class="text-4xl font-bold" data-svelte-h="svelte-hk2y0w">Contact me</span> <form><div class="flex flex-col space-y-4"><div>${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
            default: () => {
              return `Name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "text",
              id: "name",
              name: "name",
              required: true,
              value: name
            },
            {
              value: ($$value) => {
                name = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
            default: () => {
              return `Email (optional)`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "email",
              id: "email",
              name: "email",
              value: email
            },
            {
              value: ($$value) => {
                email = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "message" }, {}, {
            default: () => {
              return `Message`;
            }
          })} ${validate_component(Textarea, "Textarea").$$render(
            $$result,
            {
              id: "message",
              name: "message",
              class: "bg-gray-50 dark:bg-gray-600",
              required: true,
              value: message
            },
            {
              value: ($$value) => {
                message = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div>${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-48" }, {}, {
            default: () => {
              return `Send`;
            }
          })}</div></div></form></div>`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
