<template>
    <main class="py-5">
		<LoadingSpinner v-if="!loaded"/>
        <div v-if="loaded" class="container">
            <div class="row mb-5">
                <div class="col-lg-10 mx-auto">
                    <h1 class="display-3 mb-4 text-center cyber-title">
                        <span class="glitch" data-text="ABOUT ME">{{mainHeadline}}</span>
                    </h1>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <div class="card cyber-card">
                        <div class="profile-image-container">
                            <img :src="headshot.url" 
                                 alt="Profile Picture" 
                                 class="img-fluid profile-image">
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card cyber-card h-100">
                        <div class="card-body">
                            <h2 class="card-title mb-4">{{openingStatementHeadline}}</h2>
							<div class="card-text" v-html="openingStatement"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <div class="card cyber-card h-100">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Tech Stack</h2>
                            <ul class="list-group list-group-flush cyber-list">
                                <li v-for="tech in techStack" class="list-group-item">
                                    <span class="skill-marker">▸</span> {{ tech.title}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card cyber-card h-100">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Similar Projects</h2>
                            <div class="mb-4" v-for="project in similarProjects">
                                <h5 class="cyber-text">{{project.title}}</h5>
                                <p class="mb-2">{{project.description}}</p>
                                <span v-for="tag in project.tag_group" class="badge bg-cyber">{{tag.label}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

</template>

<script setup>
const loaded = ref(false);
const { data, error, pending, status } = await useFetch('/api/content', {
	query: {
		content_type: 'about_page',
		url: '/about'
	}
});

const entry = computed(()=>{return data.value ? data.value.entry : null});
const headshot = computed(()=>{return entry.value ? entry.value.headshot : null});
const mainHeadline = computed(()=>{return entry.value ? entry.value.main_headline : null});
const openingStatement = computed(()=>{return entry.value ? entry.value.opening_statement : null});
const openingStatementHeadline = computed(()=>{return entry.value ? entry.value.opening_statement_headline : null});
const similarProjects = computed(()=>{return entry.value ? entry.value.similar_projects : null});
const techStack = computed(()=>{return entry.value ? entry.value.tech_stack : null});


onMounted(()=>{
	loaded.value = true;
})

</script>