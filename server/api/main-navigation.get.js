// server/api/main-navigation.get.js
import { createContentstackStack } from '../utils/contentstack';

export default defineEventHandler(async (event) => {
	try {
		
		const Stack = createContentstackStack();

		const data = await Stack.sync({ init: true, query: { tags: "MainNavigationPage" } });
		
		let entries = data.items;
		entries = entries.filter((obj)=>{
			return obj.type !== 'asset_published'
		})

		return {entries};

	} catch (err) {
		console.error('Contentstack error in /api/main-navigation:', err);
		setResponseStatus(event, 500);
		return {
			error: 'Contentstack error in /api/main-navigation',
			details: err.message || String(err)
		};
	}
});
