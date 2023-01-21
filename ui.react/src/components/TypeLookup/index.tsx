import ButtonRedir from "../ButtonRedir"
import "./style.css"

interface ComponentType {
  type: string
  data: (string | ComponentType)[]
  text?: string
}

function TypeLookup(props: ComponentType): any {
  switch (props.type) {
    case "button":
      return (
        <ButtonRedir
          destination={(props.data as string[])[0]}
          label={props.text ?? ""}
          local={!(props.data as string[])[0].includes("http")}
        />
      )
    case "buttonArr":
      return (
        <div className="type-lookup buttonArr">
          {(props.data as ComponentType[]).map((segment, ind) => (
            <TypeLookup
              key={ind}
              type={segment.type}
              data={segment.data}
              text={segment?.text}
            />
          ))}
        </div>
      )
    case "unorderedList":
      return (
        <ul className={`type-lookup text ${props.type}`}>
          {(props.data as string[]).map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
    case "body":
      return (
        <p className={`type-lookup text ${props.type}`}>
          {(props.data as string[]).map((item: string, index: number) => (
            <span key={index}>{item}</span>
          ))}
        </p>
      )
    case "header":
    case "subheader":
    case "emoji":
      return (
        <p className={`type-lookup text ${props.type}`}>
          {(props.data as string[])[0]}
        </p>
      )
  }
}

export default TypeLookup
