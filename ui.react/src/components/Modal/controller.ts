import { useState } from 'react'

export const ModalController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleClick = (event: React.MouseEvent) => {
    const overlay = event.currentTarget as HTMLDivElement
    const wrapper = overlay.querySelector('.modal-wrapper') as HTMLDivElement
    if (event.target === overlay && event.target !== wrapper) {
      closeModal()
    }
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleClick,
  }
}
