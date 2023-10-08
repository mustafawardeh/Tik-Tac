import './App.css'
import Game_page from './components/game_page/game_page'
import Start_page from './components/start_page/start_page'
import { RouterProvider, Outlet,createBrowserRouter,ScrollRestoration} from "react-router-dom";
function App() {

  const Layout=()=>{
    return(
      <div className="game ">
        <Outlet />
        <ScrollRestoration/>
      </div>
    )
  }
const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout/>,
    children:[
      {path:'/',element:<Start_page />} ,
      {path:"/game",element:<Game_page/>},
    ]
  }
])
  return (

    <div className='container relative'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
