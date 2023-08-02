import ButtonRedir from "../ButtonRedir"
import "./style.css"
import { CMSPageResponse } from "./types"
import { State } from "../../types/State"
import ErrorPage from "../../containers/ErrorPage"
import Spinner from "../../components/Spinner"

function TypeLookup(props: State<CMSPageResponse>): JSX.Element {
  console.log(props)
  if (props.loading) return <Spinner />
  if (props.error && props.errorMessage)
    return <ErrorPage error={props.errorMessage} />
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
                        key={`${sectionIndex}-${componentIndex}`}
                      />
                    )
                  case "button-list":
                    return (
                      <div className="button-list" key={`${sectionIndex}-${componentIndex}`}>
                        {component.content.buttons.map((segment, ind) => (
                          <ButtonRedir
                            destination={segment.url}
                            label={segment.text ?? ""}
                            local={segment.local}
                            key={`${sectionIndex}-${componentIndex}-${ind}`}
                          />
                        ))}
                      </div>
                    )
                  case "unordered-list":
                    return (
                      <ul className="unordered-list" key={`${sectionIndex}-${componentIndex}`}>
                        {component.content.items.map(
                          (item: string, index: number) => (
                            <li key={`${sectionIndex}-${componentIndex}-${index}`}>{item}</li>
                          ),
                        )}
                      </ul>
                    )
                  case "text":
                    return (
                      <>
                        {component.content?.title && (
                          <h1 key={`${sectionIndex}-${componentIndex}-1`}>{component.content.title}</h1>
                        )}
                        {component.content?.subtitle && (
                          <h3 key={`${sectionIndex}-${componentIndex}-2`}>{component.content.subtitle}</h3>
                        )}
                        {component.content?.body &&
                          component.content.body.map(
                            (bodyText, bodyTextIndex) => (
                              <p key={`${sectionIndex}-${componentIndex}-${bodyTextIndex + 2}`}>
                                {bodyText}
                              </p>
                            ),
                          )}
                      </>
                    )
                  case "emoji":
                    return (
                      <p className={`type-lookup text ${component.type}`} key={`${sectionIndex}-${componentIndex}`}>
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
  }
  return <></>
}

export default TypeLookup
