// server/utils/contentstack.js
import Contentstack from 'contentstack';

export function createContentstackStack() {
	const { contentstack } = useRuntimeConfig();

	if (!contentstack?.apiKey || !contentstack?.deliveryToken || !contentstack?.environment) {
		console.error('Contentstack runtimeConfig is missing values:', contentstack);
		throw new Error('Contentstack config missing. Check nuxt.config runtimeConfig.');
	}

	const options = {
		api_key: contentstack.apiKey,
		delivery_token: contentstack.deliveryToken,
		environment: contentstack.environment
	};

	if (contentstack.region && contentstack.region.toUpperCase() !== 'US') {
		options.region = Contentstack.Region[contentstack.region.toUpperCase()];
	}

	const Stack = Contentstack.Stack(options);

	return Stack;
}
