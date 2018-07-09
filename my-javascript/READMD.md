#笔记
---
<pre>
    >childNodes <code>elment.childNodes:document.body.childNodes</code>
    返回一个数组，这个数组包含给定元素节点的全体子元素。
</pre>
<pre>
    >nodeType <code>node.nodeType:alert(document.body.nodeType)</code>
    返回数字，这个包含给定元素所有类型的节点。
    <code>节点有3种：元素节点、属性节点和文本节点</code>
        元素节点的nodeType属性值为1；
        属性节点的nodeType属性值为2；
        文本节点的nodeType属性值为3。
</pre>
<pre>
    >nodeValue <code>node.nodeValue</code>
    改变某个文本节点的值。

    例如：
    <tab id="des"></tab>
    var des=document.getElementById('des');
    alert(des.nodeValue); //null。
    原因：p元素的属性节点是一个空值，而我们需要的是p元素的文本节点。换句话说，如果想要获取p元素的文本节点，就必须检索它的第一个子节点的nodeValue属性值。
    下面这条alert可以找到我们想要的内容：
    alert(des.childNodes[0].nodeValue);

    <code>childNodes[0]==firstChild;</code>
    <code>childNodes[li.length-1]==lastChild;</code>
</pre>

