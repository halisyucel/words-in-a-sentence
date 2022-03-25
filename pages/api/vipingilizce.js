import { queryScheme } from '../../lib/api/global';
import { getSentences } from '../../lib/api/vipingilizce';

export default async (req, res) => {
	const { error, value } = queryScheme.validate(req.query);
	if (error)
		return res.status(400).json({
			status: false,
			message: error.message
		});
	else {
		const { error, data } = await getSentences({ word: value.word });
		if (error)
			return res.status(404).json({
				status: false,
				message: 'Not Found!'
			});
		else
			return res.status(200).json({
				status: true,
				data
			});
	}
};
