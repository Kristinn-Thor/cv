import {useState} from 'react';
import Board from './board';
import calculateWinner from './helperFunctions';

type GameState = {
  history: {
    squares: (string | null)[];
    latestMove: number;
  }[];
  isAscending: boolean;
  stepNumber: number;
  xIsNext: boolean;
};

const TicTackToe: React.FC<{lightOn: boolean}> = ({lightOn}) => {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: Array(9).fill(null),
        latestMove: 0,
      },
    ],
    isAscending: true,
    stepNumber: 0,
    xIsNext: true,
  });

  const handleMoveOrder = () => {
    setState((prevState) => ({
      ...prevState,
      isAscending: !prevState.isAscending,
    }));
  };

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // Ignore click if game is won or square is filled
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState((prevState) => ({
      ...prevState,
      history: history.concat([
        {
          squares: squares,
          latestMove: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !prevState.xIsNext,
    }));
  };

  const jumpTo = (step: number) => {
    setState((prevState) => ({
      ...prevState,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    }));
  };

  const history = state.history;
  const current = history[state.stepNumber];
  const winInfo = calculateWinner(current.squares);
  const winner = winInfo.winner;

  let moves = history.map((step, move) => {
    const latestMove = step.latestMove;
    const col = (latestMove % 3) + 1;
    const row = Math.floor(latestMove / 3) + 1;
    const desc = move
      ? `Go to move #${move} (${col}, ${row})`
      : 'Go to game start';
    return (
      <li key={move}>
        <button
          className={`cursor-pointer p-1 m-1 border-2 ${lightOn ? 'text-(--theme-color-blue) border-(--theme-color-blue)' : 'text-(--theme-color-green) border-(--theme-color-green)'}`}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  if (!state.isAscending) {
    moves.reverse();
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex items-center h-screen flex-col pt-20 sm:flex-row sm:pt-0">
      <div className="flex justify-center items-center w-full  h-full sm:w-1/2 sm:h-1/2">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winLine={winInfo.line}
        />
      </div>
      <div className="flex justify-center items-center mt-4 w-full  h-full sm:w-1/2 sm:h-1/2 sm:mt-0 ">
        <div className="">
          <div
            className={`${winner ? 'text-pink-400' : lightOn ? 'text-(--theme-color-blue)' : 'text-(--theme-color-green)'} flex flex-col`}
          >
            <p className="text-xl font-bold mb-2">{status}</p>
            <button
              className={`cursor-pointer p-1 m-1 border-2 ${lightOn ? 'text-(--theme-color-blue) border-(--theme-color-blue)' : 'text-(--theme-color-green) border-(--theme-color-green)'}`}
              onClick={() => handleMoveOrder()}
            >
              {state.isAscending
                ? 'Change to descending'
                : 'Chnage to ascending'}
            </button>
          </div>
          <div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTackToe;
