'use client'

import { markTile } from "@/app/actions";
import { CardType } from "@/types/Card";
import { CardTileType } from "@/types/CardTile";
import { Box, useToast } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons';

export default function BingoCardTile(
  { card, tile, updateCardTile }: { card: CardType, tile: CardTileType, updateCardTile: (cardTile: CardTileType) => void }) {
  const toast = useToast();

  const attemptToMarkTile = async (tile: CardTileType) => {
    if (tile.marked == 1) {
      return;
    }
    try {
      const response = await markTile(card.id as string, tile.id as string);
      if(response.status === 200) {
        updateCardTile({ ...tile, marked: 1})
        toast({
          title: 'Number is marked!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right'
        });
      }
    } catch (error) {
      toast({
        title: 'You cannot mark that number!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      });
    }
  }

  return (
    <Box
      key={tile.order_number}
      w="100px"
      h="100px"
      bg="gray.200"
      borderRadius="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      onClick={() => attemptToMarkTile(tile)}
    >

      {!!tile.marked && (
        <Box
          w="100%"
          h="100%"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="end"
        >
          <CheckIcon boxSize={10} color="red" />
        </Box>
      )}
      {tile.randomised_number}

    </Box>
  );
}