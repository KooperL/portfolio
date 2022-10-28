import { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogRouteType } from "../../containers/App/routeTypes";
import { blogItem } from "../../containers/blogLoginPage/types";
import { SchemeContext } from "../../containers/context/colourScheme";
import './style.css'


function BlogItem(props: {data: blogItem}) {
  const [scheme, setScheme] = useContext(SchemeContext);

  return (
    <Link to={`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogPost}/${props.data['id']}`}>
      <div className="post-details">
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
            <span>&nbsp;- {props.data['date']}</span>
            {props.data.hasOwnProperty('category') ? <span>To {props.data['category']}</span> : <></>}
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