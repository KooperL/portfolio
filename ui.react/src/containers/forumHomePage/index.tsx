import Spinner from '../../components/Spinner'
import Navbar from '../../components/Navbar'
import './style.css'
import { Button } from '../../components/Button'
import { IslandLeft } from '../../templates/IslandLeft'
import { Input } from '../../components/Input'
import ErrorPage from '../ErrorPage'
import { useForumHomeState } from '../../controllers/useForumHomeState'
import { forumPath } from 'src/api/shared/types'
import { ForumItemType } from 'src/api/clients/forumHandler/types'
import { Link } from 'react-router-dom'
import { useMonitor } from 'src/hooks/useMonitor'
import ForumItem from 'src/components/ForumItem'

type t = ReturnType<typeof useForumHomeState>

function ForumHomePage(props: t): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return (
      <ErrorPage
        errorMessage={props.state.errorMessage}
        errorType="NETWORK"
      />
    )
  if (props.state.details && props.state.details.data) {
    const data = props.state.details.data
    return (
      <IslandLeft>
        <div className="forumHomePage">
          {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
          <div className="links">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Forum Home
            </h2>
            <div className="posts">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  props.handleSubmit()
                }}
              >
                <div className="search">
                  <Input
                    value={props.searchState}
                    onChange={e => {
                      props.setSearchState(e.target.value)
                    }}
                  />
                  <Button
                    colours={props.scheme}
                    callBack={props.handleSubmit}
                    label="search"
                  ></Button>
                  {/* <ButtonRedir destination={`/${ForumRouteType.ForumHome}?search=${searchState}`} label="Search" local={true}></ButtonRedir> */}
                </div>
              </form>
              {Object.keys(data).map(
                (segment: string, indexSegment: number) => {
                  return (
                    <div
                      className="category"
                      key={indexSegment}
                    >
                      <Link
                        key={`${indexSegment}-1`}
                        to={`/${forumPath}?category=${segment}`}
                        onClick={useMonitor}
                      >
                        <p>{`Topic - ${segment}`}</p>
                      </Link>
                      <div className="posts">
                        {data[segment].map(
                          (catPost: ForumItemType, catPostIndex: number) => (
                            <ForumItem
                              key={`${indexSegment}-${catPostIndex}`}
                              data={catPost}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </IslandLeft>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <ForumHomePage {...useForumHomeState()} />
}

export default Enhance
