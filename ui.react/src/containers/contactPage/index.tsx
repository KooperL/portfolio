import "./style.css"
import { Button } from "../../components/Button"
import { IslandCenter } from "../../templates/IslandCenter"
import TypeLookup from "../../components/TypeLookup"
import { Input } from "../../components/Input"
import { useContactState } from "../../controllers/useContactState"

type t = ReturnType<typeof useContactState>

function ContactPage(props: t): JSX.Element {
  function SearchBar() {
    return (
      <div className="search-container">
        <div className="form">
          <form
            onSubmit={e =>
              props.onSubmit(e, {
                session_id: props.trackingInformation.getSessionKey(),
                message: props.value ?? "",
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
