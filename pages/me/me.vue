<template>
	<view class="content">
		<view class="header">
			<!-- 用户头像 -->
			<image class="alt" :src="userInfo.avatarUrl" mode="" v-if="userInfo.isLogin"></image>
			<image class="alt" src="../../static/image/alt2.jpg" mode="" v-else></image>
			<!-- 用户信息 -->
			<view class="info" v-if="userInfo.isLogin">
				<text class="name">{{userInfo.nickName}}</text>
				<text>欢迎来到石院闲转</text>
			</view>
			<view class="info" v-else @click="signIn">
				<text class="zhuce">注册/登录</text>
			</view>
			<image class="edit" src="../../static/image/edit.png" mode="" v-if="userInfo.isLogin"></image>
		</view>
		<view class="middle">
			<view class="item">
				<text>11</text>
				<text>收藏</text>
			</view>
			<view class="item">
				<text>11</text>
				<text>关注</text>
			</view>
			<view class="item">
				<text>11</text>
				<text>粉丝</text>
			</view>
		</view>
		<view class="nav">
			<view class="nav_item">
				<image src="../../static/image/student.png" mode=""></image>
				<text>学生认证</text>
			</view>
			<view class="nav_item">
				<image src="../../static/image/message.png" mode=""></image>
				<text>订阅消息</text>
			</view>
			<view class="nav_item">
				<image src="../../static/image/fabu.png" mode=""></image>
				<text>我的店铺</text>
			</view>
			<view class="nav_item">
				<image src="../../static/image/shoucang.png" mode=""></image>
				<text>我卖出的</text>
			</view>
			<view class="nav_item">
				<image src="../../static/image/goumai.png" mode=""></image>
				<text>我买到的</text>
			</view>
			<view class="nav_item">
				<image src="../../static/image/zhichi.png" mode=""></image>
				<text>支持一下</text>
			</view>
			<view class="nav_item">
				<image src="../../static/image/yijian.png" mode=""></image>
				<text>提提意见</text>
			</view>
		</view>
	</view>
</template>

<script>
	import cloudApi from '../../common/cloudApi.js'
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			this.userInfo = getApp().globalData.userInfo
			console.log(this.userInfo);
		},
		methods: {
			signIn() {
				uni.getUserProfile({
					desc: "用于该小程序注册",
					success: (res) => {
						// 把两个userInfo整合起来一起传过去
						this.userInfo = Object.assign(this.userInfo, res.userInfo)
						cloudApi.call({
							name: "updateuserInfo",
							data: {
								userInfo: this.userInfo
							},
							success:(res)=>{
								console.log(res.result[0]);
								this.userInfo= res.result[0]
							}
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;

		.header {
			width: 750rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 30rpx 40rpx 30rpx;
			background-color: #eed600;

			.alt {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				flex-shrink: 0; //防止头像被压缩变小
			}

			.info {
				width: 420rpx;

				text {
					display: block;
					margin-left: 30rpx;
					margin-top: 16rpx;
					font-size: 28rpx;
				}

				.zhuce {
					margin-left: 40rpx;
					font-size: 50rpx;
					color: green;
				}

				.name {
					font-size: 36rpx;
				}
			}

			.edit {
				margin-left: 20rpx;
				width: 80rpx;
				height: 80rpx;
			}
		}

		.middle {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 80rpx;
			text-align: center;

			text {
				display: block;
				font-size: 40rpx;
			}
		}

		.nav {
			width: 750rpx;

			.nav_item {
				box-sizing: border-box;
				padding: 0 40rpx;
				height: 100rpx;
				background-color: #F1F1F1;
				margin-bottom: 10rpx;
				display: flex;
				align-items: center;

				text {
					display: block;
					font-size: 40rpx;
				}

				image {
					margin-right: 20rpx;
					height: 80rpx;
					width: 80rpx;
				}
			}
		}
	}
</style>
