<template>
  <div class="shopcart">
      <div class="content">
        <div class="content-left">
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
  </div>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  export default {
    props: {
      'select-foods': {
        type: Array,
        default () {
          return [
            {
              price: 10,
              count: 1
            }
          ];
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
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    color rgba(255,255,255,0.4)
    .content
      display flex
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
</style>
