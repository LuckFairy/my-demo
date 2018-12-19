// 构造函数
function Person(name,age){
	this.name = name;
	this.age = age;
}
Person.prototype.say = function(){
	return "我的名字"+this.name+"今年"+this.age+'岁'
}
var obj = new Person('laotie',55);//通过构造函数创建对象，必须使用new运算符
console.log(obj.say())
// 1.当使用了构造函数，并且new 构造函数(),后台会隐式执行new Object()创建对象;
// 2.将构造函数的作用域给新对象，（即new Object()创建出的对象），
// 而函数体内的this就代表new Object()出来的对象。
// 3.执行构造函数的代码。
// 4.返回新对象（后台直接返回）;


// class类的使用，使其更像面对对象的语言
class Person{//定义了一个Preson的类
	constructor(name,age){//constructor是一个构造方法，用来接收参数
		this.name = name;//this代表是是实例对象
		this.age = age;
	}
	say(){//这是一个类的方法，注意不要加上function
		return "我的名字"+this.name+"今年"+this.age+'岁'
	}

}
var obj = new Person('laotie',55);
console.log(obj.say());
// 1.在类中声明方法的时候，千万不要给该方法加上function关键字
// 2.方法之间不要用逗号分隔，否则会报错

// 类就是一个函数。类自身指向的就是构造函数。所以，
// 类就是构造函数的另外一个写法！
console.log(typeof Person);//function
console.log(Person === Person.prototype.constructor);//true

//构造函数的prototype属性。在es6的类中依然存在着。
```
console.log(Person.prototype);//输出的结构是一个对象
```
// 实际上类的所有方法都是定义在类的prototype属性上。
Person.prototype.say = function(){//定义与类中相同名字的方法。成功实现了覆盖
	return "我是证明的类的所有方法都是定义在类的prototype属性上"
}
// 对类增加方法，如下
```
1、原型链上添加方法prototype
Person.prototype.addFn = function(){
	return "我是通过prototype增加的方法，名字加addFn"
}
2、通过Object.assign方法来对对象动态增加方法
Object.assign(Person.prototype,{
	getName:function(){
		return this.name;
	},
	getAge:function(){
		return this.age;
	}
})
```
// constructor方法是类的构造函数默认方法，通过new命令生成对象是咧
// 时，自动调用改方法
```
class Box{
	constructor(){
		console.log("constructor方法")
	}
}
var obj = new Box();
```
// constructor方法如果没有显式定义，
// 会隐式生成一个constructor方法。
// 所以即使你没有添加构造函数，构造函数也是存在的。
// constructor方法默认返回实例对象this，
// 但是也可以指定constructor方法返回一个全新的对象，
// 让返回的实例对象不是该类的实例。
// class Desk{
    constructor(){
        this.xixi="我是一只小小小小鸟！哦";
    }
}
class Box{
    constructor(){
       return new Desk();// 这里没有用this哦，直接返回一个全新的对象
    }
}
var obj=new Box();
console.log(obj.xixi);//我是一只小小小小鸟！哦

// constructor中定义的属性可以称为实例属性（即定义在this对象上），
// constructor外声明的属性都是定义在原型上的，
// 可以称为原型属性（即定义在class上)。
// hasOwnProperty()函数用于判断属性是否是实例属性。
// 其结果是一个布尔值， true说明是实例属性，false说明不是实例属性。
// in操作符会在通过对象能够访问给定属性时返回true,无论该属性存在于实例中还是原型中。
```
class Box{
    constructor(num1,num2){
        this.num1 = num1;
        this.num2=num2;
    }
    sum(){
        return num1+num2;
    }
}
var box=new Box(12,88);
console.log(box.hasOwnProperty("num1"));//true
console.log(box.hasOwnProperty("num2"));//true
console.log(box.hasOwnProperty("sum"));//false
console.log("num1" in box);//true
console.log("num2" in box);//true
console.log("sum" in box);//true
console.log("say" in box);//false

```
// 类的所有实例共享一个原型对象，它们的原型都是Person.prototype，所以proto属性是相等的
```
class Box{
    constructor(num1,num2){
        this.num1 = num1;
        this.num2=num2;
    }
    sum(){
        return num1+num2;
    }
}
//box1与box2都是Box的实例。它们的__proto__都指向Box的prototype
var box1=new Box(12,88);
var box2=new Box(40,60);
console.log(box1.__proto__===box2.__proto__);//true

```
// 由此，也可以通过proto来为类增加方法。使用实例的proto属性改写原型，会改变Class的原始定义，影响到所有实例，所以不推荐使用！
```
class Box{
    constructor(num1,num2){
        this.num1 = num1;
        this.num2=num2;
    }
    sum(){
        return num1+num2;
    }
}
var box1=new Box(12,88);
var box2=new Box(40,60);
box1.__proto__.sub=function(){
    return this.num2-this.num1;
}
console.log(box1.sub());//76
console.log(box2.sub());//20

```
// class不存在变量提升，所以需要先定义再使用。因为ES6不会把类的声明提升到代码头部，但是ES5就不一样,ES5存在变量提升,可以先使用，然后再定义。
```
//ES5可以先使用再定义,存在变量提升
new A();
function A(){

}
//ES6不能先使用再定义,不存在变量提升 会报错
new B();//B is not defined
class B{

}
```