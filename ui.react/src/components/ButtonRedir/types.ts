export interface Props {
  label: string
  destination: string
  onClickCallback?: Function
  local: boolean
  // key?: number;
}

export interface FuncProps {
  monitorPost: Function
  data: Props
}
