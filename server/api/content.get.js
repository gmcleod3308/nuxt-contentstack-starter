// server/api/content.get.js
import { createContentstackStack } from '../utils/contentstack';

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);

		// Allow dynamic content type (default: "page")
		const contentType =
			typeof query.content_type === 'string' && query.content_type.length
				? query.content_type
				: 'page';

		// Allow dynamic URL (default: "/")
		const url =
			typeof query.url === 'string' && query.url.length
				? query.url
				: '/';

		const Stack = createContentstackStack();

		// Dynamically query based on content_type
		const csQuery = Stack.ContentType(contentType).Query();

		// Query by URL field
		csQuery.where('url', url);
		csQuery.toJSON();

		const result = await csQuery.find();

		const entries = result?.[0] || [];
		const entry = entries[0] || null;

		if (!entry) {
			setResponseStatus(event, 404);
			return { error: `No entry found for ${contentType} with URL: ${url}` };
		}

		return { entry };
	} catch (err) {
		console.error(`Contentstack error in /api/content:`, err);
		setResponseStatus(event, 500);
		return {
			error: 'Contentstack error in /api/content',
			details: err.message || String(err),
		};
	}
});
