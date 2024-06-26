import React, { useState, useRef, useEffect, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export default function Popup({ component, pre, word, icon: Icon,  pop = false, bop = false}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);


  useEffect(() => {
    if (pop) {
      return; // Skip the effect if pop is true
    }
  
    const closePopperOnClickAway = (event) => {
      if (
        anchorRef.current &&
        !anchorRef.current.contains(event.target) &&
        !event.target.closest('.popup-content')
      ) {
        setOpen(false);
      }
    };
  
    document.addEventListener('mousedown', closePopperOnClickAway);
  
    return () => {
      document.removeEventListener('mousedown', closePopperOnClickAway);
    };
  }, [setOpen, anchorRef, pop]);
  


  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={bop ? { display: 'flex', position: 'fixed', alignItems: 'left' ,  justifyContent: 'center' } : { display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton onClick={handleToggle} style={{ color: 'green', 
      
      '@media only screen and (min-width: 601px)': {
        fontSize: "6px"       } ,
        fontSize:"12px"
      }} ref={anchorRef}>
        {pre}
        {Icon && <Icon />}
        {word}
      </IconButton>

      {open && (
        <Paper className="popup-content" style={{ position: 'absolute', zIndex: 1, textAlign: 'center', maxWidth: "800px" }}>

          <Typography sx={{ p: 2 }}>

            {component}

          </Typography>
          <br/>

          <IconButton onClick={handleClose} style={{ position: 'absolute', top: '5px', left: '5px', color: 'red' }}>
            <CloseIcon />
          </IconButton>

        </Paper>
      )}
    </div>
  );
}
