import { MemoryGrid } from "@/components/MemoryGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Memory Game</h1>
      <MemoryGrid />
    </div>
  );
};

export default Index;