import { baseUrl } from './config.js'

export function topList() {

	let listIds = ['19723756', '3779629', '2884035', '3778678']

	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length = 4;
				for (var i = 0; i < listIds.length; i++) {
					result[i].listId = listIds[i];
				}
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		});
	})
}

export function list(listId){
	return uni.request({
		url: `${ baseUrl }/playlist/detail?id=${listId}`,
		method: 'GET',
	});
}

// 歌曲详情
// http://localhost:3000/song/detail?ids=1864263318
export function songDetail(songId){
	return uni.request({
		url: `${ baseUrl }/song/detail?ids=${songId}`,
		method: 'GET',
	});
}

//相似歌曲
// http://localhost:3000/simi/song?id=1864263318
export function songSimi(songId){
	return uni.request({
		url: `${ baseUrl }/simi/song?id=${songId}`,
		method: 'GET',
	});
}

//歌曲评论
// http://localhost:3000/comment/music?id=1864263318
export function songComment(songId){
	return uni.request({
		url: `${ baseUrl }/comment/music?id=${songId}`,
		method: 'GET',
	});
}

//获取歌词
export function songLyric(songId){
	return uni.request({
		url: `${ baseUrl }/lyric?id=${songId}`,
		method: 'GET',
	});
}

//获取音乐Url
export function songUrl(songId){
	return uni.request({
		url: `${ baseUrl }/song/url?id=${songId}`,
		method: 'GET',
	});
}