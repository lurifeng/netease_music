<template>
	<view class="detail">
		<view class="fixbg" :style="{ 'background-image': 'url(' + songDetail.al.picUrl + ')' }"></view>
		<musichead :title="songDetail.name" :icon="true" color="white"></musichead>
		<view class="container">
			<scroll-view scroll-y="true"  >
				<view class="detail-play">
					<image :src="songDetail.al.picUrl" mode=""></image>
					<text class="iconfont icon-suspend_icon"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap">
						<view class="detail-lyric-item">测试文字测试文字</view>
						<view class="detail-lyric-item active">测试文字测试文字</view>
						<view class="detail-lyric-item">测试文字测试文字</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也听</view>
					<!-- <view class="detail-like-item">
						<view class="detail-like-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>蓝</view>
							<view>
								<image src="../../static/dujia.png" mode=""></image>
								<image src="../../static/sq.png" mode=""></image>
								石白其 - 蓝
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view> -->
					<view class="detail-like-item" v-for="(item, index) in songSimi" :key="index">
						<view class="detail-like-img">
							<image :src="item.album.picUrl" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>{{ item.name }}</view>
							<view>
								<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70" src="../../static/dujia.png" mode=""></image>
								<image v-if="item.privilege.maxbr == 999000" src="../../static/sq.png" mode=""></image>
								{{ item.artists[0].name }} - {{ item.name }}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">精彩评论</view>
					<!-- <view class="detail-comment-item">
						<view class="detail-comment-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>是阿冗的冗</view>
									<view>2020年1月1日</view>
								</view>
								<view class="detail-comment-like">56027 <text class="iconfont icon-good"></text></view>
							</view>
							<view class="detail-comment-text">
								测试文字测试文字测试文字测试文字测试文字测试文字
							</view>
						</view>
					</view> -->
					<view class="detail-comment-item">
						<view class="detail-comment-img">
							<image src="../../static/logo.png" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>是阿冗的冗</view>
									<view>2020年1月1日</view>
								</view>
								<view class="detail-comment-like">56027 <text class="iconfont icon-good"></text></view>
							</view>
							<view class="detail-comment-text">
								测试文字测试文字测试文字测试文字测试文字测试文字
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '@/common/iconfont.css'
	import { songDetail, songSimi, songComment, songLyric, songUrl } from '../../common/api.js' 
	
	export default {
		data() {
			return {
				songDetail: {
					al : {}
				},
				songSimi: [
				
				]
			}
		},
		components:{
			musichead
		},
		onLoad(options){
			// console.log( options.songId )
			this.getMusic(options.songId)
		},
		methods: {
			getMusic(songId){
				Promise.all([ songDetail(songId), songSimi(songId), songComment(songId) ]).then((res)=>{
					if(res[0][1].data.code == '200'){
						this.songDetail = res[0][1].data.songs[0]
					}
					if(res[1][1].data.code == '200'){
						this.songSimi = res[1][1].data.songs
					}
				})
			}
		}
	}
</script>

<style scoped>
	.detail{}
	.detail-play{
		width: 580rpx;
		height: 580rpx;
		background: url(~@/static/disc.png);
		background-size: cover;
		margin: 214rpx auto 0 auto;
		position: relative;
	}
	.detail-play image{
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.detail-play text{
		width: 100rpx;
		height: 100rpx;
		font-size: 100rpx;
		color: white;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.detail-play view{
		width: 230rpx;
		height: 360rpx;
		background: url(~@/static/needle.png);
		position: absolute;
		top: -200rpx;
		left: 120rpx;
		right: 0;
		margin: auto;
		background-size: cover;
	}
	
	.detail-lyric{
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		overflow: hidden;
		color: #6f6e73;
	}
	.detail-lyric-wrap{}
	.detail-lyric-item{
		height: 82rpx;
	}
	.detail-lyric-item.active{
		color: white;
	}
	
	.detail-like{
		margin: 0 30rpx
	}
	.detail-like-head{
		font-size: 36rpx;
		color: white;
		margin: 50rpx 0;
	}
	.detail-like-item{
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;
	}
	.detail-like-img{
		width: 82rpx;
		height: 82rpx;
		border-radius: 20rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}
	.detail-like-img image{
		width: 100%;
		height: 100%;
	}
	.detail-like-song{
		flex: 1;
		color: #c6c2bf;
	}
	.detail-like-song view:nth-child(1){
		font-size: 28rpx;
		color: white;
		margin-bottom: 12rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 500rpx;
	}
	.detail-like-song view:nth-child(2){
		font-size: 22rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 500rpx;
	}
	.detail-like-song image{
		width: 26rpx;
		height: 20rpx;
		margin-right: 10rpx;
	}
	.detail-like-item text{
		font-size: 50rpx;
		color: #c6c2bf;
	}
	
	.detail-comment{
		margin:0 30rpx;
	}
	.detail-comment-head{
		font-size: 36rpx;
		color: white;
		margin: 50rpx 0;
	}
	.detail-comment-item{
		margin-bottom: 28rpx;
		display: flex;
	}
	.detail-comment-img{
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 18rpx;
	}
	.detail-comment-img image{
		width: 100%;
		height: 100%;
	}
	.detail-comment-content{
		flex: 1;
		color: #cbcacf;
	}
	.detail-comment-title{
		display: flex;
		justify-content: space-between;
	}
	.detail-comment-name{
		
	}
	.detail-comment-name view:nth-child(1){
		font-size: 26rpx;
	}
	.detail-comment-name view:nth-child(2){
		font-size: 18rpx;
	}
	.detail-comment-like{
		font-size: 28rpx;
	}
	.detail-comment-text{
		font-size: 28rpx;
		line-height: 40rpx;
		color: white;
		margin-top: 20rpx;
		border-bottom: 1px #e0e0e0 solid;
		padding-bottom: 40rpx;
	}
</style>
