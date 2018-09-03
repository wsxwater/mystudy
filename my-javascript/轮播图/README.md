# 轮播图


## 左右无缝轮播
> 左右无缝轮播，第1种方法：(demo01.3-左右无缝.cloneNode.html)
1、克隐第一个轮播图片(cloneNode(true))，然后插入到ul的后面(appendChild)；
2、设置2个索引（now_ul=0,now_ol=0）；
3、圆点点击事件，设置lis_ol[i].index=i，然后now_ul=now_ol=this.index；
4、切换圆点；
function tab() {
            for (var j = 0; j < lis_ol.length; j++) {lis_ol[j].className='';}   
            lis_ol[now_ol].className='active';
            var size=ul.parentNode.offsetWidth;
            constant(ul,-(now_ul)*size,speed);
}
5、将now_ul++;now_ol++；
function next() {
    //ul
    now_ul++; if (now_ul>len-1) { ul.style.left=0; now_ul=1;}

    //ol
    now_ol++; if (now_ol>lis_ol.length-1) {now_ol=0;}

    tab();
}

> 左右无缝轮播，第2种方法：(网易轮播图.html)
1、点击prev按钮
    1.1、当前可视区域图片快速右移
    1.2、上一张图片快速出现在可视区域的左边
    1.3、让这张图片做动画进入
2、点击next按钮
    2.1、当前可视区域图片快速左移
    2.2、下一张图片快速出现在可视区域的右边
    2.3、让这张图片做动画进入
3、点击圆点
    3.1、用当前点击的索引与选中的索引作对比
    3.2、点击的 > 选中的，相当于点击了右边的按钮
    3.3、点击的 < 选中的，相当于点击了左边的按钮


## 走马灯轮播
1、数组的常见操作
   pop():删除最后一个
   shift():删除第一个
   push():追加 添加到最后面
   unshift():添加到第一个

