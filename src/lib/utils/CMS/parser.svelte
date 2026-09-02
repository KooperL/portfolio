<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import HeroSection from "$lib/components/CMS/CMSHeroSection.svelte";
  import TextBodyComponent from "$lib/components/CMS/CMSTextBody.svelte";
  import CardComponent from "$lib/components/CMS/CMSCard.svelte";
  import FormComponent from "$lib/components/CMS/CMSForm.svelte";
  import EmbeddedFrameComponent from "$lib/components/CMS/CMSEmbeddedFrame.svelte";
  import ButtonComponent from "$lib/components/CMS/CMSButton.svelte";
  import type { CMSDocument, CMSNode, Definitions } from "$lib/utils/CMS/types";
  import { metadata } from "$lib/app/stores";

  export let content: string | CMSDocument;
  export let loading = false;
  export let functions: Record<string, Function> = {};
  export let runtime: Record<string, unknown> = {};

  let parsedContent: CMSDocument | null = null;
  let error: string | null = null;

  function resolveRef(
    value: unknown,
    defs: Definitions,
    ctx: Record<string, unknown>,
  ): unknown {
    if (typeof value !== "string") return value;

    if (value.startsWith("@i18n:")) {
      return defs.i18n[value.slice(6)] ?? value;
    }
    if (value.startsWith("@token:")) {
      return defs.tokens[value.slice(7)] ?? value;
    }
    if (value.startsWith("@media:")) {
      return defs.media[value.slice(7)] ?? null;
    }
    if (value.startsWith("@class:")) {
      return defs.styleClasses[value.slice(7)] ?? value;
    }
    if (value.startsWith("{{") && value.endsWith("}}")) {
      const path = value.slice(2, -2);
      let result: unknown = ctx;
      for (const part of path.split(".")) {
        if (
          result &&
          typeof result === "object" &&
          part in (result as Record<string, unknown>)
        ) {
          result = (result as Record<string, unknown>)[part];
        } else {
          return value;
        }
      }
      return result;
    }
    return value;
  }

  function resolveProps(
    props: Record<string, unknown> | undefined,
    defs: Definitions,
    ctx: Record<string, unknown>,
  ): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    if (!props) return out;
    for (const [k, v] of Object.entries(props)) {
      out[k] = resolveRef(v, defs, ctx);
    }
    return out;
  }

  function resolveEvents(
    events: CMSNode["events"],
    defs: Definitions,
    ctx: Record<string, unknown>,
  ) {
    if (!events || events.length === 0) return [];
    return events.map((e) => {
      const params: Record<string, unknown> = {};
      if (e.params) {
        for (const [k, v] of Object.entries(e.params)) {
          params[k] = resolveRef(v, defs, ctx);
        }
      }
      return {
        ...e,
        params,
      };
    });
  }

  function checkGate(
    gate: CMSNode["gate"],
    ctx: Record<string, unknown>,
  ): boolean {
    if (!gate) return true;
    if (gate.allOf) {
      for (const flag of gate.allOf) {
        if (!ctx[flag]) return false;
      }
    }
    if (gate.not) {
      for (const flag of gate.not) {
        if (ctx[flag]) return false;
      }
    }
    return true;
  }

  function validateContent(doc: CMSDocument): boolean {
    try {
      if (!doc._meta || !doc._definitions || !doc.page) {
        throw new Error("Invalid CMS document structure");
      }
      if (!Array.isArray(doc.children)) {
        throw new Error("Invalid children array");
      }
      return true;
    } catch (err: any) {
      error = err.message;
      return false;
    }
  }

  function parseContent() {
    try {
      if (typeof content === "string") {
        parsedContent = JSON.parse(content);
      } else {
        parsedContent = content;
      }
      if (!validateContent(parsedContent as CMSDocument)) {
        parsedContent = null;
      }
      if (parsedContent?.page) {
        const { title, description } = parsedContent.page;
        metadata.update((m) => {
          m.title = title;
          m.description = description;
          m.headline = title;
          return m;
        });
      }
    } catch (err) {
      error = "Failed to parse content";
      parsedContent = null;
    }
  }

  $: if (content) {
    error = null;
    parseContent();
  }

  // Pre-resolve all nodes for rendering
  interface ResolvedNode {
    node: CMSNode;
    props: Record<string, unknown>;
    visible: boolean;
    children?: ResolvedNode[];
    repeatItems?: Array<{ item: unknown; props: Record<string, unknown>; events: any[] }>;
    events: any[];
  }

  function resolveNodeTree(
    nodes: CMSNode[],
    defs: Definitions,
    ctx: Record<string, unknown>,
  ): ResolvedNode[] {
    return nodes.map((n) => {
      const resolved: ResolvedNode = {
        node: n,
        props: resolveProps(n.props, defs, ctx),
        visible: checkGate(n.gate, ctx),
        events: resolveEvents(n.events, defs, ctx),
      };

      if (n.children && n.children.length > 0) {
        resolved.children = resolveNodeTree(n.children, defs, ctx);
      }

      if (n.repeat) {
        const ds = resolveRef(n.repeat.dataSource, defs, ctx);
        if (Array.isArray(ds)) {
          resolved.repeatItems = ds.map((item) => ({
            item,
            props: resolveProps(n.repeat!.template.props, defs, {
              ...ctx,
              item,
            }),
            events: resolveEvents(n.repeat!.template.events, defs, {
              ...ctx,
              item,
            }),
          }));
        }
      }

      return resolved;
    });
  }

  // Helper functions to safely extract string values from props
  function str(val: unknown, fallback: string = ""): string {
    return typeof val === "string" ? val : fallback;
  }

  function strArr(val: unknown): string[] {
    return Array.isArray(val) ? val.filter((v) => typeof v === "string") : [];
  }

  $: defs = parsedContent?._definitions;
  $: resolvedChildren =
    parsedContent && defs
      ? resolveNodeTree(parsedContent.children, defs, runtime)
      : [];
