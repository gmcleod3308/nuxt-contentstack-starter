// server/api/page.get.js
import { createContentstackStack } from '../utils/contentstack';

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const url = typeof query.url === 'string' && query.url.length ? query.url : '/';

		const Stack = createContentstackStack();

		// IMPORTANT: content type UID must be exactly "page"
		const csQuery = Stack.ContentType('page').Query();

		// Query by URL field (assuming your type uses the standard "url" field)
		csQuery.where('url', url);
		csQuery.toJSON();

		const result = await csQuery.find();


		// SDK returns: result[0] => entries array
		const entries = result?.[0] || [];
		const entry = entries[0] || null;

		if (!entry) {
			setResponseStatus(event, 404);
			return { error: `No entry found for URL: ${url}` };
		}

		return { entry };
	} catch (err) {
		console.error('Contentstack error in /api/page:', err);
		setResponseStatus(event, 500);
		return {
			error: 'Contentstack error in /api/page',
			details: err.message || String(err)
		};
	}
});
