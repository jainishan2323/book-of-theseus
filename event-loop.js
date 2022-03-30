// Ques 1
function a() {
    console.log('a');
  }

  function b() {
    setTimeout(() => console.log('b'), 5000);
  }

  function c() {
    for(let i=0; i<5000; i++) { /* ... takes exactly 10 seconds */ }
    console.log('c');
  }

  function d() {
    // Promise that takes 5 second
    const p = new Promise(function(resolve, rej) {
        resolve('Hello')
    })
  }

  a(); b(); c(); d();

// Ques 2

let flag = true;

while(flag) {
    console.log('Hello there', flag)
}

function setValue() {
    setTimeout(() => {
        flag = false
    }, 2000)
}

setValue();

// // Ques make above work

// let flag = true;

// while(flag) {
//     console.log('Hello there', flag)
// }

// function sleep(delay = 0) {
//     return new Promise(resolve => setTimeout(resolve, delay))
// }
// async function setValue() {
//     await sleep(2000);
//     flag = false;
// }

// setValue();