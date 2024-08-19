'use client'

import { createGame, pullNumber, scoreCard } from "@/app/actions";
import { Box, Button, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import { CardType } from "@/types/Card"
import BingoCardTile from "./cardTile";
import { useRef, useState } from "react";
import { CardTileType } from "@/types/CardTile";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useRouter } from "next/navigation";

export default function BingoCard({card} : {card: CardType}) {
  const toast = useToast();
  const [markedCount, setMarkedCount] = useState(card.tiles.filter((tile) => !!tile.marked).length);
  const [cardState, setCardState] = useState<CardType>(card);
  const [cardScore, setCardScore] = useState<number|undefined>(card.score || undefined);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const router = useRouter();

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Copied to clipboard!',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right'
    });
  }

  const handlePullNumber = async () => {
    try {
      const response = await pullNumber(card.id as string);
      toast({
        title: `Number ${response.data.number} is pulled! ${response.data.number == 69 ? 'Nice!' : ''}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      });
    } catch (error) {
      toast({
        title: 'An error occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }
  
  const handleReset = async () => {
    const response = await createGame(card.name);
    router.push(`/bingo/${response.card.id}`);
  }

  const handleScoreCard = async () => {
    try {
      const response = await scoreCard(card.id as string);
      setCardScore(response.data.score);
      toast({
        title: `Your card score is ${response.data.score}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      });
    } catch (error) {
      toast({
        title: 'An error occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      });
    }
  }

  const handleCardTileUpdate = (updatedTile: CardTileType) => {
    const tiles = cardState.tiles.map((t) => t.id === updatedTile.id ? updatedTile : t)
    setCardState({
      ...cardState,
      tiles: tiles
    })
    setMarkedCount(tiles.filter((tile) => tile.marked == 1).length);
  } 
  
  return (
    <Box
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      gap={4}
    >
      { cardScore !== undefined && (
        <h1 className="text-center py-4">Score: {cardScore}</h1>
      )}
      <SimpleGrid columns={5} spacing="5px">
        {cardState.tiles.map((tile) => (
          <BingoCardTile
            key={tile.order_number}
            card={card}
            tile={tile} 
            updateCardTile={(updatedTile) => handleCardTileUpdate(updatedTile)}
          />
        ))}
      </SimpleGrid>
      <Box paddingY={4} w="100%" display="flex" flexDirection="row" justifyContent="space-between" gap={4}>
        <Button flex="1" colorScheme="red" onClick={() => markedCount > 0 ? onOpen() : handleReset() }>Reset</Button>
        { markedCount == 25 && (
            <Button flex="1" colorScheme="green" onClick={() => handleScoreCard()}>Get Score</Button>
        )}    
        <Button flex="1" colorScheme="blue" onClick={() => handlePullNumber()}>Call Next Number</Button>
      </Box>
      <Box paddingY={4} w="100%" display="flex" flexDirection="row" justifyContent="space-between" gap={4}>
        <Button flex="1" colorScheme="gray" onClick={() => copyUrlToClipboard() }>Share Card</Button>
      </Box>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Reset Card?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to start a new bingo card?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleReset}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}