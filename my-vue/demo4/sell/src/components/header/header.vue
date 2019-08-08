<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="wsx_seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{wsx_seller.name}}</span>
        </div>
        <div class="description">{{wsx_seller.description}}/{{wsx_seller.deliveryTime}}分钟送达</div>

        <div class="support" v-if="wsx_seller.supports">
          <!-- div.support必须要加v-if="wsx_seller.supports"，否则报错：
          [Vue warn]: Error in render: "TypeError: Cannot read property '0' of undefined"
          found in
          <VHeader> at src/components/header/header.vue
                 <App> at src/App.vue
                   <Root>
          -->
          <span class="icon" :class="classMap[wsx_seller.supports[0].type]"></span>
          <span class="text">{{wsx_seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="wsx_seller.supports" @click="showDetail">
        <span class="count">{{wsx_seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap">
      <span class="bulletin-title"></span><span class="bulletin-text">{{wsx_seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="wsx_seller.avatar">
    </div>
    <transition name="fade">
      <div class="detail" v-show="show">
        <div class="detail-wrap clearfix">
          <div class="detail-body">
            <h1 class="name">{{wsx_seller.name}}</h1>
            <div class="star-wrap">
              <star :size="48" :score="wsx_seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="list-group" v-if="wsx_seller.supports">
              <li class="list-group-item" v-for="(item,i) in wsx_seller.supports" :key="i">
                <span class="icon" :class="classMap[wsx_seller.supports[i].type]"></span>
                <span class="text">{{wsx_seller.supports[i].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="content">{{wsx_seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="showDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  import star from '../star/star.vue';
  export default {
    props: {
      wsx_seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    data () {
      return {
        show: false
      };
    },
    methods: {
      showDetail () {
        this.show = !this.show;
      }
    },
    components: {
      star
    }
  };
</script>
<style rel="stylesheet/stylus" lang="stylus">
    @import "../../common/stylus/mixin.styl";
    .header
      background-color:rgba(7,17,27,0.5)
      color:#FFF
      position relative
      overflow hidden
      .content-wrap
        padding:24px 12px 18px 24px
        font-size:0
        position relative
        .avatar
          display:inline-block
          vertical-align:top
          & img
            width:64px
            height:64px
            border-radius 2px
        .content
          display:inline-block
          vertical-align:top
          font-size:14px
          margin-left 16px
          .title
            margin 2px 0 8px 0
            .brand
              display inline-block
              width 30px
              height 18px
              vertical-align top
              bg-img("brand")
              background-size 30px 18px
              background-repeat no-repeat
            .name
              margin-left 6px
              font-size 16px
              font-weight bold
              line-height 18px
          .description
            margin-bottom 10px
            line-height 12px
            font-size 12px
          .support
            .icon
              display inline-block
              vertical-align middle
              width 12px
              height 12px
              margin-right 4px
              background-size 12px 12px
              background-repeat no-repeat
              &.decrease
                bg-img('decrease_1')
              &.discount
                bg-img('discount_1')
              &.gurrantee
                bg-img('guarantee_1')
              &.invoice
                bg-img('invoice_1')
              &.special
                bg-img('special_1')
            .text
              line-height 12px
              font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 18px
        line-height 24px
        border-radius 14px
        padding 0 8px
        height 24px
        background-color rgba(0,0,0,0.2)
        text-align center
        .count
          font-size 10px
        .icon-keyboard_arrow_right
          font-size 10px
          margin-left 2px
          line-height 24px
      .bulletin-wrap
        height 28px
        line-height 28px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        padding 0 22px 0 12px
        position relative
        background-color rgba(7,17,27,0.2)
        .bulletin-title
          display inline-block
          vertical-align middle
          width 22px
          height 12px
          bg-img('bulletin')
          background-size 22px 12px
          background-repeat no-repeat
        .bulletin-text
          vertical-align middle
          font-size 10px
          margin 0 4px
        .icon-keyboard_arrow_right
          position absolute
          right 12px
          top 8px
          font-size 10px
      .background
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        z-index -1
        filter blur(10px)
        img
          display block
          width 100%
          height 100%
      .detail
        position fixed
        z-index 100
        height 100%
        width 100%
        top 0
        left 0
        overflow-y auto
        opacity 1
        background-color rgba(7,17,27,0.8)
        backdrop-filter blur(10px)
        &.fade-enter-active, &.fade-leave-active
          transition: all .5s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          background-color rgba(7,17,27,0)
        .detail-wrap
          min-height 100%
          .detail-body
            padding 64px 0
            .name
              text-align center
              line-height 16px
              font-size 16px
              font-weight 700
            .star-wrap
              text-align center
              margin-top 18px
            .title
              display flex
              width 80%
              margin 28px auto 24px
              .line
                flex 1
                position relative
                top -6px
                border-bottom 1px solid rgba(255,255,255,0.2)
              .text
                padding 0 12px
                font-size 14px
                font-weight 700
            .list-group
              width 80%
              margin 0 auto
              .list-group-item
                font-size 0
                padding 0 12px
                margin-bottom 12px
                &:last-child
                  margin-bottom 0
                .icon
                  display inline-block
                  width 16px
                  height 16px
                  vertical-align top
                  margin-right 6px
                  background-repeat no-repeat
                  background-size 16px 16px
                  &.decrease
                    bg-img('decrease_2')
                  &.discount
                    bg-img('discount_2')
                  &.gurrantee
                    bg-img('guarantee_2')
                  &.invoice
                    bg-img('invoice_2')
                  &.special
                    bg-img('special_2')
                .text
                  font-size 12px
                  line-height 12px
            .bulletin
              width 80%
              margin 0 auto
              font-size 12px
              line-height 24px
              .content
                padding 0 12px
      .detail-close
        position relative
        width 32px
        height 32px
        text-align center
        line-height 32px
        font-size 32px
        color rgba(255,255,255,.5)
        margin -64px auto 0 auto
</style>
