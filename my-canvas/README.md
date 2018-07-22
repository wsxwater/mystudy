# my-canvas 
> this is my canvas!

## directory
*   <a href="刮刮乐0.html">刮刮乐0.html</a>
*   <a href="刮刮乐1.html">刮刮乐1.html</a>
*   <a href="刮刮乐2.html">刮刮乐2.html</a>
*   <a href="刮刮乐3.html">刮刮乐3.html</a>
*   <a href="刮刮乐4.html">刮刮乐4.html</a>
*   <a href="合成图片.html">合成图片.html</a>
*   <a href="图形头像.html">图形头像.html</a>
*   <a href="多边形.html">多边形.html</a>
*   <a href="太极图.html">太极图.html</a>
*   <a href="放大镜.html">放大镜.html</a>
*   <a href="橡皮筋式选取框.html">橡皮筋式选取框.html</a>
*   <a href="水印.html">水印.html</a>
*   <a href="ball.html">ball.html</a>
*   <a href="canvas时钟.html">canvas时钟.html</a>
*   <a href="canvas_createImageData.html">canvas_createImageData.html</a>
*   <a href="canvas_getImageData_putImageData.html">canvas_getImageData_putImageData.html</a>
*   <a href="clip1.html">clip1.html</a>
*   <a href="clip2.html">clip2.html</a>
*   <a href="clip3.html">clip3.html</a>
*   <a href="clip4.html">clip4.html</a>


## 坐标变换所用的代数方程
<pre>
    > translate
      平移前的旧坐标记为(x,y)，平移后的坐标记为(x1,y1)，x轴平移距离记为dx，y轴平移距离记为dy。
    公式：x1=x+dx;y1=y+dy

    > scale：
      缩放前的坐标记为(x,y)，缩放后的坐标记为(x1,y1)，坐标轴的横向缩放倍数记为sx，坐标轴的纵向缩放倍数记为sy。
      公式：x1=x*sx;y1=y*sy;

    > rotate
      旋转前的坐标记为(x,y)，旋转后的坐标记为(x1,y1)，旋转角度记为angle。
      公式：x1=x*cos(angle)-(y*sin(angle));y1=y*cos(angle)+(x*sin(angle))

    > transform(a,b,c,d,e,f)、setTransform(a,b,c,d,e,f)
        通用公式：
            x1=a*x+c*x+e;
            y1=b*x+d*y+f;
        translate 
            如a=1,b=0,c=0且d=1。
            x1=1*x+0*x+e; => x1=x+e;
            y1=0*y+1*y+f; => y1=y+f;
        scale 
            a,d参数分别设为x与y轴方向上的缩放倍数，其余设为0。
            x1=a*x+0*y+0; => x1=a*x;
            y1=0*x+d*y+0; => y1=d*y;
        rotate 
            如a=cos(angle),b=sin(angle),c=-sin(angle),d=cos(angle),e=0,f=0。
            x1=cos(angle)*x-sin(angle)*y+0; => x1=cos(angle)*x-sin(angle)*y; 
            y1=sin(angle)*x+cos(angle)*y+0; => y1=sin(angle)*x+cos(angle)*y;    
</pre>








