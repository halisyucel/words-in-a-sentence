import Joi from 'joi';

export const queryScheme = Joi.object({
	word: Joi.string().required().min(2).trim(),
});
