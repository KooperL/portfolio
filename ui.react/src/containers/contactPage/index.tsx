import { ContactRequestPayload, ContactResponsePayload } from "./types"
import "./style.css"

import { Button } from "../../components/Button"
import { IslandCenter } from "../../templates/IslandCenter"
import TypeLookup from "../../components/TypeLookup"
import { Input } from "../../components/Input"
import { State } from "../../types/State"
import { useContactState } from "../../controllers/useContactState"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import { PageInformation } from "src/containers/context/colourScheme"
import { genericApiDataResponse } from "src/api/shared/types"

interface Props {
  scheme: PageInformation
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    payload: ContactRequestPayload,
  ) => void
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  stateCMS: State<CMSPageResponse>
  POSTstate: State<ContactResponsePayload>
}

function ContactPage(props: Props): JSX.Element {
  function SearchBar() {
    return (
      <div className="search-container">
        <div className="form">
          <form
            onSubmit={e =>
              props.onSubmit(e, {
                session_id: sessionStorage.getItem("session_id") ?? "error",
                message: props.value,
              })
            }
          >
            <div className="inputWithButton">
              <Input
                inputBoxLabel="📝:"
                value={props.value}
                onChange={e => {
                  props.setValue(e.target.value)
                }}
              />
              <div className="submit-button">
                <Button colours={props.scheme} />
                <div className="status">
                  {props.value.length
                    ? props.POSTstate.loading
                      ? "🛫"
                      : props.POSTstate.details
                      ? !props.POSTstate.error
                        ? "✅"
                        : "❌"
                      : "✏️"
                    : "🗒️"}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <IslandCenter>
      <div className="contactPage">
        <div className="container">
          <div className="links">
            <TypeLookup {...props.stateCMS} />
            {SearchBar()}
          </div>
        </div>
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <ContactPage {...useContactState()} />
}

export default Enhance
