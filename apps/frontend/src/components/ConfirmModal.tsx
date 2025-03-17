import { Typography, Button } from '@mui/material'
import styled from '@emotion/styled'
import CustomModal from './CustomModal'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  width?: string
  title: string
  description?: string
  buttonText?: string
}

function ConfirmModal({
  isOpen,
  onClose,
  onSubmit,
  width,
  title,
  description,
  buttonText,
}: ConfirmModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      width={width || '396px'}
      padding="24px"
    >
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1" marginTop="8px" color="rgba(0, 0, 0, 0.60)">
        {description || 'Are you sure?'}
      </Typography>
      <ButtonBlock>
        <Button onClick={onClose} size="large" variant="text">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          size="large"
          variant="contained"
        >
          {buttonText || 'Submit'}
        </Button>
      </ButtonBlock>
    </CustomModal>
  )
}

export default ConfirmModal

const ButtonBlock = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`
