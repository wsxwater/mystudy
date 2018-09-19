# ES6
## 1、let
    1.1、不能重复声明。如下：
        let name='李白';
        let name='李太';
        console.log(name); //Uncaught SyntaxError: Identifier 'name' has already been declared

    1.2、作用域只能局限在当前代码块。如下：
        {
            let name='李白';
            console.log(name); //李白
        }
        console.log(name); //没有值

    1.3、使用let申明的变量作用域不会被提升。如下：
        1.3.1、使用var会提升：
        console.log(name); //undefined
        var name='李白'; 
             箭头
             箭头
           箭箭头箭
             箭头
              箭
        var name;
        console.log(name); //undefined
        name='李白';
        1.3.2、使用let
        console.log(name); //Uncaught ReferenceError: name is not defined
        let name='李白'; 

    1.4、for循环体现let的父子作用域。如下：
        1.4.1、使用var
        var btns=document.getElementsByTagName('button');
        for (var i = 0; i < btns.length; i++) {
            btns[i].onclick=function () {
                console.log(i);//3
            }
        }


        1.4.2、使用let
        var btns=document.getElementsByTagName('button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].onclick=function () {
                console.log(i);//3
            }
        }

---
## 2、const
    2.1、不能重复声明。如下：
        const name='李白';
        const name='李太';
        console.log(name);//Uncaught SyntaxError: Identifier 'name' has already been declared

    2.2、作用域只能局限在当前代码块。如下：
        {
            const name='李白';
            console.log(name); //李白
        }
        console.log(name); //没有值

    2.3、使用let申明的变量作用域不会被提升。如下：
        console.log(name);  //Uncaught ReferenceError: name is not defined
        const name='李白';

    2.4、申明的常量必须赋值。如下：
        const name;
        name='李白';
        console.log(name);//Uncaught SyntaxError: Missing initializer in const declaration

---
## 3、Set
    3.1、特点
        3.1.1、类似数组，无重复元素(唯一性)。
            let set=new Set([1,2]);
            console.log(set); // Set(2) {1, 2}
        3.1.2、开发中去除重复数据。
            let set=new Set([1,2,2]);
            console.log(set); // Set(2) {1, 2}
        3.1.3、key和value都是相等的。
            let set=new Set([1,2]);
            console.log(set.keys());  //SetIterator {1, 2}
            console.log(set.values());//SetIterator {1, 2}

    3.2、一个属性
        let set=new Set([1,2]);
        console.log(set.size); // 2

    3.3、四个方法
        3.3.1、add()
            let set=new Set([1,2]);
            set.add(3);
            console.log(set);//Set(3) {1, 2, 3}
        3.3.2、delete()
            let set=new Set([1,2,3]);
            set.delete(3);
            console.log(set);//Set(3) {1, 2}
        3.3.3、has()
            let set=new Set([1,2,3]);
            console.log(set.has(3));//true
        3.3.4、clear()
            let set=new Set([1,2,3]);
            set.clear();
            console.log(set);//Set(0) {}

