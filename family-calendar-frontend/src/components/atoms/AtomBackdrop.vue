<template>
	<Transition
		enter-active-class="animate__animated animate__faster animate__fadeIn"
		leave-active-class="animate__animated animate__faster animate__fadeOut">
		<div
			v-show="isShow"
			class="darkened-background"
			@click="$emit('clickBackdrop')">
        <slot></slot>
      </div>
	</Transition>
</template>

<script>
export default {
	name: 'AtomaBackdrop',
	props: {
		isShow: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.darkened-background {
	@include position($top: 0px, $left: 0px);
	width: 100vw;
	min-height: 100%;
	background: rgba($color: #000000, $alpha: 0.3);
	cursor: pointer;
}

@media only screen and (max-width: $small) {
	.darkened-background {
		min-height: 120vh;
	}
}
</style>
