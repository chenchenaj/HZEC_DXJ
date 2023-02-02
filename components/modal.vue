<template>
	<view v-if="showModal">
		<view class="m_modal full_fix flex_c_c" @touchmove.stop.prevent="moveHandle" @click='close'>
			<slot>弹窗内容</slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: 0
			};
		},
		props: {
			styles: {
				type: String,
				default: 'flex_c_c'
			}
		},
		methods: {
			moveHandle() {},
			close() {
				this.showModal = 0
			},
			open() {
				this.showModal = 1
			}
		}
	}
</script>

<style>
	.m_modal {
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 99;
	}
</style>
