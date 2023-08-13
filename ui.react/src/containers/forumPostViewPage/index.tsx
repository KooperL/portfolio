import Spinner from "../../components/Spinner"
import "./style.css"
import daysAgo from "../../utils/daysAgo"
import { IslandCenter } from "../../templates/IslandCenter"
import { useForumPostViewState } from "../../controllers/useForumPostViewState"

type t = ReturnType<typeof useForumPostViewState>

function ForumPostViewPage(props: t): JSX.Element {
  if (props.GETstate.loading) {
    return <Spinner />
  }
  if (props.GETstate.error) {
    return <div>{JSON.stringify(props.GETstate.errorMessage)}</div>
  }
  const data = props.GETstate.details!.data
  return (
    <IslandCenter>
      <div className="forumPostViewPage">
        <div className="links">
          <div id="form-container">
            <div id="post">
              <div className="row">
                <p>Posted to:&nbsp;</p>
                <p>{data?.category}</p>
                <p>,&nbsp;</p>
                <p>{daysAgo(data?.date ?? "0")}</p>
              </div>
              <div className="title">
                <p className="field">{data?.title}</p>
              </div>
              <div className="metadata">
                <div className="row">
                  <p>By:&nbsp;</p>
                  <p style={{ color: props.scheme.body.h1 }}>{data?.author}</p>
                </div>
                <div className="row">
                  <p>{data?.views}</p>
                  <p>&nbsp;view(s)</p>
                </div>
              </div>
              <div
                className="body"
                style={{ borderColor: props.scheme.body.foreground }}
              >
                <p className="field">{data?.body}</p>
              </div>
              {/* <div id="button">
                <Button colours={scheme} />
              </div> */}
              {/* <form onSubmit={((e) => handleSubmit(e, {
                session_id: props.trackingInformation.getSessionKey(),
                data: {
                  forum_title: title,
                  forum_body: body
                }
              }))}>
            </form> */}
            </div>
          </div>
        </div>
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <ForumPostViewPage {...useForumPostViewState()} />
}

export default Enhance
