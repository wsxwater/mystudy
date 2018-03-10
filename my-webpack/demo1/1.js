var oapp=document.getElementById('app');

require('./world.js');/*babel-loader!*/
//require('style-loader!css-loader!./test.css');/*style-loader!css-loader!*/
require('./test.css');/*style-loader!css-loader!*/
import modB from './b.js';


oapp.innerHTML='<h3>hello,webpack!!!</h3>'+modB.a+modB.b+(modB.a+modB.b);

//alert(modB.a,modB.b)