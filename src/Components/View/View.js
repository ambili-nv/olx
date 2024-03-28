import React,{useEffect,useState,useContext } from 'react';

import './View.css';
import { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/FirebaseContext';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';



function View() {
  const [userDetails,setUserDetails] = useState(null)
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)


  
  

  useEffect(() => {
    const getUserData = async () => {
      try {

        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if(doc.data().id === postDetails.user) {
            const data = doc.data()
            setUserDetails(data)
          }
          console.log("user data fetched");
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    };

    getUserData();
  }, []);





  return (
    <div  
    className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src= {postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
        </div>
{     userDetails &&   <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>1234567890</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