---
## 4、Map
    4.1、特点
        4.1.1、类似于对象，本质上是键值对的集合
            let map=new Map([['age',12],['name','李白']]);
            console.log(map); //{"age" => 12, "name" => "李白"}
        4.1.2、“键”不局限于字符串，各种类型的值（包括对象）都可以当作键
            对象：
                var obj1={'name':'xxx'},obj2={'age':12};
                var obj3={};
                obj3[obj1]='哈哈';
                obj3[obj2]=14;

                console.log(obj3); //{[object Object]: 14}。=>相当于将obj1.toString()和obj2.toString()，obj1.toString()===obj2.toString()，所以后面的会覆盖前面。

            Map:
                let obj1={'name':'xxx'},obj2={'age':12};
                let map=new Map([
                    ['age',12],
                    ['name','李白'],
                    [obj1,'王圭'],
                    [obj2,23]
                ]);
                console.log(map); 
                // Map(4) {"age" => 12, "name" => "李白", {…} => "王圭", {…} => 23}
                // size:(...)
                // __proto__:
                // Map
                // [[Entries]]:
                // Array(4)
                // 0:{"age" => 12}
                // 1:{"name" => "李白"}
                // 2:{Object => "王圭"}
                // 3:{Object => 23}
                // length:4
            

        4.1.3、对象"字符串-值"，Map"值-值"，是一种更加完善的Hash结构实现

    4.2、set和get
        let map=new Map();
        map.set('name','www');
        console.log(map); //Map(1) {"name" => "www"}
        console.log(map.get('name')); //www

    4.3、delete
        let map=new Map([['name','李白'],['age',12]]);
        map.delete('name');
        console.log(map); //Map(1) {"age" => 12}

    4.4、has
        let map=new Map([['name','李白'],['age',12]]);
        console.log(map.has('name')); //true

    4.4、clear
        let map=new Map([['name','李白'],['age',12]]);
        map.clear();
        console.log(map); //Map(0) {}

    4.5、keys、values、entries和循环(for...of:循环不可以循环json)
        let map=new Map([['name','李白'],['age',12]]);
        //keys
        for (let k of map.keys()) {
             console.log(k) 
             //name
             //age
        }
        //values
        for (let val of map.values()) {
           console.log(val);
           //李白
           //12
        }
        //entries
        for (let i of map.entries()) {
           console.log(i);
           //["name", "李白"] 
           //["age", 12]
        }

---
## 5、Symbol
    5.1、场景
    ES5的对象属性名都是字符串，容易造成属性名冲突
        let obj={};
        obj.name='是是';
        obj.name='不不';
        console.log(obj);//{name: "不不"} 

    ES6引入新的原始数据类型Symbol，表示独一无二的值
        let obj={};
        obj[Symbol('name')]='是是';
        obj[Symbol('name')]='不不';
        console.log(obj);//{Symbol(name): "是是", Symbol(name): "不不"}

    5.2、对象的属性名可以有两种类型

---
## 6、解构赋值。详见：<a href="../../my-es6/1.6_解构赋值.html"></a>

---
## 7、模板字符串 ``
    let classname='active';
    let html=`<ul>
                    <li class="${classname}">我是第1个</li>
                    <li>我是第2个</li>
                    <li>我是第3个</li>
              </ul>`;

---
## 8、内置对象扩展
    8.1、数组的扩展 
     > Array.from():从一个类似数组或可迭代对象中创建一个新的数组实例。
        let btns=document.querySelectorAll('button');
        console.log(btns); //NodeList(4) [button, button, button, button]
        let arr=Array.from(btns);
        console.log(arr);  //(4) [button, button, button, button] 

     > Array.of():创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
         Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位的数组，而不是由7个undefined组成的数组）。
         Array.of(7);       // [7] 
         Array.of(1, 2, 3); // [1, 2, 3]

         Array(7);          // [ , , , , , , ]
         Array(1, 2, 3);    // [1, 2, 3]

        //如果原生不支持的话，在其他代码之前执行以下代码会创建 Array.of() 。
        if (!Array.of) {
          Array.of = function() {
            return Array.prototype.slice.call(arguments);
          };
        }

    8.2、对象的扩展
        8.2.1、key和value是一样的，写一个就够了
            let name='xxx';
            let age=12;
            let obj={
                'name':name,
                'age':age
            }
            console.log(obj);//{name: "xxx", age: 12}
                  箭头
                  箭头
                箭箭头箭
                  箭头
                   箭  
            let name='xxx';
            let age=12;
            let obj={
                name,
                age
            }
            console.log(obj);//{name: "xxx", age: 12}     

        8.2.2、Object.assign(target,source...); （合并）   
            let obj1={'name':'www'};
            let obj2={'age':12};
            let obj={};
            Object.assign(obj,obj1,obj2);
            console.log(obj);//{name: "www", age: 12} 

        8.2.3、延展操作符 => ...
            //将一个字符串转换成数组。
            let str='中国人';
            console.log([...str]);//(5) [ "中", "国", "人"]
            console.log({...str});//{0: "中", 1: "国", 2: "人"}

            //面试题：将一个数组相同项删除，并输出数组。
            let arr=[1, 2, 2, "国", "人"];
            console.log(new Set(arr));//Set(4) {1, 2, "国", "人"}
            console.log([...new Set(arr)]);//(4) [1, 2, "国", "人"]
            console.log(Array.isArray(new Set(arr))); //false
            console.log(Array.isArray([...new Set(arr)]));//true

            ES5:
            //思路：遍历要删除的数组arr, 把元素分别放入另一个数组tmp中，在判断该元素在arr中不存在才允许放入tmp中。
            var color = ['red','blue','blue','black','red'];
            function unique(arr){
                // 遍历arr，把元素分别放入tmp数组(不存在才放)
                var tmp = new Array();
                for(var i in arr){
                    //该元素在tmp内部不存在才允许追加
                    if(tmp.indexOf(arr[i])==-1){
                        tmp.push(arr[i]);
                    }
                }
                return tmp;
            }
            var arrColor = unique(color);
            console.log(arrColor);// ["red", "blue", "black"]


