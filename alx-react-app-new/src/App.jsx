import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage.jsx'
import Header from './components/Header.jsx'
import MainContent from './components'
import Footer from './components/Footer.jsx'
import UserProfile from './components/UserProfile'
import Counter from './components/Counter.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <WelcomeMessage />
        <Header />
        <MainContent />
        <Footer />
      </div>
       <div>
      <h1>User Profile</h1>
      <UserProfile "name=", "Alice", "age=", "25", "bio=", "Loves hiking and photography" />
    </div>
      
    </>
  )
}

export default App
