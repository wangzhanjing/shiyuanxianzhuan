<template>
	<view class="content">
		<view class="title">
			<text>热销产品</text>
		</view>
		<view class="wrap">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="goDetial(item.shop)">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.name}}
						</view>
						<view class="demo-price">
							{{item.price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
						<view class="demo-shop">
							{{item.shop}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
							@click="remove(item.id)"></u-icon>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="goDetial(item.shop)" >
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index">
						</u-lazy-load> 
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
						<view class="demo-shop">
							{{item.shop}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
							@click="remove(item.id)"></u-icon>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				flowList: [],
				list: [{
						shop: '1',
						path: "/pages/detial/detial",
						name: "床上书桌",
						price: 520,
						image: "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
					},
					{
						shop: '2',
						path: "/pages/detial/detial",
						name: "床上书桌",
						price: 520,
						image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F28%2F20210428174920_6e57a.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637227527&t=e19636286c2c98f58b14931c3c51b1a0",
					},
					{
						shop: '3',
						path: "/pages/detial/detial",
						name: "床上书桌",
						price: 520,
						image: "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
					},
					{
						shop: '4',
						path: "/pages/detial/detial",
						name: "床上书桌",
						price: 520,
						image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F28%2F20210428174920_6e57a.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637227527&t=e19636286c2c98f58b14931c3c51b1a0",
					}, {
						shop: '5',
						path: "/pages/detial/detial",
						name: "床上书桌",
						price: 520,
						image: "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
					},
					{
						shop: '6',
						path: "/pages/detial/detial",
						name: "床上书桌",
						price: 520,
						image: "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
					}
				]
			}
		},
		methods: {
			addRandomData() {
				for (let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = this.$u.guid();
					this.flowList.push(item);
				}
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			goNav(path) {
				uni.navigateTo({
					url: path
				})
			},
			goDetial(shop) {
				console.log(shop)
				uni.navigateTo({
					url: "/pages/detial/detial"
				})
			}
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		onLoad() {
			this.addRandomData();
		},
	}
</script>

<style lang="scss" scoped>
.content{
	.title{
		padding: 20rpx;
		background-color:#daffa2;
		text-align: center;
		text{
			font-size: 50rpx;
		}
	}
}
.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>
