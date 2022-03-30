// const let are in temporal dead zone. Thus their output will give Reference error.
function foo() {
    console.log(a, b, c);

    const a = 10;
    let b = 30;
    var c = 4;
}

// -----------------
const a = {
    foo: 'bar',
}

function sayHello() {
    console.log(this.foo);
}

a.sayHello = sayHello;

a.sayHello(); // bar

// ------------------
window.foo = 'bar';
    
const a = {
    foo: 'hello',
}

const sayHello = () => {
    console.log(this.foo);
};

sayHello();
sayHello.call(a);

// Flatten object JS
const original = {
    "person1": {
        "name": "Brad",
        "department": {
            "id": 23,
            "name": "Sanitisation",
        },
        "isPermanent": false
    },
    "person2": {
        "name": "John",
        "cars": [
            {
                "name": "Mazda",
            },

            {
                "name": "Challenger",
                "make": 2008
            }
        ],
        "isPermanent": true
    }
}
const output = {
    'person1.name': 'Brad',
    'person1.department.id': 23,
    'person1.department.name': 'Sanitisation',
    'person1.isPermanent': false,
    'person2.name': 'John',
    'person2.cars.0.name': 'Mazda',
    'person2.cars.1.name': 'Challenger',
    'person2.cars.1.make': 2008,
    'person2.isPermanent': true
};

function flattenObj(obj) {
    let result = {};
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            const temp = flattenObj(obj[key]);
            for (let tempKeys in temp) {
                result[`${key}.${tempKeys}`] = temp[tempKeys];
            }
        } else {
            result[key] = obj[key]
        }
    });
    return result;
}

console.log(flattenObj(original));

// Is JS Intrepreted or Compiler or Transpiler