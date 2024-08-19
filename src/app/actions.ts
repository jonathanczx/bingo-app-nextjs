import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createGame(name: string) {
  try {
    const response = await axios.post(baseUrl + '/api/cards', { name });

    if (response.status == 200) {
      const cardResponse = response.data;
      return cardResponse;
    } else {
      console.log('Failed to create game');
    }
  } catch (error) {
    console.error('An error occurred while creating the game:', error);
  }
}

export async function getCard(id: string) {
  try {
    const response = await axios.get(baseUrl + `/api/cards/${id}`);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching the card:', error);
  }
}

export async function markTile(cardId: string, tileId: string) {
    return axios.put(baseUrl + `/api/cards/${cardId}/${tileId}/mark-number`);
}

export async function pullNumber(cardId: string) {
    return axios.post(baseUrl + `/api/cards/${cardId}/pull-number`);
}

export async function scoreCard(cardId: string) {
    return axios.put(baseUrl + `/api/cards/${cardId}/score`);
}

export async function getLeaderboard() {
    return axios.get(baseUrl + '/api/cards/leaderboard');
}
