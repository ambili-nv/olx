import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import './App.css';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Post from './store/postContext'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth(firebase)
    // firebase.auth().onAuthStateChanged((user)=>{
    //   setUser(user)
    // })
    const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
      // console.log("auth///",auth);
      // console.log("current user//",currentUser);
      setUser(currentUser)
  })

}) 

  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use the 'element' prop */}
          <Route path="/signup" element={<Signup />} /> {/* Use the 'element' prop */}
          <Route path="/login" element={<Login />} /> {/* Use the 'element' prop */}
          <Route path="/create" element={<Create />} /> {/* Use the 'element' prop */}
          <Route path="/view" element={<View />} /> {/* Use the 'element' prop */}
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
