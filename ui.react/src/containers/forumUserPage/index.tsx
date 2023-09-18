import Spinner from "../../components/Spinner"
import Navbar from "../../components/Navbar"
import "./style.css"
import ForumItem from "../../components/ForumItem"
import ErrorPage from "../ErrorPage"
import { useForumUserState } from "../../controllers/useForumUserState"
import { IslandCenter } from "../../templates/IslandCenter"
import { ForumUserResponsePayload } from "src/api/clients/forumHandler/routes/fetchForumUser/types"

type t = ReturnType<typeof useForumUserState>

function ForumHomePage(props: t): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (
    props.state.error &&
    props.state.errorMessage &&
    !props.state.details?.data
  )
    return (
      <ErrorPage
        errorMessage={props.state.errorMessage}
        errorType="NETWORK"
      />
    )
  if (props.state.details) {
    const data = props.state.details.data as ForumUserResponsePayload[]
    return (
      <IslandCenter>
        <div className="forumUserPage">
          {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
          {/* <div className="container"> */}
          <div className="links">
            <span className="main-heading">User -&nbsp;</span>
            <span
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              {props.user}
            </span>
            <div className="posts">
              {data.map((catPost, catPostIndex) => (
                <ForumItem
                  key={catPostIndex}
                  data={catPost}
                />
              )) ?? <>No Posts</>}
            </div>
            {/* </div> */}
          </div>
        </div>
      </IslandCenter>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <ForumHomePage {...useForumUserState()} />
}

export default Enhance
