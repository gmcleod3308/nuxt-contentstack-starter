import { NuxtLink } from '../../.nuxt/components';
<template>
	<div>
		<div class="cyber-grid"></div>
		
		<LoadingSpinner v-if="!loaded"/>
		<main v-if="loaded">
			<section class="hero-section  d-flex align-items-center">
				<div class="container">
					<div class="row">
						<div class="col-lg-8 mx-auto text-center">
							<h1 class="display-1 mb-4 cyber-title">
								<span class="glitch" data-text="WELCOME TO THE FUTURE">{{heroHeading}}</span>
							</h1>
							<div v-html="openingMessage" class="lead mb-5 cyber-text">

							</div>
							<div class="d-flex gap-3 justify-content-center flex-wrap">
								<NuxtLink :to="button.link.href" v-for="button in buttons" class="btn" :class="button.style_class">{{button.link.title}}</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="py-5">
				<div class="container">
					<div class="row g-4">
						<div v-for="service in services" class="col-md-4">
							<div class="card cyber-card h-100">
								<div class="card-body text-center">
									<div class="cyber-icon mb-3">{{service.service_icon}}</div>
									<h3 class="card-title">{{service.service_title}}</h3>
									<p class="card-text">{{service.service_description}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup>
const loaded = ref(false);
const { data, error, pending, status } = await useFetch('/api/content', {
	query: {
		content_type: 'home_page',
		url: '/'
	}
});

const entry = computed(()=>{return data.value ? data.value.entry : null});
const heroHeading = computed(()=>{return entry.value ? entry.value.hero_heading : null});
const openingMessage = computed(()=>{return entry.value ? entry.value.opening_message : null});
const services = computed(()=>{return entry.value ? entry.value.services : null});
const buttons = computed(()=>{return entry.value ? entry.value.buttons : null});

onMounted(()=>{
	loaded.value = true;
	console.log(buttons.value);
	console.log(services.value);
})

</script>
