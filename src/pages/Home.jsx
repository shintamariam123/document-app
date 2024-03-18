import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { datas } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Modal, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';


function Home() {
    
  const [allDocs, setAllDocs] = useState([]);
  const [docTitle, setDocTitle] = useState('');
  const [reload, setReaload] = useState('');
  const [show, setShow] = useState(false);

  const docsCollectionRef = collection(datas, 'documents');

  const getAllDocs = async () => {
    const docsData = await getDocs(docsCollectionRef);
    const data = docsData.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setAllDocs(data);
  };

  const postData = async () => {
    await addDoc(docsCollectionRef, {
      title: docTitle,
      discription: ''
    });
    setReaload(docTitle);
  };

  const deleleDocs = async id => {
    const oneDoc = doc(datas, 'documents', id);
    await deleteDoc(oneDoc);
    setReaload(id);
  };

  useEffect(() => {
    getAllDocs();
  }, [reload]);

  const handleClose = () => setShow(false);

  const handleAdd = () => {
    postData();
    alert(`${docTitle} created successfully`);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleEdit = data => {
    navigate('/view', { state: data });
  };

  const handleChange = e => {
    setDocTitle(e.target.value);
  };

  return (
    <>
    <div style={{height:'100vh'}} className='box'>
      <div className='container'>
        <div style={{marginTop:"70px"}} className='d-flex flex-column justify-content-center align-items-center mb-5'>
          <h1 style={{color:'red'}} className='text-center fw-bolder mt-2'>Document App</h1>
          <Button style={{marginTop:"20px",backgroundColor:'red'}} onClick={handleShow} variant='contained' >
            Create A document
          </Button>
        </div>
        <div className='row'>
          {allDocs?.length > 0 ? (
            allDocs.map(item => (
              <div key={item.id} className='col-lg-4 mb-4'>
                <div style={{ height: '170px',backgroundColor:"#32323f",color:'white' }} className='border 30px'>
                  <div className='d-flex justify-content-between px-3 py-2'>
                    <h4 className='mb-0'>{item.title}</h4>
                    <div className='d-flex justify-content-center align-items-center'>
                      <BorderColorIcon style={{marginRight:"10px",color:'black'}} onClick={() => handleEdit(item)} />
                      <DeleteForeverIcon style={{color:'red'}} onClick={() => deleleDocs(item.id)} />
                    </div>
                  </div>
                  <p style={{ textAlign: 'justify' }} className='px-3'>
                    {item.discription.replace(/<[^>]+>/g, '')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        

        <Modal style={{width:"500px",padding:"10px",textAlign:"center",marginTop:'30px',backgroundColor:'white',height:'200px',marginLeft:'500px'}} open={show} onClose={handleClose}>
          <div className='paper'>
            <div className='d-flex flex-column'>
              <TextField size='sm' style={{backgroundColor:'white'}}
                id='floatingInputTitle'
                label='Add Title'
                type='text'
                variant='outlined'
                placeholder='Add Title To Document'
                onChange={e => handleChange(e)
                }
              />
              <Button style={{marginTop:"15px"}} variant='contained' onClick={handleAdd}>
             Submit
              </Button>
            </div>
          </div>
        </Modal>
      </div>

    </div> 

    </>
  );
}

export default Home;