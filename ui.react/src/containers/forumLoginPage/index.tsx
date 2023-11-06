import './style.css'
import { Button } from '../../components/Button'
import { IslandCenter } from '../../templates/IslandCenter'
import { Input } from '../../components/Input'
import Modal from '../../components/Modal'
import { termsAndConditions } from '../../assets/TermsAndConditions'
import { useForumLoginState } from '../../controllers/useForumLoginState'

type t = ReturnType<typeof useForumLoginState>

function ForumLoginPage(props: t): JSX.Element {
  const tnc = termsAndConditions()
  return (
    <IslandCenter>
      <div className="forumLoginPage">
        <div className="links">
          <div id="register">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Register
            </h2>
            <form
              onSubmit={e =>
                props.handleSubmitRegister(e, {
                  session_id: props.trackingInformation.getSessionKey(),
                })
              }
            >
              <Input
                label="Username: "
                value={props.usernameRegister}
                readOnly={true}
                onChange={e => {
                  e.target.value = props.usernameRegister
                }}
              />
              <Input
                label="Password: "
                value={props.passwordRegister}
                readOnly={true}
                onChange={e => {
                  e.target.value = props.passwordRegister
                }}
              />
              <div id="button">
                <Button
                  colours={props.scheme}
                  action="submit"
                />
                {/* <Modal
                  closedChildren={
                    <Button
                      colours={props.scheme}
                      action="button"
                    />
                  }
                >
                  <div className="modal-children">
                    <div>
                      {Object.keys(tnc).map(section => (
                        <div key={section}>
                          <h3>{section}</h3>
                          {Object.keys(tnc[section]).map((text, ind) => (
                            <p key={text}>{`${tnc[section][ind]}`}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                    <Button
                      colours={props.scheme}
                      label="I agree"
                      action="submit"
                      callBack={() => {}}
                    />
                  </div>
                </Modal> */}
              </div>
            </form>
          </div>

          <div id="login">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Login
            </h2>
            <form
              onSubmit={e =>
                props.handleSubmitLogin(e, {
                  session_id: props.trackingInformation.getSessionKey(),
                })
              }
            >
              <Input
                label="Username: "
                value={props.usernameLogin}
                autoComplete="username email"
                onChange={e => {
                  props.setUsernameLogin(e.target.value)
                }}
              />
              <Input
                label="Password: "
                value={props.passwordLogin}
                autoComplete="new-password"
                onChange={e => {
                  props.setPasswordLogin(e.target.value)
                }}
              />
              <div id="button">
                <Button colours={props.scheme} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <ForumLoginPage {...useForumLoginState()} />
}

export default Enhance
