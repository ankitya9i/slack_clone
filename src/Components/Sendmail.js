import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import emailjs from "@emailjs/browser";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const form = React.useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_n8o73u2', 'template_7ll259v', form.current, 'OpklzA-9TBoVo7Syl')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      setOpen(false)
  };
  return (
    <div>
      <Button onClick={handleOpen} style={{color:'white'}}>Invite</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            <form ref={form} onSubmit={sendEmail} style={{display:'flex',
        flexDirection:'column'}}>
            <label>
            Enter mail
           </label>
           <input type='text' name="user_email"/>
           <label>
            Enter Name
           </label>
           <input type='text' style={{outline:'none',
        }} name="user_name"/>
        <Button type='submit' value="send" >Send</Button>
            </form>
          </Typography>
          
        </Box>
      </Modal>
    </div>
  );
}