## vue
1、指令
    1.1、<a href="01指令/v-bind.html">v-bind</a>
    1.2、<a href="01指令/v-if,v-else,v-else-if.html">v-if,v-else,v-else-if</a>
    1.3、<a href="01指令/v-show,v-hide.html"></a>
    1.4、<a href="01指令/v-html,v-text,v-model.html">v-html,v-text,v-model</a>
    1.5、<a href="01指令/v-once,v-model.html">v-once,v-model</a>
    1.6、<a href="01指令/todolist.html">todolist-综合训练</a>

2、计算属性 computed
    注：属性都有get和set方法，set方法不常用，默认方法为get方法
    2.1、<a href="02计算属性/计算属性.html">计算属性</a>
    2.2、<a href="02计算属性/计算属性setter.html">计算属性setter</a>

3、组件
    3.1、<a href="03组件/全局组件.html">全局组件</a>
    3.2、<a href="03组件/局部组件.html">局部组件</a>
    3.3、<a href="03组件/父子组件.html">父子组件</a>
    3.4、<a href="03组件/script组件.html">script组件</a>
    3.5、<a href="03组件/template组件.html">template组件</a>
    3.6、<a href="03组件/组件间的通讯.html">组件间的通讯</a>
    3.7、<a href="03组件/多组件间的通讯(父传子).html">多组件间的通讯(父传子)</a>
    3.8、<a href="03组件/多组件间的通讯(子传父)-自定义事件.html">多组件间的通讯(子传父)-自定义事件</a>
    <pre>
        自定义事件:
            我们知道，父组件是使用props传递数据给子组件，但如果子组件要把数据传递出去，应该怎么做？那就是自定义事件。

            每个Vue实例都实现了事件接口(Events Interface)，即：
            > 使用$on(eventName)监听事件
            > 使用$emit(eventName)触发事件

            另外，父组件可以在使用子组件地方直接用v-on来监听子组件触发的事件。
    </pre>

4、Slot插槽——实现内容的分发
    4.1、<a href="04插槽/匿名插槽.html">匿名插槽</a>
    4.2、<a href="04插槽/实名插槽.html">实名插槽</a>
    <pre>
        父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
        上面话的意思在于：在子组件定义的数据，只能用在子组件的模板；在父组件定义的数据，只能用在父组件的模板。如果父组件的数据要在子组件中使用，则需要子组件定义props。

        slot:插槽
        目的：让组件的可扩展性更强。比如：假如父组件需要在子组件内放一些DOM，那么这些DOM是显示、不显示，在哪显示、如何显示，就是slot分发负责的。

        匿名插槽：
            <my-slot>xxx</my-slot>
            <template id="my_slot"><slot>无内容则显示这段话</slot></template>

        实名插槽：
            <my-slot>
                <div slot="cpu">酷睿i5 8代系列</div>
            </my-slot>
            <template id="my_slot"><slot name="cpu">无内容则显示这段话</slot></template>
    </pre>


    







   







