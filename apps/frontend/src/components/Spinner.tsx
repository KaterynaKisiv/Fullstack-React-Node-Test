import { CircularProgress } from '@mui/material'
import styled from '@emotion/styled'

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <AbsoluteCenterSpinner />
    </SpinnerWrapper>
  )
}

export default Spinner

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
`

const AbsoluteCenterSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; /* Higher z-index to ensure the spinner is on top of its parent and other elements */
`
