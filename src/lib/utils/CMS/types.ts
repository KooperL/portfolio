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
}

export interface CardGroup extends OrderedContent {
  id: string;
  cards: Card[];
  layout: "horizontal" | "grid";
  columns?: 2 | 3 | 4; // For grid layout
}

export interface HeroText extends OrderedContent {
  title: string;
  subtitle: string;
  buttons?: ButtonGroup;
}

export interface TextBody extends OrderedContent {
  title?: string;
  body: string[];
  buttons?: ButtonGroup;
  button?: Button;
  cards?: CardGroup;
  card?: Card;
}

export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

export interface Card extends OrderedContent {
  title?: string;
  body: string;
  image?: Image;
  button?: Button;
  buttonGroup?: ButtonGroup;
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
}

export interface Form extends OrderedContent {
  id: string;
  title: string;
  fields: FormField[];
  submitButton: Button;
}

// Union type for all possible content types
export type ContentElement =
  | { type: "textBody"; content: TextBody }
  | { type: "card"; content: Card }
  | { type: "form"; content: Form }
  | { type: "embeddedFrame"; content: EmbeddedFrame }
  | { type: "buttonGroup"; content: ButtonGroup };

export interface PageContent extends OrderedContent {
  elements: ContentElement[];
}

export interface Content {
  heroText?: HeroText;
  pageContent: PageContent;
}
