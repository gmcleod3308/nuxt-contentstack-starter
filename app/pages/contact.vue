<template>
    <main class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <h1 class="display-3 mb-5 text-center cyber-title">
                        <span class="glitch" data-text="STAY IN TOUCH">{{mainHeadline}}</span>
                    </h1>

                    <div class="card cyber-card">
                        <div class="card-body p-4 p-md-5">
                            <form>
                                <div 
                                v-for="field in formFields" 
                                :key="field.label" 
                                class="mb-4">
									<div v-if="field.type === TEXT">
										<label for="fullName" class="form-label cyber-text">{{field.label}}</label>
										<input type="text" 
											class="form-control cyber-input" 
											id="fullName" 
											:placeholder="field.placeholder" 
											required>
									</div>
									<div v-if="field.type === PHONE">
										<label for="fullName" class="form-label cyber-text">{{field.label}}</label>
										<input type="tel" 
											class="form-control cyber-input" 
											id="fullName" 
											:placeholder="field.placeholder" 
											required>
									</div>
									<div v-if="field.type === EMAIL">
										<label for="fullName" class="form-label cyber-text">{{field.label}}</label>
										<input type="email" 
											class="form-control cyber-input" 
											id="fullName" 
											:placeholder="field.placeholder" 
											required>
									</div>
									<div v-if="field.type === TEXTAREA">
										<label for="message" class="form-label cyber-text">{{field.label}}</label>
										<textarea class="form-control cyber-input" 
												id="message" 
												rows="5" 
												:placeholder="field.placeholder"
												required></textarea>
									</div>
                                </div>

                                <div class="form-check mb-4">
                                    <input class="form-check-input cyber-checkbox" 
                                           type="checkbox" 
                                           value="" 
                                           id="newsletter">
                                    <label class="form-check-label cyber-text" for="newsletter">
                                        Subscribe to newsletter for updates and insights
                                    </label>
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn btn-cyber btn-lg">
                                        TRANSMIT MESSAGE
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                    <div class="row mt-5 g-4">
                        <div 
                        v-for="cp in contactPoints" 
                        :key="cp.label"
                        class="col-md-4">
                            <div class="card cyber-card h-100">
                                <div class="card-body text-center">
                                    <div class="cyber-icon-small mb-2">{{cp.icon}}</div>
                                	<a v-if="cp.type === EMAIL" class="contact-point" :href="`mailto:`+cp.label">{{cp.label}}</a>
									<a v-if="cp.type === PHONE" class="contact-point" :href="`tel:`+cp.label">{{cp.label}}</a>
									<a v-if="cp.type === LOCATION" class="contact-point" target="_blank" :href="`https://www.google.com/maps?q=`+cp.label">
										{{cp.label}}
									</a>
                                </div>
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
		content_type: 'contact_page',
		url: '/contact'
	}
});
const TEXT = "text";
const TEXTAREA = "textarea";
const EMAIL = "email";
const PHONE = "phone";
const LOCATION = "location";

const entry = computed(()=>{return data.value?.entry ?? null});
const mainHeadline = computed(()=>{return entry.value?.main_headline ?? null});
const formFields = computed(()=>{return entry.value?.form_fields ?? null});
const contactPoints = computed(()=>{return entry.value?.contact_points ?? null});

onMounted(()=>{
	loaded.value = true;
})

</script>
<style scoped>
	.contact-point{
		color: white;
		text-decoration: none;
	}
</style>