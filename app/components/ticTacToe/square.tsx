type Props = {
  value: string | null;
  hasRightBorder: boolean;
  lumenate: boolean;
  onClick: () => void;
};

const Square: React.FC<Props> = ({
  value,
  hasRightBorder,
  lumenate,
  onClick,
}) => {
  return (
    <div
      className={`${hasRightBorder ? 'border-r-2 border-(--board-color)' : ''} flex w-1/3 h-full`}
    >
      <button
        className={`${lumenate ? 'text-pink-400' : ''} w-full h-full cursor-pointer text-center text-5xl font-bold`}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
};

export default Square;
