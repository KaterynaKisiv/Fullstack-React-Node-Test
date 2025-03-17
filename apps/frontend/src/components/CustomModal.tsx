import React, { ReactNode } from 'react'
import { Modal, IconButton } from '@mui/material'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Close as CloseIcon } from '@mui/icons-material'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  width?: string
  padding?: string
  children: ReactNode
}

interface ModalContainerProps {
  width?: string
  padding?: string
}

const CustomModal = ({
  isOpen,
  onClose,
  width,
  children,
  padding,
}: CustomModalProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalContainer width={width} padding={padding}>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        {children}
      </ModalContainer>
    </Modal>
  )
}

export default CustomModal

const ModalContainer = styled.div`
  ${({ width, padding }: ModalContainerProps) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: ${width || 'auto'};
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    max-height: 90%;
    overflow: auto;
    padding: ${padding || '16px'};
    color: black;
  `}
`

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`
