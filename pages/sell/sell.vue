<template>
	<view class="content">
		<u-form :model="form" ref="uForm">
			<u-form-item prop="name">
				<view class="name">
					<text class=".text">物品名称:</text>
					<input v-model="form.name" type="text" placeholder="请输入物品名称" />
				</view>
			</u-form-item>
			<u-form-item prop="desc">
				<view class="detial">
					<text class=".text">详细描述:</text>
					<textarea v-model="form.desc" placeholder="请输入物品详细信息" />
					<view class="upload">
						<view class="item" v-for=" (item,index) in imgList" :key="index"
							@click.stop="previewImage(imgList,index)">
							<image :src="item" mode="" v-if="imgList!=''"></image>
							<u-icon name="close" color="#ff0000" size="30" class="close" @click.native.stop="deleteImg(index)">
							</u-icon>
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
				</view>
			</u-form-item>
			<u-form-item prop="sort">
				<view class="sort">
					<text class=".text">物品分类:</text>
					<uni-data-picker class="sel"  :localdata="items" popup-title="请选择物品分类"
						@change="change">
					</uni-data-picker>
				</view>
			</u-form-item>
			<u-form-item prop="price">
				<view class="price">
					<view class="item">
						<text class=".text">原价:</text><input v-model="form.pre_price" type="digit"
							placeholder="￥0.00" />
					</view>
					<view class="item">
						<text class=".text">现价:</text><input v-model="form.price" type="digit" placeholder="￥0.00" />
					</view>
				</view>
			</u-form-item>
			<view class="btn">
				<u-toast ref="uToast" />
				<button type="default" @click="commit">发布物品</button>
			</view>
		</u-form>
	</view>
</template>

<script>
	import cloudApi from '../../common/cloudApi.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					desc: '',
					sort: [],
					price: '',
					pre_price: ''
				},
				sel:'',
				show: false,
				imgList: [],
				imgList1: [],
				videoList: [],
				addTime:'',
				plus: true,
				number: 0,
				items: [{
						text: "电子产品",
						value: "1-0",
						children: [{
								text: "手机",
								value: ['电子产品', '手机']
							},
							{
								text: "电脑",
								value: ['电子产品', '电脑']
							}
						]
					},
					{
						text: "生活用品",
						value: "2-0",
						children: [{
								text: "床上桌子",
								value: ['生活用品', '床上桌子']
							},
							{
								text: "自行车",
								value: ['生活用品', '自行车']
							}
						]
					},
					{
						text: "其他",
						value: ['其他']
					}
				]
			}
		},
		onLoad() {
		},
		methods: {
			change(e) {
				const data = e.detail.value
				this.form.sort[0]=data[0].text
				if(data.length==2){
					this.form.sort[1]=data[1].text
				}
			},
			confirm(e) {
				this.selectDefault[0] = e[0].value
				this.selectDefault[1] = e[1].value
				this.selectShow[0] = e[0].label
				this.selectShow[1] = e[1].label
			},
			commit() {
				if (this.form.name == '') {
					this.$refs.uToast.show({
						title: '请输入物品名称',
						type: 'warning',
						icon: false
					})
					return
				} else if (this.form.desc == '') {
					this.$refs.uToast.show({
						title: '请输入详细描述',
						type: 'warning',
						icon: false
					})
					return
				} else if (this.form.sort == '') {
					this.$refs.uToast.show({
						title: '请选择物品分类',
						type: 'warning',
						icon: false
					})
					return
				} else if (this.form.price == '') {
					this.$refs.uToast.show({
						title: '请输入物品价格',
						type: 'warning',
						icon: false
					})
					return          
				}
				this.getCurrentTime()
				cloudApi.call({
					name:'addGoods',
					data:{
						name:this.form.name,
						desc:this.form.desc,
						sort:this.form.sort,
						price:this.form.price,
						pre_price:this.form.pre_price,
						addTime:this.addTime,
						show_img:this.imgList1
					},
					success:res=>{
						console.log('成功');
						this.form={}
					},
					fail: msg => {
						console.log("失败");
					}
				})
			},
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
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						uniCloud.uploadFile({
						            filePath:res.fileID,//当前图片路径
						            cloudPath:'goodSImg',//文件夹名
						            success: (res1) => {
						                this.imgList1 = this.imgList1.concat(res1.fileID);
						            },
						        })
						this.imgList = this.imgList.concat(res.tempFilePaths);
						this.number = this.imgList.length + this.videoList.length;
						// console.log(this.number);
						if (this.number == 6) {
							this.plus = false
						}
						// console.log(this.imgList);
						console.log(this.imgList1);
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
			},
			previewImage(imgList, index) {
				uni.previewImage({
					urls: imgList,
					current: index,
				})
			},
			deleteImg(index) {
				console.log(index);
				this.imgList.splice(index,1);
				console.log(this.imgList);
			},
			getCurrentTime () {
			      // 获取当前时间并打印
			      const yy = new Date().getFullYear();
			      const mm = new Date().getMonth() + 1;
			      const dd = new Date().getDate();
			      const hh = new Date().getHours();
			      const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			      const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
			      // this.addtime =yy + '年' + mm + '月' + dd + '日'+ hh + ':' + mf + ':' + ss;
			      this.addTime =''+yy + mm + dd +  hh  + mf + ss;
			      console.log(this.addTime);
						 // this.addTime = this.addTime.substring(0,4) + '年' + this.addTime.substring(4,6) + '月' + this.addTime.substring(6,8) + '日'
						 // console.log(this.addTime);
			    }
		}
	}
</script>

<style lang="scss">
	.content {
		box-sizing: content-box;

		.text {
			width: 150rpx;
			display: block;
			// padding: 20rpx 0;
			font-size: 28rpx;
		}

		input {
			width: 490rpx;
			font-size: 28rpx;
		}

		.name {
			padding: 0 30rpx;
			display: flex;
			align-items: center;
		}

		.detial {
			padding: 0 30rpx;

			textarea {
				height: 360rpx;
				margin-top: 20rpx;
				// background-color: #aaffff;
				width: 690rpx;
				font-size: 28rpx;
			}
		}

		.sort {
			padding: 0 30rpx;
			display: flex;
			align-items: center;

			.sel {
				width: 490rpx;
			}
		}

		.price {
			padding: 0 30rpx;
			margin-bottom: 20rpx;

			.item {
				display: flex;
				align-items: center;
			}
		}

		.btn {
			button {
				width: 500rpx;
				color: white;
				background-color: #4ed6ff;
			}
		}
	}

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

		.close {
			position: relative;
			top: -240rpx;
			right: -170rpx;
			width: 30rpx;
			height: 30rpx;
			z-index: 3;
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

				.plus {
					font-size: 60rpx;
				}
			}
		}
	}
</style>
