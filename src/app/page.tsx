'use client'
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { createGame } from "../app/actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleCreateGameClick = () => async () => {
    const cardResponse = await createGame(userName);
    router.push(`/bingo/${cardResponse.card.id}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <FormControl minW={600} w="50%" display="flex" flexDir="column" gap={4}>
        <FormLabel>Enter a name</FormLabel>
        <Input
          type="text"
          placeholder="John Doe"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <Button onClick={handleCreateGameClick()}>Create Game</Button>
      </FormControl>
    </main>
  );
}
