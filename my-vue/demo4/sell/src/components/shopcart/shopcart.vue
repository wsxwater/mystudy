<template>
  <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrap">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price">￥0</div>
          <div class="desc"></div>
        </div>
        <div class="content-right"></div>
      </div>
  </div>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  export default {
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
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
          .logo
            background-color #2b343c
            border-radius 50%
            width 100%
            height 100%
            text-align center
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
          color #80858a
        .desc
          display inline-block
          vertical-align top
      .content-right
        flex 0 0 105px
        width 105px
</style>
