import { getRandomWord } from '../../lib/api/random';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  	const word = await getRandomWord();
	return res.status(200).json({ status: true, data: word });
}
