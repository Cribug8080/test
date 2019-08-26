class Demo {
    static StaticFn () {
        console.log('StaticFn')
    }

    show () {
        console.log('show')
    }

    constructor (name) {
        this.name = name;
    }
}

// let d1 = new Demo('qwe');
// d1.StaticFn();
// d1.show();

function getPersonInfo(one, two, three) {
    console.log(one)
    console.log(two)
    console.log(three)
  }
  
const person = 'Lydia'
const age = 21
getPersonInfo`${person} is ${age} years old`