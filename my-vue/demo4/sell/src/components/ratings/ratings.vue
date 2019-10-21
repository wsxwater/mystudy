<template>
  <div class="tab-pane ratings">
    <div class="ratings-content">
    	<div class="overview">
    		<div class="leftarea">
					<h1 class="score">{{wsx_seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{wsx_seller.rankRate}}%</div>
    		</div>
    		<div class="rightarea"></div>
    	</div>
    </div>
  </div>
</template>

<script>
	// import BScroll from 'better-scroll';
  export default {
  	props: {
  		wsx_seller: {
  			type: Object
  		}
  	},
  	data () {
  		return {
  			ratings: []
  		};
  	},
  	created () {
  		const ERR_OK = 0;
  		this.$http.get('/api/ratings').then((response) => {
  			response = response.body;
  			if (response.errno === ERR_OK) {
  			  this.ratings = JSON.parse(JSON.stringify(response.data));
  			}
  		});
  	}
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
	.ratings
		position absolute
		top 174px
		left 0
		bottom 0
		width 100%
		overflow hidden
		.overview
			display flex
			padding 18px 0
			.leftarea
				flex 0 0 137px
				width 137px
				text-align center
				border-right 1px solid rgba(7,17,27,0.1)
				padding 6px 0
				.score
					font-size 24px
					line-height 28px
					color rgb(255,153,0)
					margin-bottom 6px
				.title
					font-size 12px
					line-height 12px
					color rgb(7,17,27)
					margin-bottom 8px
				.rank
					font-size 10px
					line-height 10px
					color rgb(147,153,159)
			.rightarea
				flex 1
				padding-left 24px
</style>
