<template>
	<view class="content">
		<!-- 搜索框区域 -->
		<view class="sticky">
			<view class="search">
				<image src="../../static/image/select.jpg" @click="goSelect"></image>
			</view>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular="true">
			<swiper-item v-for="item in lunboList" :key="item.id">
				<image :src="item.url" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 主页导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="item in navList" :key="item.rank" @click="goNav(item.path)">
				<image :src="item.url" mode=""></image>
				<view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 瀑布流区域 -->
		<view class="box">
			<waterfallsFlow class="waterfallsFlow" :list="list" @wapper-lick="goDetial()">
				<view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
					<view class="cnt">

						<view class="name">{{item.name}}</view>
						<view class="price">
							<text>¥{{item.price}}</text>
							<text>{{item.pre_price}}</text>
						</view>
						<view class="desc">{{item.desc}}</view>

					</view>
				</view>
			</waterfallsFlow>
		</view>
	</view>
</template>

<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default {
		data() {
			return {
				lunboList: [{
						id: "1",
						url: "../../static/image/lunbo1.jpg"
					},
					{
						id: "2",
						url: "../../static/image/lunbo2.jpg"
					}, {
						id: "3",
						url: "../../static/image/lunbo3.jpg"
					}
				],
				navList: [{
						rank: "1",
						url: "../../static/image/shangdian.png",
						name: "猜你需要",
						path: "/pages/index/guest/guest"
					},
					{
						rank: "2",
						url: "../../static/image/shangdian.png",
						name: "大学书籍",
						path: "/pages/index/books/books"
					},
					{
						rank: "3",
						url: "../../static/image/shangdian.png",
						name: "兼职信息",
						path: "/pages/index/partwork/partwork"
					},
					{
						rank: "4",
						url: "../../static/image/shangdian.png",
						name: "更多分类",
						path: "/pages/index/allSort/allSort"
					}
				],
				list: []
			}
		},
		components: {
			waterfallsFlow
		},
		onLoad() {
			this.getGoodsList();
			
		},
		methods: {
			getGoodsList() {
				uniCloud.callFunction({
					name: 'getGoodsList',
					data: {},
					success: res => {
						this.list = res.result.data
						this.$u.randomArray(this.list)
					}
				})

			},
			goNav(path) {
				uni.navigateTo({
					url: path
				})
			},
			goSelect() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			goDetial(goodsId) {
				uni.navigateTo({
					url: "/pages/detial/detial?goodsId=" + goodsId
				})
			},

		}
	}
</script>

<style lang="scss">
	.content {
		.sticky {
			width: 750rpx;
			background-color: #FFFFFF;
			position: -webkit-sticky;
			position: sticky;
			top: var(--window-top);
			z-index: 19;
			// padding: 24rpx;
			// padding-top: 10rpx;

			.search {
				image {
					width: 750rpx;
					height: 90rpx;
				}
			}
		}

		swiper {
			width: 750rpx;
			height: 350rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.nav {
			width: 750rpx;
			display: flex;
			text-align: center;

			.nav_item {
				margin-top: 40rpx;
				width: 25%;

				image {
					width: 60rpx;
					height: 60rpx;
				}

				text {
					font-size: 30rpx;
				}
			}
		}

		.box {
			.name {
				font-size: 30rpx;
				margin-top: 5px;
				color: $u-main-color;
				font-weight: 600;
			}

			.price {
				display: flex;
				font-size: 30rpx;
				color: $u-type-error;
				margin-top: 5px;

				text {
					display: block;
				}

				text:nth-child(2) {
					margin-left: 10rpx;
					padding-top: 10rpx;
					font-size: 20rpx;
					text-decoration: line-through;
					color: #b3b3b3;
				}
			}

			.desc {
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
</style>
