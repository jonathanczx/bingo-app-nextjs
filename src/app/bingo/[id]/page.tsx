import BingoCard from "./card";
import { getCard } from "@/app/actions";

export default async function BingoCardShow({ params }: { params: { id: string } }) {
  const cardData = await getCard(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl mb-8">BINGO</h1>
      { cardData && (
        <BingoCard card={cardData.card} />
      )}
    </main>
  );
}

