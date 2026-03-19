import Square from './square';

type Props = {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winLine?: number[];
};

const Board: React.FC<Props> = ({squares, winLine, onClick}) => {
  const renderSquare = (i: number, isOnLastColumn: boolean) => {
    return (
      <Square
        key={`Square-${i}`}
        value={squares[i]}
        hasRightBorder={!isOnLastColumn}
        onClick={() => onClick(i)}
        lumenate={winLine && winLine.includes(i) ? true : false}
      />
    );
  };

  let board = [];
  const boardSize = 3;
  for (let i = 0; i < boardSize; i += 1) {
    let row = [];
    for (let j = 0; j < boardSize; j += 1) {
      const isOnLastColumn = j === boardSize - 1;
      row.push(renderSquare(i * boardSize + j, isOnLastColumn));
    }
    const isOnLastRow = i === boardSize - 1;
    board.push(
      <div
        key={i}
        className={`flex w-full h-1/3 ${!isOnLastRow ? 'border-b-2 border-(--board-color)' : ''}`}
      >
        {row}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[300px] h-[300px] min-h-[300px] min-w-[300px]">
      {board}
    </div>
  );
};

export default Board;