</script>

{#if loading}
  <div class="flex justify-center items-center min-h-[200px]">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
    ></div>
  </div>
{:else if error}
  <Alert color="red" class="mb-4">
    <span class="font-medium">Error:</span>
    {error}
  </Alert>
{:else if parsedContent && defs}
  {#each resolvedChildren as { node, props, visible, children, repeatItems, events }}
    {#if visible}
      <section class="mb-8 h-fit">
        {#if node.type === "hero"}
          <HeroSection
            title={str(props.title)}
            subtitle={str(props.subtitle)}
            backgroundImage={str(props.backgroundImage)}
            testId={str(props.testID)}
            {events}
            {functions}
          />
          {#if children}
            <div class="mt-4 flex flex-wrap gap-2 justify-center">
              {#each children as child}
                {#if child.visible && child.node.type === "button"}
                  <ButtonComponent
                    id={child.node.id}
                    label={str(child.props.title || child.props.label)}
                    href={str(child.props.href)}
                    testId={str(child.props.testID)}
                    icon={str(child.props.icon)}
                    events={child.events}
                    {functions}
                  />
                {/if}
              {/each}
            </div>
          {/if}
        {:else if node.type === "text"}
          <div class="py-2 px-2 mx-auto max-w-screen-xl lg:px-12">
            <p>{str(props.text || props.value)}</p>
          </div>
        {:else if node.type === "button"}
          <div class="py-2 px-2 mx-auto max-w-screen-xl lg:px-12">
            <ButtonComponent
              id={node.id}
              label={str(props.title || props.label)}
              href={str(props.href)}
              testId={str(props.testID)}
              icon={str(props.icon)}
              {events}
              {functions}
            />
          </div>
        {:else if node.type === "card"}
          <CardComponent
            title={str(props.title)}
            body={str(props.subtitle || props.body)}
            testId={str(props.testID)}
            {events}
            {functions}
          />
        {:else if node.type === "container"}
          <TextBodyComponent
            title={str(props.title)}
            body={props.subtitle
              ? [str(props.subtitle)]
              : props.body
                ? strArr(props.body)
                : []}
          />
          {#if children}
            <div class="mt-4 space-y-4">
              {#each children as child}
                {#if child.visible}
                  {#if child.node.type === "text"}
                    <div class="py-2 px-2 mx-auto max-w-screen-xl lg:px-12">
                      <p>{str(child.props.text || child.props.value)}</p>
                    </div>
                  {:else if child.node.type === "button"}
                    <ButtonComponent
                      id={child.node.id}
                      label={str(child.props.title || child.props.label)}
                      href={str(child.props.href)}
                      testId={str(child.props.testID)}
                      icon={str(child.props.icon)}
                      events={child.events}
                      {functions}
                    />
                  {:else if child.node.type === "card"}
                    <CardComponent
                      title={str(child.props.title)}
                      body={str(child.props.subtitle || child.props.body)}
                      testId={str(child.props.testID)}
                      events={child.events}
                      {functions}
                    />
                  {:else if child.node.type === "embeddedFrame"}
                    <EmbeddedFrameComponent url={str(child.props.url)} />
                  {:else if child.node.type === "input"}
                    <input
                      type="text"
                      placeholder={str(child.props.placeholder)}
                      class="w-full p-2 border rounded"
                    />
                  {:else if child.node.type === "grid" && child.repeatItems}
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {#each child.repeatItems as repeatItem}
                        <CardComponent
                          title={str(repeatItem.props.title)}
                          body={str(
                            repeatItem.props.subtitle || repeatItem.props.body,
                          )}
                          events={repeatItem.events}
                          {functions}
                        />
                      {/each}
                    </div>
                  {:else}
                    <Alert color="yellow"
                      >Unknown child type: {child.node.type}</Alert
                    >
                  {/if}
                {/if}
              {/each}
            </div>
          {/if}
          {#if props.footer}
            <p class="mt-2 text-sm text-gray-500">{str(props.footer)}</p>
          {/if}
        {:else if node.type === "embeddedFrame"}
          <EmbeddedFrameComponent url={str(props.url)} />
        {:else if node.type === "form"}
          <FormComponent
            fields={props.fields}
            submitButton={props.submitButton}
            {events}
            {functions}
          />
        {:else}
          <Alert color="yellow">Unknown node type: {node.type}</Alert>
        {/if}
      </section>
    {/if}
  {/each}
{/if}
