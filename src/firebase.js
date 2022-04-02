// import { async } from '@firebase/util'
// import { async } from '@firebase/util'
import { initializeApp } from 'firebase/app'
import * as fireAuth from'firebase/auth' 
import  * as firehouse from 'firebase/firestore'
// import { doc } from 'firebase/firestore'

import { ref, onMounted, computed } from 'vue'

const app = initializeApp({
    
        apiKey: "AIzaSyCjaGnKBk1uxjFkcBHUH6nQUAkzJ8__aYQ",
        authDomain: "meetup-78066.firebaseapp.com",
        projectId: "meetup-78066",
        storageBucket: "meetup-78066.appspot.com",
        messagingSenderId: "110329566516",
        appId: "1:110329566516:web:5a301285baef199cd50161",
        measurementId: "G-Z49M623ZM0"
      }
)

const auth = fireAuth.getAuth(app)

export function useAuth(){
    const user = ref(null)
    const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user)) 
    onMounted(unsubscribe)
    const isLogin = computed(() => user.value !== null)

    const signup = async () => {
        // const googleProvider = new firebase.auth.GoogleAuthProvider()
       const provider = new fireAuth.GoogleAuthProvider()
        // await auth.signInWithPopup(googleProvider)
        await fireAuth.signInWithPopup(auth, provider)
        .then ((res) => {
            return {
                user: res.user
            }
        }) .catch ((err) => console.log(err))
    }
    const signOut = () => auth.signOut()

  return { user, isLogin, signup, signOut }

} 





const db = firehouse.getFirestore(app)
 
// const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)
// const filter = new filter()





export function useChat() {
  
  const messages = ref([])
  const unsubscribe = async function(){
    // const keep = []
    //   console.log('runniug')
        const shak = firehouse.collection(db, 'messages')
         firehouse.onSnapshot(shak, (snap) => {
           const keep = []
             snap.docs.forEach(item => keep.push({...item.data(), id: item.id})) 
             
        // console.log(keep);
        messages.value = keep.sort((a,b) => a.createdAt - b.createdAt)
             
        })
        console.log(messages.value)
  } 
  

  onMounted(unsubscribe)

  const { user, isLogin } = useAuth()
  const sendMessage = async ( text )=> {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value

    try {
        const messagesCollection = firehouse.collection(db, 'messages')
   await firehouse.addDoc(messagesCollection, {
        userName: displayName,
        userId: uid,
        userPhotoURL: photoURL,
        text: text,
        createdAt: Date.now()
    })
    } catch (error) {
        console.log(error.message);
    }
    
    console.log(text, user.photoURL);
  }

  return { sendMessage, messages }
}