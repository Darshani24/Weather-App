import { useState } from 'react'
import './App.css'
import Weather from './components/Weather'

function App() {
  
  return (
    <div className=' min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-[40px]'>
     <Weather/>
    </div>
  )
}

export default App
