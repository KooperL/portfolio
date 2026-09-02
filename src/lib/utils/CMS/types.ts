// New CMS schema types

export interface Meta {
  id: string;
  author?: string;
  description?: string;
  revisions: { major: number; minor: number };
}

export interface MediaRef {
  kind: "icon" | "image";
  source: "bundled" | "remote";
  ref: string;
  resizeMode?: string;
  fallback?: string;
}

export interface Definitions {
  tokens: Record<string, string | number>;
  i18n: Record<string, string>;
  media: Record<string, MediaRef>;
  styleClasses: Record<string, string>;
}

export interface RuntimeSchema {
  description?: string;
  shape: Record<string, string>;
}

export interface Styling {
  styleClass?: string;
  tokens?: Record<string, string | number>;
}

export interface CMSEvent {
  type: string;
  action: string;
  name?: string;
  params?: Record<string, unknown>;
}

export interface Gate {
  allOf?: string[];
  not?: string[];
  eval?: string;
}

export interface TextValue {
  value: string;
  fallback?: string;
}

export interface Repeat {
  dataSource: string;
  itemKey: string;
  template: CMSNode;
}

export interface CMSNode {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  text?: TextValue;
  field?: string;
  styling?: Styling;
  events?: CMSEvent[];
  children?: CMSNode[];
  repeat?: Repeat;
  gate?: Gate;
}

export interface PageDef {
  slug: string;
  title: string;
  description: string;
}

export interface CMSDocument {
  _meta: Meta;
  _definitions: Definitions;
  _runtimeSchema?: RuntimeSchema;
  layout: string;
  page: PageDef;
  children: CMSNode[];
}

// Legacy types for backward compatibility with existing CMS components
export interface OrderedContent {
  order: number;
}

export interface ButtonEvent {
  name: string;
  payload?: Record<string, unknown[]>;
}

export interface Button {
  id: string;
  label: string;
  href: string;
  disabled?: boolean;
  icon?: string;
  testId?: string;
  events?: ButtonEvent[];
}

export interface ButtonGroup extends OrderedContent {
  id: string;
  buttons: Button[];
  layout?: "horizontal" | "vertical";
  alignment?: "left" | "center" | "right";
}

export interface CardGroup extends OrderedContent {
  id: string;
  cards: Card[];
  layout: "horizontal" | "grid";
  columns?: 2 | 3 | 4;
  horizontal?: boolean;
}

export interface ImageGroup extends OrderedContent {
  id: string;
  images: Image[];
  layout: "horizontal" | "grid";
  columns?: 2 | 3 | 4;
}

export interface HeroText extends OrderedContent {
  title: string;
  subtitle: string;
  buttons?: ButtonGroup;
  backgroundImage?: string;
  size?: "small" | "medium";
  alignment?: "left" | "center";
}

export interface PageMetadata {
  title: string;
  description: string;
  headline: string;
}

export interface TextBody extends OrderedContent {
  title?: string;
  body: string[];
  buttons?: ButtonGroup;
  button?: Button;
  cards?: CardGroup;
  card?: Card;
  images?: ImageGroup[];
  align?: "left" | "center" | "right";
}

export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  caption?: string;
}

export interface Card extends OrderedContent {
  title?: string;
  body: string;
  image?: Image;
  button?: Button;
  buttonGroup?: ButtonGroup;
  variant?: "default" | "featured" | "minimal";
}

export interface EmbeddedFrame extends OrderedContent {
  url: string;
  title: string;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required: boolean;
  binding?: Record<"bind", string>;
}

export interface Form extends OrderedContent {
  id: string;
  fields: FormField[];
  bindings?: Record<string, Record<"bind", string>>;
  submitButton: Button;
}
