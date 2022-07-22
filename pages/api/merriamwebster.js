import { getMerriamWebsterData } from '../../lib/api/merriamwebster';
import { validate } from '../../lib/helper';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
	const { error, value } = validate(req);
	if (error) return res.status(400).json({ status: false, message: error.message });
	
    const data = await getMerriamWebsterData({ word: value.word });
    return res.status(200).json({ status: true, data });
};
