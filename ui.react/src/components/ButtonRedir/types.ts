export interface Props {
  label: string;
  destination: string;
  onClickCallback?: Function;
  local: boolean
}

export interface FuncProps {
  monitorPost: Function; 
  data: Props;
}