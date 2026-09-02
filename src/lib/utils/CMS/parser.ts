import type { CmsDocumentObject, CmsNode, CmsDefinitions, CmsEvent } from "./cms";

export interface CmsContext {
  definitions: CmsDefinitions;
  variables: Record<string, any>;
}

export interface ResolvedNode {
  id: string;
  type: string;
  props: Record<string, string>;
  styling?: string;
  events?: CmsEvent[];
  children: ResolvedNode[];
}

/**
 * Substitute {{varName}} patterns in a string with values from the variables context.
 */
function substituteVars(value: string, variables: Record<string, any>): string {
  return value.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    const val = variables[varName];
    if (val === undefined) return match;
    return String(val);
  });
}

/**
 * Resolve a prop value through the definition references and variable substitution.
 * Order: @i18n: → @media: → {{var}} substitution
 */
function resolveValue(value: string, ctx: CmsContext): string {
  let resolved = value;

  if (resolved.startsWith("@i18n:")) {
    const key = resolved.slice("@i18n:".length);
    resolved = ctx.definitions.i18n[key] ?? "";
  } else if (resolved.startsWith("@media:")) {
    const key = resolved.slice("@media:".length);
    const media = ctx.definitions.media[key];
    resolved = media?.ref ?? "";
  }

  resolved = substituteVars(resolved, ctx.variables);
  return resolved;
}

/**
 * Resolve a @styling: reference to a CSS class name.
 */
function resolveStyling(
  styling: string | undefined,
  ctx: CmsContext,
): string | undefined {
  if (!styling) return undefined;

  let resolved = styling;

  if (resolved.startsWith("@styling:")) {
    const rest = resolved.slice("@styling:".length);
    const dotIndex = rest.indexOf(".");
    if (dotIndex !== -1) {
      const key = rest.slice(dotIndex + 1);
      resolved = ctx.definitions.styleClasses[key] ?? "";
    } else {
      resolved = ctx.definitions.styleClasses[rest] ?? "";
    }
  }

  resolved = substituteVars(resolved, ctx.variables);
  return resolved || undefined;
}

/**
 * Resolve a single CMS node into one or more ResolvedNodes.
 * Handles repeat expansion by producing one node per item in the data source.
 */
function resolveNodes(node: CmsNode, ctx: CmsContext): ResolvedNode[] {
  if (node.repeat) {
    const dataSourceMatch = node.repeat.dataSource.match(/^\{\{(\w+)\}\}$/);
    let items: any[] = [];

    if (dataSourceMatch) {
      const varName = dataSourceMatch[1];
      const data = ctx.variables[varName];
      if (Array.isArray(data)) {
        items = data;
      }
    }

    return items.map((item, index) => {
      const itemVars = {
        ...ctx.variables,
        [node.repeat!.itemKey]: item,
        ...(typeof item === "object" && item !== null ? item : {}),
      };
      const itemCtx: CmsContext = { ...ctx, variables: itemVars };

      const resolvedProps: Record<string, string> = {};
      if (node.props) {
        for (const [key, value] of Object.entries(node.props)) {
          resolvedProps[key] = resolveValue(value, itemCtx);
        }
      }

      const resolvedChildren = (node.children ?? []).flatMap((child) =>
        resolveNodes(child, itemCtx),
      );

      return {
        id: `${node.id}-${index}`,
        type: node.type,
        props: resolvedProps,
        styling: resolveStyling(node.styling, itemCtx),
        events: node.events,
        children: resolvedChildren,
      };
    });
  }

  const resolvedProps: Record<string, string> = {};
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      resolvedProps[key] = resolveValue(value, ctx);
    }
  }

  const resolvedChildren = (node.children ?? []).flatMap((child) =>
    resolveNodes(child, ctx),
  );

  return [
    {
      id: node.id,
      type: node.type,
      props: resolvedProps,
      styling: resolveStyling(node.styling, ctx),
      events: node.events,
      children: resolvedChildren,
    },
  ];
}

/**
 * Resolve an entire CMS document with the given variables context.
 */
export function resolveDocument(
  doc: CmsDocumentObject,
  variables: Record<string, any> = {},
): {
  pages: Array<{
    page: CmsDocumentObject["root"][0]["page"];
    children: ResolvedNode[];
  }>;
} {
  const ctx: CmsContext = {
    definitions: doc._definitions,
    variables,
  };

  const pages = doc.root.map((rootNode) => ({
    page: rootNode.page,
    children: rootNode.children.flatMap((child) => resolveNodes(child, ctx)),
  }));

  return { pages };
}
