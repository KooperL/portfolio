import Spinner from '../../components/Spinner'
import Navbar from '../../components/Navbar'
import { PageInformation } from '../../state/colorScheme/colourScheme'
import './style.css'
import sketchWrapper from '../../components/p5/dnaAscii'
import { ReactP5Wrapper } from 'react-p5-wrapper'
// @ts-ignore
import ButtonRedir from '../../components/ButtonRedir'
import TypeLookup from '../../components/TypeLookup'
import { IslandLeft } from '../../templates/IslandLeft'
import { IslandCenter } from '../../templates/IslandCenter'
import ErrorPage from '../ErrorPage'
import { State } from '../../types/State'
import { useAboutState } from '../../controllers/useAboutState'
import { CMSPageResponse } from 'src/components/TypeLookup/types'

interface Props {
  stateCMS: State<CMSPageResponse>
  scheme: PageInformation
}

function AboutPage(props: Props): JSX.Element {
  const validCharsBinary = ['1', '0']
  const validCharsNucleotides = ['A', 'T', 'G', 'C']
  return (
    <IslandCenter>
      <div className="aboutPage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
        <div className="container">
          <div className="links">
            <TypeLookup {...props.stateCMS} />
          </div>
          <div className="render">
            {/* {window.outerWidth > 1000 ? <ReactP5Wrapper sketch={sketchWrapper(props.scheme.body.h1)} /> : <></>} */}

            {/* {window.outerWidth > 1000 ?  
                <>
                  {text.map((row, rowindex) => (
                    <div key={rowindex}>
                    {row.map((col, colIndex) => (
                      <span className={`nucleotide ${seed[0][rowindex][colIndex]}`} key={colIndex} style={{opacity: `${+col === 0 ? 0 : +col*10}%`, ...(seed[0][rowindex][colIndex] === 7) && {color: scheme.body.h1}}}>
                        {+col !== 0 ? 
                          (seed[0][rowindex][colIndex] === 7 ?
                            validCharsBinary[Math.floor(Math.random()*validCharsBinary.length)] : validCharsNucleotides[Math.floor(Math.random()*validCharsNucleotides.length)]) : '.'}
                      </span>
                    ))}
                    </div>
                  ))}
                </>
              : <></>} */}
          </div>
          <div id="test"></div>
        </div>
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <AboutPage {...useAboutState()} />
}

export default Enhance
