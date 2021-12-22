<script>
	import cloudApi from './common/cloudApi.js'
	export default {
		globalData:{
			userInfo:{}
		},
		 onLaunch() {
			 setTimeout(()=>{
				 uni.login({
				 	provider: 'weixin',
				 	success: (res) => {
				 		var code = res.code
				 		cloudApi.call({
				 			name: "login",
				 			data: {
				 				code: code
				 			},
				 			success: (res) => {
				 				if(res.result){
				 					getApp().globalData.userInfo = res.result
									// console.log(getApp().globalData.userInfo);
				 				}
				 				
				 			}
				 		})
				 
				 	},
				 });
			 },0)
			
			
		},
		onShow () {

		},
		onHide () {

		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
