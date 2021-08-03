<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				<view v-if="isLoading">
					<m-for-skeleton
						:avatarSize="200"
						:row="3"
						:loading="isLoading"
						isarc="square"
						v-for="(item,key) in 10"
						:titleStyle="{}"
						:key="key"
						:title="false"
						>
					</m-for-skeleton>
				</view>
				<view class="index-list" v-else>
					<!--<view class="index-list-item">
						<view class="index-list-img">
							<image src="../../static/wangyiyunyinyue.png" mode=""></image>
							<text>每日更新</text>
						</view>
						<view class="index-list-text">
							<view>1.与我无关 - 阿冗</view>
							<view>1.与我无关 - 阿冗</view>
							<view>1.与我无关 - 阿冗</view>
						</view>
					</view> -->
					<view class="index-list-item" v-for="(item, index) in topList" :key="index" @tap="handleToList(item.listId)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(item, index) in item.tracks" :key="index">{{ index + 1 }} - {{ item.first }} -
								{{item.second}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '@/common/iconfont.css';
	import {
		topList
	} from '../../common/api.js'
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton";

	export default {
		data() {
			return {
				topList: [],
				isLoading: true
			}
		},
		components: {
			musichead,
			mForSkeleton
		},
		onLoad() {
			topList().then((res) => {
				if (res.length) {
					setTimeout(()=>{
						this.topList = res;
						this.isLoading = false
					}, 1000)
				}
			})
		},
		methods: {
			handleToList(listId) {
				uni.navigateTo({
					url: '/pages/list/list?listId=' + listId,
				});
			},
			handleToSearch(){
				uni.navigateTo({
					url: '/pages/search/search',
				});
			}
		}
	}
</script>

<style scoped>
	.index {}

	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f7f7f7;
		border-radius: 25px;
	}

	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx
	}

	.index-search input {
		font-size: 28rpx;
		flex: 1
	}

	.index-list {
		margin: 0 30rpx
	}

	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}

	.index-list-img {
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}

	.index-list-img image {
		width: 100%;
		height: 100%;
	}

	.index-list-img text {
		position: absolute;
		left: 12rpx;
		bottom: 12rpx;
		color: white;
		font-size: 20rpx;
	}

	.index-list-text {
		width: 400rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 24rpx;
		line-height: 66rpx;
	}
</style>
