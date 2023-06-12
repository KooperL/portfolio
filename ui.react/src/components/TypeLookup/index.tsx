import ButtonRedir from "../ButtonRedir"
import "./style.css"
import { CMSPage } from "./types"
import { State } from "../../types/State"
import ErrorPage from "../../containers/ErrorPage"
import Spinner from "../../components/Spinner"

function TypeLookup(props: State<CMSPage>): JSX.Element {
  if (props.loading) return <Spinner />
  if (props.error && props.errorMessage)
    return <ErrorPage error={props.errorMessage} />
  // if(props.state.details && seed[0].length && seed[0][0].length) {
  if (props.details) {
    return (
      <div className="type-lookup">
        {props.details.sections.map((section, sectionIndex) => {
          return (
            <div
              className="section"
              key={sectionIndex}
            >
              {section.components.map((component, componentIndex) => {
                switch (component.type) {
                  case "button":
                    return (
                      <ButtonRedir
                        destination={component.content.url}
                        label={component.content.text ?? ""}
                        local={component.content.local}
                      />
                    )
                  case "button-list":
                    return (
                      <div className="button-list">
                        {component.content.buttons.map((segment, ind) => (
                          <ButtonRedir
                            destination={segment.url}
                            label={segment.text ?? ""}
                            local={segment.local}
                            key={`${sectionIndex}-${ind}`}
                          />
                        ))}
                      </div>
                    )
                  case "unordered-list":
                    return (
                      <ul className="unordered-list">
                        {component.content.items.map(
                          (item: string, index: number) => (
                            <li key={`${sectionIndex}-${index}`}>{item}</li>
                          ),
                        )}
                      </ul>
                    )
                  case "text":
                    return (
                      <>
                        {component.content?.title && (
                          <h1>{component.content.title}</h1>
                        )}
                        {component.content?.subtitle && (
                          <h3>{component.content.subtitle}</h3>
                        )}
                        {component.content?.body &&
                          component.content.body.map(
                            (bodyText, bodyTextIndex) => (
                              <p key={`${sectionIndex}-${bodyTextIndex}`}>
                                {bodyText}
                              </p>
                            ),
                          )}
                      </>
                    )
                  case "emoji":
                    return (
                      <p className={`type-lookup text ${component.type}`}>
                        {component.content.emoji}
                      </p>
                    )
                  default:
                    return <></>
                }
              })}
            </div>
          )
        })}
      </div>
    )
  } else {
    return <></>
  }
}

export default TypeLookup
