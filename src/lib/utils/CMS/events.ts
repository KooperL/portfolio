import type { CmsEvent } from "./cms";

/**
 * A handler invoked when a CMS node dispatches a Function-typed event.
 * Receives the event's params after pattern substitution (e.g. {{event.value}} → actual value).
 */
export type FunctionHandler = (params: Record<string, string>) => void;

/**
 * Registry mapping function names (as declared in CMS event definitions) to their implementations.
 */
export type FunctionRegistry = Record<string, FunctionHandler>;

/**
 * Runtime context supplied when dispatching events.
 * The `event` key holds payload data (e.g. { value: "typed text" }) that event param
 * patterns like {{event.value}} resolve against.
 */
export interface EventContext {
  event: Record<string, string>;
}

/**
 * Resolve {{dotted.path}} patterns in a string against a context object.
 * Supports nested lookups: {{event.value}} walks ctx.event.value.
 * Unresolvable patterns are left intact.
 */
function resolvePatterns(value: string, ctx: EventContext): string {
  return value.replace(/\{\{([\w.]+)\}\}/g, (match, path: string) => {
    const parts = path.split(".");
    let current: unknown = ctx;
    for (const part of parts) {
      if (current == null || typeof current !== "object") return match;
      current = (current as Record<string, unknown>)[part];
    }
    return current === undefined ? match : String(current);
  });
}

/**
 * Dispatch an array of CMS events against the provided runtime context and function registry.
 *
 * Only events with type === "Function" and a registered name are executed.
 * Event param patterns (e.g. {{event.value}}) are resolved before the handler is called.
 */
export function dispatchEvents(
  events: CmsEvent[] | undefined,
  eventContext: EventContext,
  functions: FunctionRegistry,
): void {
  if (!events) return;

  for (const evt of events) {
    if (evt.type !== "Function" || !evt.name) continue;

    const handler = functions[evt.name];
    if (!handler) {
      console.warn(`[cms:events] No registered function for event "${evt.name}"`);
      continue;
    }

    const resolvedParams: Record<string, string> = {};
    if (evt.params) {
      for (const [key, value] of Object.entries(evt.params)) {
        resolvedParams[key] = resolvePatterns(value, eventContext);
      }
    }

    handler(resolvedParams);
  }
}
