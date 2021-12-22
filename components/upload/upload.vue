<template>
	<view class="upload">
		<view class="item" v-for=" (item,index) in imgList" :key="index">
			<image :src="item" mode="" v-if="imgList!=''"></image>
		</view>
		<view class="item" v-for=" (item,index) in videoList" :key="index">
			<video :src="item" v-if="videoList!=''"></video>
		</view>
		<view class="btn" @click="chooseVideoImage" v-if="plus">
			<view class="box">
				<text class="plus">＋</text>
				<text>图片/视频</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				videoList: [],
				plus: true,
				number: 0
			};
		},
		methods: {
			chooseVideoImage() {
				uni.showActionSheet({
					title: '请选择上传类型',
					itemList: ['图片', '视频'],
					success: res => {
						if (res.tapIndex == 0) {
							this.chooseImages();
						} else {
							this.chooseVideo();
						}
					}
				});
			},
			chooseImages() {
				uni.chooseImage({
					count: 6 - this.number,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						this.imgList = this.imgList.concat(res.tempFilePaths);
						this.number = this.imgList.length + this.videoList.length;
						console.log(this.number);
						if (this.number == 6) {
							this.plus = false
						}
					}
				});
			},
			chooseVideo() {
				uni.chooseVideo({
					count: 6 - this.number,
					sourceType: ['camera', 'album'],
					success: (res) => {
						this.videoList = this.videoList.concat(res.tempFilePaths);
						this.number = this.imgList.length + this.videoList.length;
						if (this.number == 6) {
							this.plus = false
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload {
		width: 690rpx;
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 230rpx;
			height: 230rpx;
			box-sizing: border-box;
			padding: 15rpx;
		}
	
		video {
			width: 200rpx;
			height: 200rpx;
		}
	
		image {
			width: 200rpx;
			height: 200rpx;
		}
	
		.btn {
			width: 230rpx;
			height: 230rpx;
	
			.box {
				width: 200rpx;
				height: 200rpx;
				margin: 15rpx;
				background-color: #e3e3e3;
				padding-top: 30rpx;
				text-align: center;
				text {
					display: block;
				}
				.plus{
					font-size: 60rpx;
				}
			}
		}
	}
</style>
