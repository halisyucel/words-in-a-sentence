import { translate } from '../../lib/api/gtranslate';
import { queryScheme } from '../../lib/api/global';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
	const { error, value } = queryScheme.validate(req.query);
	if (error)
		return res.status(400).json({ status: false, message: error.message });
	else {
		const text = await translate({ text: value.word });
		return res.status(200).json({status: true, data: text });
	}
}
