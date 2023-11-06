import { Link } from 'react-router-dom'

export default function Card(props: any) {
  if (props.type === 1) {
    return (
      <a
        href={props.link}
        className=""
      >
        <div className="bg-white rounded-lg shadow-2xl mt-6 mr-4 w-20% outline-1 outline hover:bg-gray-200">
          <header className="bg-gray-900 text-white rounded-t-lg py-3 px-8 text-xl">
            {props.header}
          </header>
          <div className="px-8 py-2">Go</div>
        </div>
      </a>
    )
  } else if (props.type === 0) {
    return (
      <Link
        to={props.link}
        className=""
      >
        <div className="bg-white rounded-lg shadow-2xl mt-6 mr-4 w-20% outline-1 outline hover:bg-gray-200">
          <header className="bg-gray-900 text-white rounded-t-lg py-3 px-8 text-xl">
            {props.header}
          </header>
          <div className="px-8 py-2">Go</div>
        </div>
      </Link>
    )
  } else if (props.type === 2) {
    return (
      <div className="bg-white rounded-lg shadow-2xl mt-6 mr-4 outline-1 outline w-5/6">
        <header className="bg-gray-900 text-white rounded-t-lg py-3 px-8 text-xl">
          {props.header}
        </header>
        <div className="px-8 py-2">
          <p>{props.link}</p>
        </div>
      </div>
    )
  } else {
    return 'error'
  }
}
