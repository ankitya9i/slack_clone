import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase';
import { addDoc, collection, serverTimestamp, } from "firebase/firestore"; 
import {ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import './upload.css'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'gray',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const style1={
    color: 'white',
    backgroundColor: 'blue',
}

export default function BasicModal(chatref) {
    const [user,loading]= useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [image, setimage] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const roomid = useSelector(selectRoomId);
  const handleupload=()=>{
    if(image==null) return;
const imageref=ref(storage,`images/${image.name}`);
uploadBytes(imageref,image).then((snapshot)=>{
alert(" image uploaded successfully ",user);  
setOpen(false);
getDownloadURL(imageref)
.then((url) => {
  const setdata=async ()=>{
    addDoc(collection(db, "rooms",roomid,"meassages"),{
        meassage:'',
        url:url,
        filename:imageref.name,
        user:user.displayName,
      userimage:user?.photoURL,
      timestamp: serverTimestamp()
      })
  }
  chatref?.current?.scrollIntoView({
    behavior: "smooth",
  })

  setdata();

});
setimage(null);

});
//handle upload finishes
  }
  return (
    <div>
      <Button onClick={handleOpen}><AttachFileIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <label for="images" className="drop-container">
          <span className="drop-title">Drop files here</span>
          or
          <input type='file' id="upload" placeholder='choose file' onChange={(event)=>{setimage(event.target.files[0])}}/>
         </label>
           
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button/>
          </Typography>
          <Button onClick={handleupload} sx={style1}>upload</Button>
        </Box>
      </Modal>
    </div>
  );
}
