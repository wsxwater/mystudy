<template>
  <div class="tab-pane goods">
    <div class="menu-wrap" ref="menuWrap">
      <ul class="menu">
        <li class="menu-item" v-for="(item,i) in goods" :key="i">
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <div>
        <ul class="list-group" v-for="(item,i) in goods" :key="i">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="list-group-item" v-for="(food,j) in item.foods" :key="j">
              <div>
                <img :src="food.icon" class="icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    props: {
      wsx_seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: []
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      const ERR_OK = 0;
      this.$http.get('api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = JSON.parse(JSON.stringify(response.data));
          // console.log(this.goods);
          if (this.$nextTick()) {
            this.$nextTick(() => {
              this._initScroll();
            });
          }
        }
      });
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrap, {});// this.$refs.menuWrap 获取DOM
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {});
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl";
  .goods
    display flex
    position absolute
    top 174px
    width 100%
    bottom 46px
    overflow hidden
    .menu-wrap
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        line-height 14px
        width 56px
        height 54px
        padding 0 12px
        .text
          font-size 12px
          display table-cell
          vertical-align middle
          width 100%
          border-1px(rgba(7,17,27,0.1))
        .icon
          display inline-block
          vertical-align middle
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.gurrantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
    .foods-wrap
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background-color #f3f5f7
      .list-group-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        img.icon
          display block
          flex 0 0 57px
          margin-right 10px
          width 57px
          height 57px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc,.extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 14px
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

</style>
