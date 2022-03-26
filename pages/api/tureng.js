import { queryScheme } from '../../lib/api/global';

// TODO anasayfaya recaptcha ekelenecek ve bütün api istekleri ondan geçecek

export default async (req, res) => {
	const { error, value } = queryScheme.validate(req.query);
	if (error)
		return res.status(400).json({
			status: false,
			message: error.message
		});
	else {
		return res.status(200).json({
			status: true,
			data: 'ehu'
		});
	}
}
