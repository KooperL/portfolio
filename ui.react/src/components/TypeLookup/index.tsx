import ButtonRedir from "../ButtonRedir";
import './style.css';

function TypeLookup(type: string, data:string[], text?:string) {
  switch(type) {
    case 'button':
      return <ButtonRedir destination={data[0]} label={text ?? ''} local={!data[0].includes('http')}/>
    case 'unorderedList':
      return <ul className={`type-lookup text ${type}`}>{data.map((item:string, index:number) => <li key={index}>{item}</li>)}</ul>
    case 'body':
      return <p className={`type-lookup text ${type}`}>{data.map((item:string, index:number) => <span key={index}>{item}</span>)}</p>
    case 'header':
    case 'subheader':
    case 'emoji':
      return <p className={`type-lookup text ${type}`}>{data[0]}</p>
  }
}

export default TypeLookup;