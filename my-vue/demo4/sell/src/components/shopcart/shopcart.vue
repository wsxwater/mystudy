<template>
  <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrap">
            <div class="logo" :class="{'active':totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'active':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="(food,i) in selectFoods" :key="i">
                <span class="name">{{food.name}}</span>
                <div>
                  <span class="price">￥{{food.price*food.count}}</span>
                </div>
                <div class="cartctrl-wrap">
                  <cartctrl :food="food"></cartctrl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
  </div>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  import cartctrl from '../cartctrl/cartctrl.vue';
  export default {
    props: {
      'select-foods': {
        type: Array,
        default () {
          return [];
        }
      },
      'delivery-price': {
        type: Number,
        default: 0
      },
      'min-price': {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        console.log(this.selectFoods);
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow () {
        // Unexpected side effect in "listShow" computed property 个人理解计算属性内不应该对属性值做变更，解决这个问题的做法之一是使用watch监听
        if (!this.totalCount) {
          // this.fold = true;
          return false;
        }
        // let show = !this.fold;
        // return show;

        if (this.totalCount > 0 && !this.fold) {
          return true;
        }
        return false;
      }
    },
    watch: {
      selectFoods (newFoods, oldFoods) {
        if (newFoods.length === 0) {
          this.fold = true;
        }
      }
    },
    data () {
      return {
        fold: true
      };
    },
    components: {
      cartctrl
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        // this.show = true;
        this.fold = !this.fold;
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/mixin.styl';
  .shopcart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 50
    .content
      display flex
      color rgba(255,255,255,0.4)
      background-color #141d27
      .content-left
        flex 1
        font-size 0
        .logo-wrap
          display inline-block
          position relative
          margin 0 12px
          padding 6px
          top -10px
          width 56px
          height 56px
          box-sizing border-box
          background-color #141d27
          border-radius 50%
          vertical-align top
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            color #fff
            font-weight 700
            font-size 9px
            background rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(255,255,255,0.4)
          .logo
            background-color #2b343c
            border-radius 50%
            width 100%
            height 100%
            text-align center
            &.active
              background-color rgb(0,120,220)
            &.active .icon-shopping_cart
              color #fff
            .icon-shopping_cart
              color #80858a
              font-size 24px
              line-height 44px
        .price
          display inline-block
          vertical-align top
          font-size 16px
          font-weight 700
          line-height 24px
          margin-top 12px
          padding-right 12px
          border-right 1px solid rgba(255,255,255,0.1)
          box-sizing border-box
          &.active
            color #fff
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          font-size 12px
          text-align center
          font-weight 700
          &.not-enough
            background-color #2b333b
          &.enough
            background-color #00b43c
            color #fff
    .shopcart-list
      position absolute
      top 0
      left 0
      width 100%
      z-index -1
      transform translate3d(0,-100%,0) // 整个列表相对于当前自身的高度做一个偏移
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s linear
        transform translate3d(0, -100%, 0) // 每个表项相对于当前自身的高度做一个偏移
      &.fold-enter, &.fold-leave-active
        transform translate3d(0,0,0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background-color #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          float left
          font-size 14px
          color rgb(7,17,27)
        .empty
          color rgb(0,160,220)
          float right
          font-size 12px
      .list-body
        padding 0 18px
        max-height 217px
        overflow hidden
        background-color #fff
        .list-group-item
          box-sizing border-box
          border-1px(rgba(7,17,27,0.1))
</style>
