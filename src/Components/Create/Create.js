import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { db, storage } from '../../firebase/config';
import {  ref, uploadBytes ,getDownloadURL } from 'firebase/storage';
import {  Timestamp, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate()

  // const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)

  const [name, setName] = useState('');
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null);

  const [nameError,setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError,setPriceError] = useState('')


  const handleSubmit = () => {

    setNameError('');
    setCategory('');
    setPriceError('');

    let isError = false;

    if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name.trim())) {
      setNameError('Name should contain only letters and at least one non-space character');
      isError = true;
    }

    if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(category.trim())) {
      setCategoryError('Category should contain only letters and at least one non-space character');
      isError = true;
    }


    if (isNaN(price) || price === '' || price < 0) {
      setPriceError('Price should be a non-negative number');
      isError = true;
    }
    


    if (isError) {
      return; 
    }
 


    const currentDate = Timestamp.now();
    const storageRef = ref(storage,`/image/${image.name}`)
    uploadBytes(storageRef , image).then((snapshot)=> getDownloadURL(snapshot.ref)).then((url)=>
    addDoc(collection(db , 'products'),{
      name ,
      category ,
       price ,
        url ,
         user : user.uid ,
         createdAt : currentDate
         
    })).then((docRef)=>{
      alert("doc added")
      navigate('/')
      console.log('Document added with ID: ', docRef.id);
      
    }).catch((error)=>{
      console.log(error);
    })



  }


  


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname" 
            name = "Name"
            value = {name}          
            onChange={(e) => {
              setName(e.target.value)
              setNameError('');
            }}
          />
          <span className='error'>{nameError}</span>
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setCategoryError('');
            }}
          />
          <span className='error'> {categoryError}</span>
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
              setPriceError('')
            }}
          />
          <span className='error'> {priceError}</span>
          <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>

          <br />
          <input onChange={(e) => {
            setImage(e.target.files[0])
          }} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
