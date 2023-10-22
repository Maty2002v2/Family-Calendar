<template>
	<Transition
		enter-active-class="animate__animated animate__faster animate__fadeIn"
		leave-active-class="animate__animated animate__faster animate__fadeOut">
		<div
			v-show="isShow"
			class="darkened-background"
			@click.self="$emit('clickBackdrop')">
        <slot></slot>
      </div>
	</Transition>
</template>

<script lang="ts">
export default {
	name: 'AtomBackdrop',
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
	@include position($position: fixed, $top: 0px, $bottom: 0px);
	width: 100vw;
	background: rgba($color: #000000, $alpha: 0.3);
	overflow: auto;
	cursor: pointer;
}

@media only screen and (max-width: $small) {
	.darkened-background {
		min-height: 105vh;
	}
}
</style>
