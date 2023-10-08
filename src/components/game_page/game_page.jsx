import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addToSquare, checkFinish, checkWinner, resetGame } from "../../redux/reducer/GameSlice"


function Game_page() {
    const squareIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const dispatch = useDispatch()


    /**----------------Navigate----------- */
    const navigate = useNavigate();
    /**----------------Selectors----------- */
    const squares = useSelector((state) => state.game.squares)
    const isFinish = useSelector((state) => state.game.isFinish)
    const isWinner = useSelector((state) => state.game.isWinner)
    const FirstTurn = useSelector((state) => state.game.FirstTurn)
    const WinnerFinshState = useSelector((state) => state.game.WinnerFinshState)


    /**----------------useState----------- */
    const [Turn, SetTurn] = useState(FirstTurn)
    const [ColorClass, SetColorClass] = useState(new Array(9).fill(''))
    const [ClassNoneRestart, SetClassNoneRestart] = useState('none')
    const [ClassNoneFinish, SetClassNoneFinish] = useState('none')
    const [ClassNoneWinner, SetClassNoneWinner] = useState('none')
    const [XCountWins, SetXCountWins] = useState(0)
    const [OCountWins, SetOCountWins] = useState(0)
    const [FinishCount, SetFinishCount] = useState(0)
    const [BgWinner,SetBgWinner]=useState(new Array(9).fill({bgColor:'',textColor:''}))

    /**----------------------------------useEffect----------------------------------------------------*/
    useEffect(() => {
        const updatedBackgroundClass = [...BgWinner];
        dispatch(checkWinner())
        if (isWinner === true) {
            if (Turn == 'o') {
                SetXCountWins(XCountWins + 1)
                SetFinishCount(FinishCount + 1) 
                const [a,b,c]=WinnerFinshState; 
                for(let i= 0 ;i<9;i++){
                    if(i===parseInt(a)||i===parseInt(b)||i===parseInt(c)){
                        updatedBackgroundClass[i].bgColor='bg-blue';
                        updatedBackgroundClass[i].textColor='text-light';
                    }
                    else{
                        updatedBackgroundClass[i]='';
                    }
                }
                SetBgWinner(updatedBackgroundClass)
            }
            else {
                SetOCountWins(OCountWins + 1)
                SetFinishCount(FinishCount + 1)
                const [a,b,c]=WinnerFinshState; 
                for(let i= 0 ;i<= 9;++i){
                    if(i===a||i===b||i===c){
                        updatedBackgroundClass[i].bgColor='bg-yellow';
                        updatedBackgroundClass[i].textColor='text-light';
                    }
                    else{
                        updatedBackgroundClass[i]='';
                    }
                    
                }
                SetBgWinner(updatedBackgroundClass)
            }
            SetClassNoneWinner('')
        }
        else {
            dispatch(checkFinish())
            if (isFinish === true) {
                SetClassNoneFinish('')
                SetFinishCount(FinishCount + 1)
            }
        }
    }, [ColorClass,isFinish, isWinner, squares])


    const handelSquareClick = (Index) => {
        if (squares[Index] === '' && !isWinner && !isFinish) {
            dispatch(addToSquare({ id: Index, turn: Turn }))
        }
        const updatedColorClass = [...ColorClass];
        if (!isWinner || !isFinish) {
            if (Turn === 'x') {
                updatedColorClass[Index] = 'text-blue'
                SetTurn('o')
            }
            else {
                updatedColorClass[Index] = 'text-yellow'
                SetTurn('x')
            }
        }
        SetColorClass(updatedColorClass)
    }

    const RestartHandler = () => {
        SetClassNoneRestart('')
    }
    const RestartQuitHandler = () => {
        SetClassNoneRestart('none')
    }
    const GoMainPage = () => {

        dispatch(resetGame())
        navigate('/')

    }
    const NextRound = () => {
        SetClassNoneFinish('none')
        SetClassNoneWinner('none')
        SetClassNoneRestart('none')
        SetBgWinner(new Array(9).fill(''))
        dispatch(resetGame())
    }


    return (
        <div className="game-page flex flex-col gap-20">
            {/* restart window side */}
            <div id="restart" className={`${ClassNoneRestart} takeround absolute bg-light-dark flex flex-col gap-20 align-center p-30`}>
                <p className="text-light">Reset</p>
                <h1 className="font-50 text-blue">
                    Go To Home Page
                </h1>
                <div className="notification  flex gap-20 justify-center">
                    <button onClick={RestartQuitHandler} className="bg-gray font-32 p-20 radius-15 shadow pointer">continue playing</button>
                    <button onClick={GoMainPage} className="bg-yellow font-32 p-20 radius-15 shadow pointer">Main Page</button>
                </div>
            </div>

            {/* Winner window side */}
            {
                !isWinner ? null :
                    (
                        <div id="takeround" className={`${ClassNoneWinner} takeround absolute bg-light-dark flex flex-col gap-20 align-center p-30`}>
                            <p className="text-light">the winner</p>
                            <h1 className="font-50 text-blue">
                                {Turn === 'o' ? 'x' : 'o'} takes the round
                            </h1>
                            <div className="notification  flex gap-20 justify-center">
                                <button onClick={GoMainPage} className="bg-gray font-32 p-20 radius-15 shadow pointer">Home Page</button>
                                <button onClick={NextRound} className="bg-yellow font-32 p-20 radius-15 shadow pointer">next round</button>
                            </div>
                        </div>)
            }
            {/* Finish window side */}
            <div id="finish" className={`${ClassNoneFinish} takeround absolute bg-light-dark flex flex-col gap-20 align-center p-30`}>
                <p className="text-light">No Winner</p>
                <h1 className="font-50 text-blue">
                    Play Another Game
                </h1>
                <div className="notification  flex gap-20 justify-center">
                    <button onClick={GoMainPage} className="bg-gray font-32 p-20 radius-15 shadow pointer">Home Page</button>
                    <button onClick={NextRound} className="bg-yellow font-32 p-20 radius-15 shadow pointer">next round</button>
                </div>
            </div>

            <div className="game-header align-center">
                <h1 className="flex font-50">
                    <span className="text-blue">x</span>
                    <span className="text-yellow">o</span>
                </h1>
                <div className="player-turn flex align-center justify-center bg-light-dark shadow">
                    <div className="flex align-center justify-center">
                        {/* {isFinish ?
                            <p className="text-light font-20">Winner is </p>
                            : 
                        } */}
                        <p className="text-light font-20"><span></span>{Turn} turn </p>
                    </div>
                </div>
                <div onClick={RestartHandler} className="back-game flex align-end justify-center">
                    <p className="font-20 pointer back-text bg-gray flex align-center justify-center shadow">
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                    </p>

                </div>
            </div>


            {/* ------------------------<Board />-------------------- */}
            <div className="game-body text-center">
                {
                    squareIndexes.map((Index) => {
                        return (
                            <div key={Index} onClick={() => handelSquareClick(Index)} className={` ${BgWinner[Index].bgColor} pointer game-card bg-light-dark  shadow`}>
                                {
                                    <h1 className={`${ColorClass[Index]} font-50  ${BgWinner[Index].textColor}`}>{squares[Index]}</h1>
                                }
                            </div>)
                    })
                }

            </div>
            <div className="game-footer flex justify-between align-center font-20 gap-30">
                <div className="footer-card shadow flex flex-col gap-20 align-center justify-center bg-blue">
                    <p >x (cpu)</p>
                    <h3>{XCountWins}</h3>
                </div>
                <div className="footer-card shadow flex flex-col gap-20 align-center justify-center bg-gray">
                    <p >TIES</p>
                    <h3>{FinishCount} turn</h3>
                </div>
                <div className="footer-card shadow flex flex-col  gap-20 align-center justify-center bg-yellow">
                    <p>O (YOU)</p>
                    <h3 >{OCountWins}</h3>
                </div>
            </div>

        </div>
    )
}

export default Game_page