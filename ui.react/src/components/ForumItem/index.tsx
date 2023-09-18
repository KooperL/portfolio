import { forumPath, routes } from "src/containers/App/types"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ForumItemType } from "src/api/clients/forumHandler/types"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import daysAgo from "../../utils/daysAgo"
import "./style.css"
import { useMonitor } from "src/hooks/useMonitor"

export default function ForumItem(props: { data: ForumItemType }) {
  const [scheme, setScheme] = useContext(SchemeContext)

  return (
    <Link
      to={`/${forumPath}/${routes.forumPostView}/${props.data["id"]}`}
      onClick={useMonitor}
    >
      <div
        className="post-details"
        style={{ borderColor: scheme.body.foreground }}
      >
        <div className="icon">
          <p>{props.data["views"]} 👀</p>
        </div>
        <div className="post-info">
          <div className="title">{props.data["title"]}</div>
          <div className="sub-title">
            <span>By</span>
            <span style={{ color: scheme.body.h1 }}>
              &nbsp;{props.data["author"]}
            </span>
            <span>&nbsp;- {daysAgo(props.data["date"])}</span>
            {props.data.hasOwnProperty("category") ? (
              <span>&nbsp;To {props.data["category"]}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="preview">{props.data["body"]}</div>
        </div>
      </div>
    </Link>
  )
}
