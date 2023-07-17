import React,{useState} from 'react'
import './style.css'

export const Add = (props) => {
    const[title,setTitle]=useState("");
    const[desc,setDesc]=useState("");
    // submit function which runs whwn we submit form
    const submit=(e)=>{
      e.preventDefault();
      if(!title || !desc)
      {alert("Title or description can't be blank");}
     else{
      props.addthis(title,desc);
        }
     //make them empty again 
    setTitle("");
    setDesc("");
    }

  return (
    <>  
   {/* <div className="container my-3">
    <h2> Todo List App</h2>
    <form onSubmit={submit}>
        <div className="mb-3">
            <label htmlFor="title" className="form-label"> Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" 
            aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
            <label htmlFor="desc" className="form-label"> Description</label>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
        </div>
        <button type="submit" class="btn btn-success" >
 
 Submit
</button>
    </form>
</div> */
}
<div><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
  
  Add a Note</button>
    
    <div className="modal fade modal-dialog modal-dialog-centered" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: 'none'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Add a Todo</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={submit}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                <input type="text" className="form-control" id="title"  value={title} onChange={(e) => setTitle(e.target.value)} 
                
                aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Description:</label>
                {/* <textarea className="form-control" id="message-text"></textarea> */}
                <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
              </div>
              <div className="modal-footer">
            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}

            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
            </form>
          </div>
          
        </div>
      </div>
    </div></div>
  </>
   
  )
}
