<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
        </div>
        <div class="food-body">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartctrl-wrap">
            <cartctrl :food="food"></cartctrl>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <splits v-show="food.info"></splits>
        <div class="food-body info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <div class="text">{{food.info}}</div>
        </div>
        <splits></splits>
        <div class="food-body rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @increment="incrementTotal" :ratings="food.ratings" :desc="desc" :only-content="onlyContent" :select-type.sync="selectType"></ratingselect>
          <div class="ratings-wrap">
            <ul class="list-group" v-show="food.ratings && food.ratings.length">
              <li class="list-group-item" :key="item.username" v-for="item in food.ratings">
                  <div class="user">
                    <span class="uname">{{item.username}}</span><img class="avatar" width="12" height="12" :src="item.avatar">
                  </div>
                  <div class="time">{{item.rateTime}}</div>
                  <p class="text">
                    <i :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
                  </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings || !food.ratings.length"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartctrl from '../cartctrl/cartctrl.vue';
  import splits from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
        }
      };
    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true // 使用better-scroll会阻止click事件（默认事件），所以要开启
            });// this.$refs.food 获取DOM
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      addFirst (event) {
        if (!event._constructed) {
          return;
        }

        // 这里缺少了小球飞入的动画

        Vue.set(this.food, 'count', 1);
      },
      // incrementSType (funName, data) {
      //   this.selectType = data;
      // },
      // incrementOContent (funName, data) {
      //   this.onlyContent = data;
      // }
      incrementTotal (funName, funData) {
        if (funName === 'selectType') {
          this.selectType = funData;
        } else if (funName === 'onlyContent') {
          this.onlyContent = funData;
        }
        // this.selectType = this.$refs.ratingSelect.sType;
        // this.onlyContent = this.$refs.ratingSelect.oContent;
      }
    },
    components: {
      cartctrl,
      splits,
      ratingselect
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">

  .food
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    z-index 30
    background-color #fff
    transform translate3d(0,0,0)
    &.move-enter-active, &.move-leave-active
      transition: all .2s linear
    &.move-enter, &.move-leave-active
      transform translate3d(100%,0,0)
    .img-header
      position relative
      width 100%
      height 0
      padding-bottom 100%
      background-color #f3f5f7
    & > img
      position absolute
      top 0
      left 0
      display block
      width 100%
      height 100%
    .back
      position absolute
      top 10px
      left 0
      .icon-arrow_lift
        display block
        padding 10px
        font-size 20px
        color #FFF
        text-shadow 0 0 2px #000
    .food-body
      position relative
      padding 18px
      .title
        font-weight 700
        line-height 14px
        font-size 14px
        margin-bottom 8px
        color rgb(7,17,27)
      .detail
        font-size 0
        margin-bottom 18px
        line-height 10px
      .count,.rating
        display inline-block
        font-size 10px
        color rgb(147,153,159)
      .count
        margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240,20,20)
        .old
          font-size 10px
          color rgb(147,153,159)
          text-decoration line-through
      .cartctrl-wrap
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        background-color rgb(0,160,220)
        color #FFF
        border-radius 12px
        font-size 10px
        opacity 1
       &.fade-enter-active,&.fade-leave-active
        transition all 0.4s linear
       &.fade-enter,&.fade-leave-active
        opacity 0
    .food-body.info
      .title
        line-height 14px
        font-size 14px
        margin-bottom 6px
        color rgb(7,17,27)
      .text
        color rgb(77,85,93)
        line-height 24px
        font-size 12px
        padding 0 8px
    .food-body.rating
      padding 0
      padding-top 18px
      .title
        margin-left 18px
</style>
