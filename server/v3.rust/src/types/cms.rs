use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
struct CMSPage {
    id: String,
    title: String,
    slug: String,
    sections: Vec<CMSSection>,
}

#[derive(Debug, Deserialize, Serialize)]
struct CMSSection {
    id: String,
    title: String,
    components: Vec<CMSComponent>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(tag = "type")]
enum CMSComponent {
    #[serde(rename = "text")]
    Text {
        content: TextContent,
    },
    #[serde(rename = "image")]
    Image {
        content: ImageContent,
    },
    #[serde(rename = "text")]
    Text {
        content: TextContent,
    },
    #[serde(rename = "image")]
    Image {
        content: ImageContent,
    },
    #[serde(rename = "button")]
    Button {
        content: ButtonContent,
    },
    #[serde(rename = "emoji")]
    Emoji {
        content: EmojiContent,
    },
    #[serde(rename = "ordered-list")]
    OrderedList {
        content: OrderedListContent,
    },
    #[serde(rename = "unordered-list")]
    UnorderedList {
        content: UnorderedListContent,
    },
    #[serde(rename = "button-list")]
    ButtonList {
        content: ButtonListContent,
    },
}

#[derive(Debug, Deserialize, Serialize)]
struct TextContent {
    title: Option(String),
    subTitle: Option(String),
    body: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct ImageContent {
    src: String,
    alt: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct ButtonContent {
    text: String,
    url: String,
    local: Boolean,
}

#[derive(Debug, Deserialize, Serialize)]
struct EmojiContent {
    emoji: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct OrderedListContent {
    items: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct UnorderedListContent {
    items: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct ButtonListContent {
    buttons: Vec<ButtonListButton>,
}

#[derive(Debug, Deserialize, Serialize)]
struct ButtonListButton {
    text: String,
    url: String,
    color: String,
}
