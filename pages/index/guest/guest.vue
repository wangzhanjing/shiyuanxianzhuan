<template>
	<view class="content">
		<u-form :model="form" ref="uForm">
			<u-form-item label="物品名称:" prop="name" label-width="150rpx">
				<u-input v-model="form.name"  placeholder="请输入物品名称"/>
			</u-form-item>
			<u-form-item label="详细描述" prop="desc" label-width="150rpx">
					<!-- <textarea :value="form.desc" placeholder="请输入物品详细信息" /> -->
					<u-input type="textarea" height="160" autoHeight="true" v-model="form.name" placeholder="请输入详尽描述"/>
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}]
				}
			};
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 20rpx;
	}
</style>
