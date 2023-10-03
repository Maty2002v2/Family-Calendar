<template>
	<molecule-modal
		:isShow="getShowModalOfNewCalendar"
		@closeModal="switchShowModalOfNewCalendar(false)">
		<div class="modal-of-new-calendar">
			<atom-title tag="h2" class="modal-of-new-calendar__h2">
				<span v-html="t('startAlert.hereIsYourCode')"></span>
				<span
					class="modal-of-new-calendar__thickening-span modal-of-new-calendar__hash"
					ref="codeSpan"
					@click="copyHash">
					{{ getCalendarHash }} </span
				>.
			</atom-title>
			<p v-html="t('startAlert.youCanShare')" class="modal-of-new-calendar__p"></p>
			<molecule-pill-button
				class="modal-of-new-calendar__button"
				@click="closeAndCopy"
				>{{ t('close') }}</molecule-pill-button
			>
		</div>
	</molecule-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AtomTitle from '../atoms/AtomTitle.vue';
import MoleculePillButton from '@/components/molecules/MoleculePillButton.vue';
import MoleculeModal from '@/components/molecules/MoleculeModal.vue';

import { storeToRefs } from 'pinia';
import { useCalendarApiStore } from '../../stores/CalendarApiStore';
import { useMainStore } from '../../stores/MainStore';
import { useCopyText } from '../../composables/useCopyText';

export default defineComponent({
	name: 'MoleculeModalOfNewCalendar',
	components: {
		AtomTitle,
		MoleculePillButton,
		MoleculeModal,
	},
	emits: ['closeModal'],
	setup(props, { emit }) {
		const { getShowModalOfNewCalendar } = storeToRefs(useMainStore());
		const { switchShowModalOfNewCalendar } = useMainStore();

		const { getCalendarHash } = storeToRefs(useCalendarApiStore());

		const { copyTextToClipboard, copyTextState } = useCopyText();
		const { t } = useI18n();

		const codeSpan = ref();
		const closeAndCopy = () => switchShowModalOfNewCalendar(false);

		const closeModal = () => {
			emit('closeModal');
		};

		const copyHash = () => {
			copyTextToClipboard(getCalendarHash.value);
		};

		return {
			copyTextState,
			getCalendarHash,
			getShowModalOfNewCalendar,
			codeSpan,
			switchShowModalOfNewCalendar,
			closeAndCopy,
			closeModal,
			copyHash,
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
.modal-of-new-calendar {
	@include flexbox;
	@include align-items(center);
	@include flex-direction(column);
	gap: 20px;
	width: 500px;
	padding: 30px;
	border-radius: 5px;
	margin: 20px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	text-align: center;
	color: $active-day;

	background: $background-color;

	&__hash {
		display: inline-block;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none;
		cursor: pointer;

		&:active {
			transition: all 0.2 ease-in-out;
			transform: scale(0.9);
		}
	}

	&__h2 {
		margin: 20px 0px 15px 0px;
		font-size: 30px;
		font-weight: 500;
		letter-spacing: 1px;
		line-height: 40px;
	}

	&__p {
		font-weight: 500;
		letter-spacing: 1px;
	}

	&__thickening-span {
		font-weight: 600;
	}

	&__button {
		max-width: 200px;
		height: auto;
	}
}
</style>
