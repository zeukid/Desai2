import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatPage from "./pages/ChatPage";


function App() {
  const [count, setCount] = useState(0)
    
    //return <h1 className="text-4xl font-bold text-red-500">Tailwind works!</h1>;
    return <ChatPage />;
}

export default App
