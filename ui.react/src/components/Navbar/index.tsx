
import { useContext, useEffect, useState } from 'react';
import { SchemeContext } from '../../containers/context/colourScheme';
import './style.css';
import { Link } from "react-router-dom";
import ButtonRedir from '../ButtonRedir'
import { useLocation } from 'react-router-dom'
import { useAccessToken } from '../../containers/authContext/context';
import { blogPath } from '../../containers/App/api/types';
import { BlogRouteType } from '../../containers/App/routeTypes';

// style="width: 100000px; transform: translateX(-3561px); animation: 12.9416s linear 0s infinite normal none running marqueeAnimation-77345020;"

function getPath() {
  return window.location.pathname.split('/').filter(item => item)
}

function Navbar(props: {isVertical: boolean}) {
  const [scheme, setScheme] = useContext(SchemeContext);
  const [path, setPath] = useState(getPath())
  const [token, setToken] = useAccessToken();
  const [specialButtons, setSpecialButtons] = useState<Array<JSX.Element>>([]); 

  const location = useLocation()

  let bannerText = [];
  // window.innerHeight window.innerWidth
  for (let i=0; i<(props.isVertical? 15 : 21); i++) {
    if(i%2===0) {
      bannerText.push(<div key={i} style={{"color": scheme.header.text}}>kooperlingohr.com/</div>)
    } else {
      bannerText.push(<div  key={i} className='' style={{"color": scheme.header.background}}>-------</div>)
    }
  }

  useEffect(() => {
    const pathTemp = getPath()
    setPath(pathTemp)
    if(pathTemp[0] && pathTemp[0].toLowerCase() === 'blog') {
      if(token === '') {
      } else if(token === null) {
        // No user
        // Should already be redirected to login/register page
      } else {
        // Signed in
        // Sign out button
        const username = JSON.parse(atob(token.split('.')[1]))['username']
        const blog_create = <ButtonRedir destination={`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogPostCreate}`} label='create' local={true} />
        const blog_profile = <ButtonRedir destination={`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogUser}/${username}`} label='My posts' local={true} />
        const blog_sign_out = <ButtonRedir destination={`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogPostCreate}`} label='Log out' local={true} />
  
        // Search field?
        setSpecialButtons([blog_create, blog_profile, blog_sign_out])
      }
    }
  }, [location])

  const home = <ButtonRedir  destination='/' label='Home ⬅️' local={true} />
  const back = <ButtonRedir destination={path[0]} label={`${path[0] ?? '/'} ⬅️` ?? ''} local={true} />

  return (
    <div className="navbar">
      <nav
        className={`nav-container ${props.isVertical?'vertical': ''}`}
        style={{"backgroundColor": scheme.header.background, zIndex: props.isVertical ? 1 : 11}}
      >
        <div className="nav-row">
          <div className='buttons-container'>
              {!!path.length?(!props.isVertical ? home : ''):''}
              {path.length >= 2?(!props.isVertical ? back : ''):''}
          </div>
          <div className='tech-slideshow'>
            <div className='mover-1 text' style={{height: '100%'}}>
              {bannerText.map(jsx => jsx)}
            </div>
          </div>
          <div className='buttons-container'>
            {specialButtons}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;