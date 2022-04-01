import { v2 } from '@google-cloud/translate';
import Redis from 'ioredis';
import {createSlug} from '../helper';

const { Translate } = v2;

const translateClient = new Translate({
	credentials: {
		type: process.env.GOOGLE_TRANSLATE_API__TYPE,
		project_id:	process.env.GOOGLE_TRANSLATE_API__PROJECT_ID,
		private_key_id: process.env.GOOGLE_TRANSLATE_API__PRIVATE_KEY_ID,
		private_key: JSON.parse(process.env.GOOGLE_TRANSLATE_API__PRIVATE_KEY)['key'],
		client_email: process.env.GOOGLE_TRANSLATE_API__CLIENT_EMAIL,
		client_id: process.env.GOOGLE_TRANSLATE_API__CLIENT_ID,
		auth_uri: process.env.GOOGLE_TRANSLATE_API__AUTH_URI,
		token_uri: process.env.GOOGLE_TRANSLATE_API__TOKEN_URI,
		auth_provider_x509_cert_url: process.env.GOOGLE_TRANSLATE_API__AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.GOOGLE_TRANSLATE_API__CLIENT_X509_CERT_URL
	},
	projectId: process.env.GOOGLE_TRANSLATE_API__PROJECT_ID
});

const redisClient = new Redis(
	`rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
);

export const translate = async ({ text }) => {
	try {
		const redisValue = await redisClient.get(createSlug(text));
		if (redisValue === null) {
			const translation = (await translateClient.translate(text, 'tr'))[0];
			await redisClient.set(createSlug(text), translation);
			return translation;
		} else
			return redisValue;
	} catch (error) {
		return (await translateClient.translate(text, 'tr'))[0];
	}
};