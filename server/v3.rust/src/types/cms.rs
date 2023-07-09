use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct CMSPage {
    pub id: String,
    pub title: String,
    pub slug: String,
    pub sections: Vec<CMSSection>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct CMSSection {
   pub id: String,
   pub title: String,
   pub components: Vec<CMSComponent>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(tag = "type")]
pub enum CMSComponent {
    #[serde(rename = "image")]
    Image {
        content: ImageContent,
    },
    #[serde(rename = "text")]
    Text {
        content: TextContent,
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
    pub title: Option<String>,
    pub subtitle: Option<String>,
    pub body: Option<Vec<String>>,
}

#[derive(Debug, Deserialize, Serialize)]
struct ImageContent {
   pub src: String,
   pub alt: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct ButtonContent {
   pub text: String,
   pub url: String,
   pub local: bool,
}

#[derive(Debug, Deserialize, Serialize)]
struct EmojiContent {
    pub emoji: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct OrderedListContent {
    pub items: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct UnorderedListContent {
    pub items: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct ButtonListContent {
    pub buttons: Vec<ButtonContent>,
}
