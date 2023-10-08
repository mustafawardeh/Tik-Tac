import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    winnerLines: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ],
    squares: new Array(9).fill(''),
    FirstTurn: 'x',
    isWinner: false,
    isFinish: false,
    WinnerFinshState:new Array(3).fill(''),
  };
  

export const GameSlice = createSlice({
    name:"game",
    initialState,
    reducers:{
        setFirstTurn:(state,action)=>{
            state.FirstTurn=action.payload;
        },
        addToSquare:(state,action)=>{
            state.squares[action.payload.id]=action.payload.turn
        },
        checkWinner:(state)=>{
            for(let i = 0 ; i<state.winnerLines.length ; i++){
                const  [a,b,c]=state.winnerLines[i]
                if(state.squares[a]===state.squares[b]&&state.squares[b]===state.squares[c]&&state.squares[a]!==''){
                    state.isWinner=true
                    state.WinnerFinshState=[a,b,c]
                }
            }
        },
        checkFinish:(state)=>{
            if(state.squares!==null){
                let fillState=false
                for(let i = 0 ; i<9;i++)
                {
                    if(state.squares[i]!=='')
                    {
                        fillState=true
                    }
                    else{
                        fillState=false
                        return
                    }
                }
                if(fillState==true)
                {
                    state.isFinish=true
                    new Array(9).fill('')
                }
            }
        },
        resetGame:(state)=>{
            state.squares = new Array(9).fill('');
            state.isWinner=false;
            state.isFinish=false;
        },
    }
})

export const {setFirstTurn,addToSquare,checkWinner,checkFinish,resetGame,setWinnerFinshState} = GameSlice.actions

export default GameSlice.reducer