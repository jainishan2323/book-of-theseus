const obj = {
    name: 'Test',
    display: function() {
        console.log(this.name);
    }
}

const obj2 = {
    name: 'Name',
}

// obj.display(); Test
// obj.display.call(obj2) Name

// In case of 

const objWithArrow = {
    name: 'Test',
    display: () => {
        console.log(this.name);
    }
}

// console.log() will be always undefined. this will always be window