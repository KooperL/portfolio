export type EnhanceProps = {
  closedChildren?: React.ReactNode
  children?: React.ReactNode
}

export interface ModalProps extends EnhanceProps {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  handleClick: (event: React.MouseEvent) => void
}
