import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { collection, doc, onSnapshot,addDoc, orderBy, query,serverTimestamp } from 'firebase/firestore';
import { selectRoomId } from '../features/appSlice';
import { Padding } from '@mui/icons-material';

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
};

export default function BasicModal() {
   
    const [addnew, setaddnew] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notetitle, setnotetitle] = React.useState('');
  const [notedes, setnotdes] = React.useState('');
   const [notes, setnotes] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const roomid = useSelector(selectRoomId);
 const addnote=(e) =>{
    console.log('addnote')
    e.preventDefault();
       
    try{
        addDoc(collection(db, "rooms",roomid,"notes"),{
           title:notetitle,
           des:notedes,
           date:serverTimestamp(),
          })}
    catch(err){
        console.log(err,'Please');
    }
    setaddnew(false)
 }
 React.useEffect(() => {
    if(roomid){
        const msgColl = query(collection(db, "rooms", roomid, "notes"), orderBy("date","asc"));
        onSnapshot(msgColl, (querySnapshot) => {
            setnotes(querySnapshot.docs.map(msg => msg.data()))
        });
    }
    console.log("ye bi lo",notes)
}, [roomid])

  return (
    <div>
      <Button onClick={handleOpen} style={{color:'blue'}}>Channel Notes</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {notes?.map((doc)=>(

       <div style={{display:'flex',flexDirection:'column',border:'2px solid black',padding:'10px'}}>
        <div style={{Padding:'10px'}}>Title:
            {doc.title}
        </div>
        <div>Description:
            {doc.des}
        </div>
      </div>
      ))}
          </Typography>
   
         
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {addnew&&
          <form  onSubmit={addnote} style={{display:'flex',
        flexDirection:'column'}}>
            <label>
            Enter Note title
           </label>
           <input  value={notetitle} type='text' onChange={(e)=>{setnotetitle(e.target.value)}}/>
           <label>
            Enter Note Description
           </label>
           <input value={notedes}  type='text' onChange={(e)=>{setnotdes(e.target.value)}} style={{outline:'none',
        }} />
        <Button type='submit' value="send" >Add</Button>
            </form>}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!addnew && <Button value="send" onClick={e=>{setaddnew(true)}} >Add new note</Button>}
          
          </Typography>
         
        </Box>
      </Modal>
    </div>
  );
}
