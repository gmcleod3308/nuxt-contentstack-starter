<template>
	<div class="loading-spinner">
		<i class="fa-sharp-duotone fa-solid fa-grid-round-2 spinner-icon"></i>
	</div>
</template>

<script setup>
</script>

<style scoped>
.loading-spinner {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 100px 0;
}

.spinner-icon {
	font-size: 32px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
