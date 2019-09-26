<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="type positive" :class="{'active':selectType===2}">{{desc.all}}<span class="type-count">47</span></span>
      <span @click="select(0,$event)" class="type positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="type-count">40</span></span>
      <span @click="select(1,$event)" class="type negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="type-count">10</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit('update:selectType', type);
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl";
  .ratingselect
    .rating-type
      font-size 0
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7,17,27,0.1))
      .type
        display inline-block
        font-size 12px
        padding 8px 12px
        border-radius 1px
        color rgb(77,85,93)
        margin-right 8px
        line-height 16px
        &.active
          color #fff
        &.positive
          background-color rgba(0,160,220,0.2)
          &.active
            background-color rgb(0,160,220)
        &.negative
          background rgba(77,85,93,0.2)
          &.active
            background rgb(77,85,93)
        .type-count
          font-size 8px
          margin-left 2px
    .switch
      padding 12px 18px
      font-size 0
      line-height 24px
      color rgb(147,153,159)
      border-bottom rgba(7,17,27,0.1) 1px solid
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        font-size 24px
        line-height 24px
        margin-right 4px
      .text
        display inline-block
        vertical-align top
        font-size 12px
</style>
