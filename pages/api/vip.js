import { queryScheme } from '../../lib/api/global';
import { getSentences } from '../../lib/api/vip';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
	const { error, value } = queryScheme.validate(req.query);
	if (error)
		return res.status(400).json({ status: false, message: error.message });
	else {
		const data = await getSentences({ word: value.word });
		return res.status(200).json({ status: true, data });
	}
};
