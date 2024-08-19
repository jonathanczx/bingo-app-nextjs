import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { getLeaderboard } from "../actions";

export default async function Leaderboard () {
  const leaderboard = await getLeaderboard();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl mb-8">Leaderboard</h1>
      { leaderboard.data && (
        <TableContainer border={1}>
          <Table variant='simple' width={300} maxWidth={400}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th textAlign="right">Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboard.data.cards.map((card: any, index: number) => (
              <Tr key={index}>
                <Td>{card.name}</Td>
                <Td isNumeric>{card.score}</Td>
              </Tr>
              ))}
            </Tbody>
          </Table>
      </TableContainer>
      )}
    </main>
  );
}