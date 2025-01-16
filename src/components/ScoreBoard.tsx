import { Button } from "@/components/ui/button";

interface ScoreBoardProps {
  moves: number;
  onRestart: () => void;
}

export const ScoreBoard = ({ moves, onRestart }: ScoreBoardProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mb-8">
      <div className="text-xl font-semibold text-gray-700">Moves: {moves}</div>
      <Button onClick={onRestart} variant="outline">
        Restart Game
      </Button>
    </div>
  );
};