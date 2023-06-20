import React ,{ useState ,useEffect} from 'react';
import './App.css';
import Post from './Post'
import {db,auth} from './firebase.js'
import Modal from '@mui/material/Modal';
import { Button,Box,Input } from '@mui/material';
import ImageUpload from './ImageUpload';
import Avatar from '@mui/material/Avatar';

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


function App() {
  const [posts,setPosts]=useState([])
  const [open,setOpen]=useState(false)
  const [openSignIn,setOpenSignIn]=useState(false)
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [user,setUser] = useState(null)

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id:doc.id,
        post:doc.data()
      })))
    })
  }, [])


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        console.log(authUser);
        setUser(authUser)
      }
      else{
        setUser(null)
      }
    })
    return () => {
      unsubscribe ()
    }
  }, [user, username])

  const signUp = (e)=>{
    e.preventDefault()

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName : username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const signIn = (e)=>{
    e.preventDefault()

    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={ ()=>setOpen(false)}
        
      >
       <Box sx={style}>
       <div>
        <form className='app_signup'>
        <center>
          <img className='app_headerImage'
          src="data:image/jpeg;base64,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"
           alt="" />
        </center>  
          <Input 
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input 
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <Button type="submit" onClick={signUp}>Sign Up</Button>
        </form>
       </div>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={ ()=>setOpenSignIn(false)}
        
      >
       <Box sx={style}>
       <div>
        <form className='app_signup'>
        <center>
          <img className='app_headerImage'
          src="data:image/jpeg;base64,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"
           alt="" />
        </center> 
          <Input 
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <Button type="submit" onClick={signIn}>Sign In</Button>
        </form>
       </div>
        </Box>
      </Modal>

      <div className='app_header'>
        <img className='app_headerImage' src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"  alt="insta logo"></img>
      
        {user ?(<Button onClick={()=>auth.signOut()}>Logout</Button> ) :
      ( 
        <div className='app_loginContainer'>
        <Button onClick={()=>setOpenSignIn(true)}>Sign in</Button>

        <Button onClick={()=>setOpen(true)}>Sign up</Button>
        </div>
        )}
      </div>
      
      <div className='app_posts'>
        <div className='app_postsLeft'>
            {posts.map(({id,post})=>
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            )}
        </div>
        <div className='app_postsRight'>
              <Avatar src=" " alt={user?.displayName}/>
              <p className='username'>{user?.displayName}</p>
        </div>
      </div>

      {user?.displayName ? 
     (<ImageUpload username={user.displayName}/>):
     (
      <h3>Sorry you need to login to upload</h3>
     )}
      
     </div>
  );
}

export default App;
