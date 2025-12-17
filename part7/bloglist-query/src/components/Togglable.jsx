import { useImperativeHandle, useState } from 'react'
import { Button } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          startIcon={<AddRoundedIcon />}
          variant="outlined"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          startIcon={<CloseRoundedIcon />}
          variant="outlined"
          color='error'
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
