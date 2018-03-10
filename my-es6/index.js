import modA from './a.js';

//document.getElementById('app').innerHTML=modA;
document.getElementById('app').innerHTML=modA.a+modA.b;

function * show() {
	yield 'Hello';
	yield 'world';
	yield 'ES6';
    return 'well';
}

var res=show();

console.log(res.next());  //Object {value: "Hello", done: false}
console.log(res.next());  //Object {value: "world", done: false}
console.log(res.next());  //Object {value: "ES6", done: false}
console.log(res.next());  //Object {value: "well", done: false}
console.log(res.next());  //Object {value: undefined, done: true}




function* fn() {
	for (var i = 0; true; i++) {
		var a=yield i;
		if (a) {
			i=-1;
		}
	}
}

var bb=fn();
console.log(bb.next());
console.log(bb.next());
console.log(bb.next(true));
console.log(bb.next());


function* fn1() {
	yield 1;
	yield 2;
	yield 3;
	return 4;
}

for(let v of fn1()){
	document.write(v)
}



var json={
	*show1(){
		yield 'a';
		yield 'b';
	}
}

var show1=json.show1();

console.log(show1.next());
console.log(show1.next());
console.log(show1.next());