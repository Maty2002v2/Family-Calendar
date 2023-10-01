<template>
	<atom-backdrop
		class="app-modal"
		:isShow="isShow"
		@clickBackdrop="closeModal">
		<Transition
			enter-active-class="animate__animated animate__faster animate__backInDown"
			leave-active-class="animate__animated animate__faster animate__fadeOut">
			<div
				v-show="isShow"
				class="app-modal__slot">
				<slot></slot>
			</div>
		</Transition>
	</atom-backdrop>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import AtomBackdrop from '@/components/atoms/AtomBackdrop.vue';
import { useMainStore } from '@/stores/MainStore';

export default defineComponent({
	name: 'MoleculeModal',
	components: {
		AtomBackdrop,
	},
	props: {
		isShow: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	emits: ['closeModal'],
	setup(props, { emit }) {
		const { switchAppModalState	} = useMainStore(); 

		const closeModal = () => {
			emit('closeModal');
		};

		watch(
			() => props.isShow, 
			(newValue) =>{
				switchAppModalState(newValue);
			}
		)

		return { closeModal };
	},
});
</script>

<style lang="scss" scoped>
.app-modal {
	padding-top: 10vh;
	padding-bottom: 10vh;
	box-sizing: border-box;

	&__slot {
		@include flexbox;
		max-width: 500px;
		@include margin-auto;
		cursor: default;
	}
}
</style>
