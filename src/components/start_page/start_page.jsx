import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setFirstTurn } from "../../redux/reducer/GameSlice"

function Start_page() {
  

  const dispatch = useDispatch()


  const [turn,Setturn]=useState('x')
  const [StartXbg,SetStartXbg]=useState('#2f3834')
  const [StartObg,SetStartObg]=useState('')

  const xhandler = () => {
    Setturn('x')
    SetStartXbg('#2f3834')
    SetStartObg('transparent')
    dispatch(setFirstTurn('x'))
  }
  const ohandler = () => {
    Setturn('o')
    SetStartObg('#2f3834')
    SetStartXbg('transparent')
    dispatch(setFirstTurn('o'))
  }
  return (
    <div className="start_page flex flex-col justify-center gap-20">
      <h1 className="font-50 text-center flex justify-center gap-10">
        <span className="text-blue">X</span><span className="text-yellow">o</span>
      </h1>
      <div className="set-turn">
        <h3>{`PICK PLAYER 1'ST MARK`}</h3>
        <div className="turn-box flex  bg-yellow">
          <h1 onClick={xhandler} style={{ background: String(StartXbg) }} className="text-50 pointer text-blue">x</h1>
          <h1 onClick={ohandler} style={{ background: String(StartObg) }} className="text-50 pointer text-yellow">o</h1>
        </div>
        <p>Remember : {turn} Goes First</p>
      </div>
      <Link to={'/game'}>
        <button className="player bg-blue">New game ( Player vs Player )</button>
      </Link>
    </div>
  )
}

export default Start_page