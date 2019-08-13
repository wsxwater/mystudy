<template>
  <div class="tab-pane goods">
    <div class="menu-wrap" ref="menuWrap">
      <ul class="menu">
        <li class="menu-item" v-for="(item,i) in goods" :key="i" :class="{'current':currentIndex===i}" @click="selectMenu(i,$event)">
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <div>
        <ul class="list-group food-list-hook" v-for="(item,i) in goods" :key="i">
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
                <div class="cartctrl-wrap">
                  <cartctrl :food="food"></cartctrl>
                </div>
              </div>
            </li>
          </ul>
        </ul>
      </div>
    </div>
    <shopcart :delivery-price="wsx_seller.deliveryPrice" :min-price="wsx_seller.minPrice"></shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartctrl from '../cartctrl/cartctrl.vue';
  export default {
    props: {
      wsx_seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i];
          let h2 = this.listHeight[i + 1];
          if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
            return i;
          }
        }
        return 0;
      }

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
              this._calculateHeight();
            });
          }
        }
      });
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrap, {
          click: true // 使用better-scroll会阻止click事件（默认事件），所以要开启
        });// this.$refs.menuWrap 获取DOM
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          click: true,
          probeType: 3 // 监听实时滚动的位置
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          // console.log('this.scrollY:' + this.scrollY);
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        // console.log(this.listHeight);
      },
      selectMenu (i, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
        let el = foodList[i];
        this.foodsScroll.scrollToElement(el, 300);
      }
    },
    components: {
      shopcart,
      cartctrl
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
        &.current
          position relative
          font-weight 700
          margin-top -1px
          background-color #fff
          z-index 10
          .text
            border-none()
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
          .cartctrl-wrap
            position absolute
            right 0
            bottom 12px
</style>
