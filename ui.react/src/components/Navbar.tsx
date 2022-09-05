
import { useContext } from 'react';
import { SchemeContext } from '../containers/context/colourScheme';
import './test.css';

// style="width: 100000px; transform: translateX(-3561px); animation: 12.9416s linear 0s infinite normal none running marqueeAnimation-77345020;"

function Navbar(props: {isVertical: boolean}) {
  const [scheme, setScheme] = useContext(SchemeContext);

  const home = <a className='px-5 hover:bg-gray-600 flex justify-center items-center' href='/' style={{height: '100%'}}>Home 🏠</a>
  let bannerText = [];
  // window.innerHeight window.innerWidth
  for (let i=0; i<(props.isVertical?20:21); i++) {
    if(i%2===0) {
      bannerText.push(<div key={i} style={{"color": scheme.header.text}}>kooperlingohr.com/</div>)
    } else {
      bannerText.push(<div  key={i} className='text-black/[.99]' style={{"color": scheme.header.background}}>-------</div>)
    }
  }
  const isHome = !!window.location.href.replace(/((http)[s]?:[/]{2}((localhost:3000)|(kooperlingohr.com)))[/]+/g, '').length;
  return (
    <div className={`h-20 w-full fixed ${props.isVertical?'origin-top-left rotate-90 left-20 top-0': ''}`} style={{"backgroundColor": scheme.header.background, zIndex: props.isVertical ? 1 : 11}}>
        <div className="h-full flex justify-between text-back tracking-widest">
          <div className='flex justify-center items-center'>
            {isHome?home:''}
          </div>
          <div className='tech-slideshow grow '>
            <div className='mover-1 flex justify-center items-center text-xl' style={{height: '100%'}}>
              {bannerText.map(jsx => jsx)}
            </div>
          </div>
        <div></div>
        </div>
    </div>
  );
}

export default Navbar;