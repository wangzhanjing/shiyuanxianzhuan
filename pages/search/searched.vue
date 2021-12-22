<template>
	<view class="content">
		<view class="sticky">
			<view class="search">
				<input maxlength="20" placeholder="请输入关键词搜索" @click="goSelect" v-model="content" />
				<image src="../../static/zy-search/search.svg" mode="aspectFit" class="search-icon"></image>
			</view>
			<u-dropdown active-color="#ff9900">
				<u-dropdown-item @change="queue" v-model="value1" :title="value1" :options="options1"></u-dropdown-item>
				<u-dropdown-item @change="queue" v-model="value2" :title="value2" :options="options2"></u-dropdown-item>
			</u-dropdown>  
		</view>
			
		<view class="box">
			<waterfallsFlow class="waterfallsFlow" :list="list" @wapper-lick="chakan()">
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
		components: {
			waterfallsFlow
		},
		data() {
			return {
				content: '1234',
				value1: '综合排序',
				value2: '不限',
				options1: [{
						label: '综合排序',
						value: '综合排序',
					},
					{
						label: '价格由高到低',
						value: '价格由高到低',
					},
					{
						label: '价格由低到高',
						value: '价格由低到高',
					}
				],
				options2: [{
						label: '不限',
						value: '不限',
					},
					{
						label: '三天内',
						value: '三天内',
					},
					{
						label: '一周内',
						value: '一周内',
					}
				],
				list: []
			}
		},
		mounted() {
			this.getGoodsList()
		},
		methods: {
			getGoodsList(){
				uniCloud.callFunction({
					name:'getGoodsList',
					data:{				
					},
					success:res => {
						this.list = res.result.data
					}
				})
			},
			goSelect() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
				console.log('111')
			},
			goDetial(goodsId) {
				uni.navigateTo({
					url: "/pages/detial/detial?goodsId=" + goodsId
				})
			},
			chakan(e) {
				console.log(e)
			},
			queue(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.sticky {
			width: 750rpx;
			background-color: #fff;
			color: #fff;
			position: -webkit-sticky;
			position: sticky;
			top: var(--window-top);
			z-index: 19;

			.search{
				width: 700upx;
				margin: 10upx auto 0;
				position: relative;
				input{
					background-color: #F7F7F7;
					padding: 10upx 74upx;
					font-size: 28upx;
					border-radius: 50upx;
					color: black;
				}
				.search-icon{
					width: 36upx;
					height: 36upx;
					padding: 16upx 20upx 16upx 0;
					position: absolute;
					right: 0;
					top: -2upx;
					z-index: 10;
				}
			}	
		}
		.box{
			.name{
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
				text{
					display: block;
				}
				text:nth-child(2){
					margin-left: 10rpx;
					padding-top: 10rpx;
					font-size: 20rpx;
					text-decoration: line-through;
					color: #b3b3b3;
				}
			}
			.desc{
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
