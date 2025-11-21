import { createContentstackStack } from '../utils/contentstack';

export default defineEventHandler(async (event) => {
	try {
		
		const Stack = createContentstackStack();

		const data = await Stack.sync({
			init: true,
			query: { tags: 'MainNavigationPage' }
		});
		
		let entries = data.items;

		// keep only published entries
		entries = entries.filter((obj) => {
			return obj.type !== 'asset_published';
		});

		// sort by nav_position ASC
		entries.sort((a, b) => {
			const posA = a.data?.nav_position ?? 0;
			const posB = b.data?.nav_position ?? 0;
			return posA - posB;
		});

		console.log(entries);

		return { entries };

	} catch (err) {
		console.error('Contentstack error in /api/main-navigation:', err);
		setResponseStatus(event, 500);
		return {
			error: 'Contentstack error in /api/main-navigation',
			details: err.message || String(err)
		};
	}
});

