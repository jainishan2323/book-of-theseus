function A(){
    console.log(1)
}

function Fn(){
    A = function(){
        console.log(2)
    }
    return this
}

Fn.A=A

Fn.prototype = {
    A: () => {
        console.log(3)
    }
}
A();
Fn.A();
Fn().A();
new Fn.A();
new Fn().A()
new new Fn().A();
   
//    Answer: 1, 1, 2, 1, 3, error ("arrow function can't be new")