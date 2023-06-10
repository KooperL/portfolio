export interface CMSPage {
  id: string
  title: string
  slug: string
  sections: CMSSection[]
}

interface CMSSection {
  id: string
  title: string
  components: (
    | ImageComponent
    | TextComponent
    | ButtonListComponent
    | UnorderedListComponent
    | OrderedListComponent
    | EmojiComponent
    | ButtonComponent
  )[]
}

interface ImageComponent {
  type: "image"
  content: {
    src: string
    alt: string
  }
}
interface TextComponent {
  type: "text"
  content: {
    title?: string
    subTitle?: string
    body?: string[]
  }
}
interface ButtonListComponent {
  type: "button-list"
  content: {
    buttons: ButtonActual[]
  }
}
interface UnorderedListComponent {
  type: "unordered-list"
  content: {
    items: string[]
  }
}
interface OrderedListComponent {
  type: "ordered-list"
  content: {
    items: string[]
  }
}
interface EmojiComponent {
  type: "emoji"
  content: {
    emoji: string
  }
}
interface ButtonComponent {
  type: "button"
  content: ButtonActual
}

interface ButtonActual {
  text: string
  url: string
  local: boolean
}
