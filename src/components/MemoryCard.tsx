import { cn } from "@/lib/utils";

interface MemoryCardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const MemoryCard = ({ emoji, isFlipped, isMatched, onClick }: MemoryCardProps) => {
  return (
    <div
      className={cn(
        "relative w-24 h-24 cursor-pointer perspective-1000",
        isMatched && "pointer-events-none opacity-50"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute w-full h-full transition-all duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg backface-hidden" />
        <div className="absolute w-full h-full flex items-center justify-center bg-white rounded-xl shadow-lg transform rotate-y-180 backface-hidden text-4xl">
          {emoji}
        </div>
      </div>
    </div>
  );
};