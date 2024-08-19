import { CardTileType } from './CardTile';

export type CardType = {
  id: string|number
  name: string
  score?: number
  call_count: number
  tiles: CardTileType[]
};