import { useEffect, useState } from "react";
import { MemoryCard } from "./MemoryCard";
import { ScoreBoard } from "./ScoreBoard";
import { toast } from "sonner";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGrid = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setMoves(0);
    setFirstChoice(null);
    setSecondChoice(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.emoji === secondChoice.emoji) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.emoji === firstChoice.emoji ? { ...card, isMatched: true } : card
          )
        );
        resetTurn();
        
        // Check if all cards are matched
        const allMatched = cards.every((card) => 
          card.emoji === firstChoice.emoji ? true : card.isMatched
        );
        
        if (allMatched) {
          toast("Congratulations! You've won! 🎉");
        }
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const handleCardClick = (card: Card) => {
    if (card.isFlipped || card.isMatched) return;
    
    if (!firstChoice) {
      setFirstChoice(card);
      flipCard(card.id);
    } else if (!secondChoice && firstChoice.id !== card.id) {
      setSecondChoice(card);
      flipCard(card.id);
      setMoves((prev) => prev + 1);
    }
  };

  const flipCard = (id: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
  };

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.isMatched ? card : { ...card, isFlipped: false }
      )
    );
  };

  return (
    <div className="flex flex-col items-center">
      <ScoreBoard moves={moves} onRestart={initializeGame} />
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            {...card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};