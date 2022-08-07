import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Main from './Main'
import Edit from './Edit'
const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element = {<Main/>}/>
    <Route path='/edit/:id' element = {<Edit/>}/>
   </Routes>
   </>
  )
}

export default App