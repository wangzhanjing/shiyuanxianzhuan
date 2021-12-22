<template>
	<view class="content">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular="true">
			<swiper-item v-for="item in lunboList" :key="item.id">
				<image :src="item.url" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="message">
			<view class="box1">
				<view class="price">
					<text>￥520</text>
					<text>￥1314</text>
				</view>
				<view class="goodName">
					<text>床上书桌</text>
					<image src="../../static/image/share.png" mode=""></image>
				</view>
			</view>
			<view class="fenge">
			</view>
			<view class="box2">
				<text>详细信息</text>
				<text>实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌实用床上书桌到头了</text>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<view class="bottom">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				lunboList: [{
						id: "1",
						url: "../../static/image/store2.jpg"
					},
					{
						id: "2",
						url: "../../static/image/lunbo2.jpg"
					}, {
						id: "3",
						url: "../../static/image/lunbo3.jpg"
					}
				],
				options: [{
					icon: 'headphones',
					text: '联系卖家'
				}, {
					icon: 'shop',
					text: '收藏',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
	},
	onLoad(e) {
		console.log(e.goodsId)
	},
	components: {
		uniGoodsNav
	}
	}
</script>

<style lang="scss">
	.content {
		swiper {
			width: 750rpx;
			height: 500rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.message {
			.box1 {
				padding: 10rpx 25rpx 20rpx 25rpx;

				.price {
					text {
						height: 70rpx;
						line-height: 70rpx;
						color: red;
						display: inline-block;
						margin-right: 20rpx;
						font-size: 45rpx;
					}

					text:nth-child(2) {
						font-size: 30rpx;
						color: #b1b1b1;
						text-decoration: line-through;
					}
				}

				.goodName {
					display: flex;
					align-items: center;
					justify-content: space-between;
					text {
						display: block;
						width: 610rpx;
						font-size: 35rpx;
					}

					image {
						width: 60rpx;
						height: 60rpx;
						vertical-align: middle;
					}
				}
			}

			.box2 {
				padding: 10rpx 25rpx 110rpx 25rpx;
				text {
					display: inline-block;
					
				}

				text:first-child {
					font-size: 50rpx;
					margin-bottom: 10rpx;
					color: red;
				}
			}

			.fenge {
				height: 40rpx;
				width: 750rpx;
				background-color: #f4f4f4;
			}
		}
		.bottom{
			width: 750rpx;
			position: fixed;
			bottom: 0;
			z-index: 3;
		}
	}
</style>
