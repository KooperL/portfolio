import { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogRouteType } from "../../containers/App/routeTypes";
import { forumItem } from "../../containers/common/types";
import { SchemeContext } from "../../containers/context/colourScheme";
import daysAgo from "../../utils/daysAgo";
import './style.css'


function BlogItem(props: {data: forumItem}) {
  const [scheme, setScheme] = useContext(SchemeContext);

  return (
    <Link to={`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogPost}/${props.data['id']}`}>
      <div className="post-details" style={{borderColor: scheme.body.foreground}}>
        <div className="icon">
          <p>{props.data['views']} 👀</p>
        </div>
        <div className="post-info">
          <div className="title">
            {props.data['title']}
          </div>
          <div className="sub-title">
            <span>By</span>
            <span style={{color: scheme.body.h1}}>&nbsp;{props.data['author']}</span>
            <span>&nbsp;- {daysAgo(props.data['date'])}</span>
            {props.data.hasOwnProperty('category') ? <span>&nbsp;To {props.data['category']}</span> : <></>}
          </div>
          <div className="preview">
            {props.data['body']}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem;