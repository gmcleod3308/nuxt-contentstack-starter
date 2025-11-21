import { NuxtLink } from '../../.nuxt/components';
<template>
    <nav v-if="loaded" class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <NuxtLink class="navbar-brand cyber-text" to="/">Nuxt/ContentStack/Starter</NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li v-for="navItem in navItems" class="nav-item">
                        <NuxtLink class="nav-link" :to="navItem.url">{{navItem.title}}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>

	const { data, error } = await useFetch('/api/main-navigation');

	const loaded = ref(false);
	const entries = computed(()=>{return data.value ? data.value.entries : [];})
	const navItems = computed(()=>{


		return entries.value.map((obj)=>{
			const d = obj.data;
			return {
				title: d.title,
				url: d.url
			}
		});
	});

	onMounted(()=>{
		loaded.value = true;
	});

</script>
<style scoped>
a.router-link-active{
	color: #ff0080;
}
</style>