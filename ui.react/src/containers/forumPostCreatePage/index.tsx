import "./style.css"
import { Button } from "../../components/Button"
import { IslandCenter } from "../../templates/IslandCenter"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { useForumPostCreateState } from "../../controllers/useForumPostCreateState"

type t = ReturnType<typeof useForumPostCreateState>

function ForumPostCreatePage(props: t): JSX.Element {
  return (
    <IslandCenter>
      <div className="forumCreatePage">
        <div className="links">
          <div id="form-container">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Post
            </h2>
            <form
              onSubmit={e =>
                props.handleSubmit(e, {
                  session_id: props.trackingInformation.getSessionKey(),
                  data: {
                    forum_title: props.title,
                    forum_body: props.body,
                  },
                })
              }
            >
              <Input
                label="Title"
                value={props.title}
                onChange={e => {
                  props.setTitle(e.target.value)
                }}
              />
              <Textarea
                label="Body"
                value={props.body}
                onChange={e => {
                  props.setBody(e.target.value)
                }}
                resize="none"
                height="300px"
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
  return <ForumPostCreatePage {...useForumPostCreateState()} />
}

export default Enhance
