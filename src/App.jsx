
import './App.css'
import FavoriteMovies from './pages/FavoriteMovies'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <main className='main-content'> 
    <Routes> 
      <Route path= "/" element ={<Home />}/> 
      <Route path= "/favoriteMovies" element ={<FavoriteMovies />}/> 
    </Routes>
    </main>

  )
}

export default App
