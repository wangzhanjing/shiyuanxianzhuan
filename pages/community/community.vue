<template>
	<view class="content">
		<u-sticky>
			<view class="tabs">
				<text :class="tabId == index ? 'active':''" v-for="(item,index) in data" @click="changeTab(index)" :key='index'>{{item.tabName}}</text>
			</view>
		</u-sticky>
		<view class="tab_item1" v-if="tabId=='0'">
			<view class="item">
				<view class="top">
					<view class="left">
						<image src="../../static/image/alt.jpg" mode=""></image>
					</view>
					<view class="right">
						<text class="name">佳佳佳</text>
						<text>今天 13:14 这块是简介简介简介简介</text>
					</view>
				</view>
				<view class="middle">
					<view class="detial">
						今天自己做了一个圈子的评论的模块，真的成就感爆棚！！！！
					</view>
					<view class="photos">
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
					</view>
					<view class="opt">
						<image src="../../static/image/pinglun.png" mode=""></image>
						<image src="../../static/image/dianzan.png" mode=""></image>
						<image src="../../static/image/zhuanfa.png" mode=""></image>
					</view>
				</view>
				<view class="bottom">
					<view class="pinglun">
						<text>望穿秋水：123141415</text>
						<text>长天一色：123124124124</text>
					</view>
					<input placeholder="我也说两句..."></input>
				</view>
			</view>
			<view class="item">
				<view class="top">
					<view class="left">
						<image src="../../static/image/alt.jpg" mode=""></image>
					</view>
					<view class="right">
						<text class="name">佳佳佳</text>
						<text>今天 13:14 这块是简介简介简介简介</text>
					</view>
				</view>
				<view class="middle">
					<view class="detial">
						今天自己做了一个圈子的评论的模块，真的成就感爆棚！！！！
					</view>
					<view class="photos">
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
						<image src="../../static/image/alt.jpg"></image>
					</view>
					<view class="opt">
						<image src="../../static/image/pinglun.png" mode=""></image>
						<image src="../../static/image/dianzan.png" mode=""></image>
						<image src="../../static/image/zhuanfa.png" mode=""></image>
					</view>
				</view>
				<view class="bottom">
					<view class="pinglun">
						<text>望穿秋水：123141415</text>
						<text>长天一色：123124124124</text>
					</view>
					<input placeholder="我也说两句..."></input>
				</view>
			</view>
		</view>

		<view class="tab_item2" v-if="tabId=='1'">
			123456789
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
						tabName: '社区',
					},
					{
						tabName: '圈子',
					}
				],
				tabId: '0'
			};
		},
		methods: {
			changeTab(index) {
				if (index != this.tabId) {
					this.tabId = index
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
		height: 100%;

		.tabs {
			display: flex;
			text-align: center;
			background-color: #FFFFFF;
			text {
				display: block;
				width: 50%;
				line-height: 80rpx;
				height: 80rpx;
				font-size: 40rpx;
				color: #969696;
			}
			text.active{
				color: #000000;
			}
		}

		.tab_item1 {
			width: 100%;
			.item {
				width: 100%;
				box-sizing: border-box;
				padding: 10rpx 30rpx;
				margin-bottom: 15rpx;
				// background: #F1F1F1;
				// border-radius: 10rpx;
                border-bottom: 4rpx solid #717171;
				.top {
					display: flex;
					width: 100%;
					box-sizing: border-box;
					align-items: center;

					.left {
						image {
							height: 100rpx;
							width: 100rpx;
						}
					}

					.right {
						width: 100%;
						padding-left: 10rpx;

						text {
							display: block;
						}

						.name {
							font-size: 32rpx;
						}
					}
				}

				.middle {
					margin: 20rpx 0;
					width: 100%;

					.detial {
						font-size: 32rpx;
					}

					.photos {
						margin-top: 10rpx;

						image {
							box-sizing: border-box;
							vertical-align: bottom;
							padding: 5rpx;
							height: 230rpx;
							width: 230rpx;
						}
					}

					.opt {
						display: flex;
						margin-top: 20rpx;
						justify-content: flex-end;

						image {
							margin-left: 60rpx;
							height: 30rpx;
							width: 30rpx;
						}
					}
				}

				.bottom {
					text {
						line-height: 50rpx;
						display: block;
					}

					input {
						margin-top: 10rpx;
						border: 1rpx solid #6ca55c;
					}

				}
			}
		}
	}
</style>
