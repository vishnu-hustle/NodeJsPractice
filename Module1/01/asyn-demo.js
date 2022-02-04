fs = require('fs');


function loginfo(err, data) {
    console.log('Data: ', data);
}

fs.readdir('D:/', loginfo);


console.log("thus is after");


function ab(x) {
    return x("dude", "vishnu");
}


setTimeout(() => { ab(loginfo) }, 2000);

const person = {
    fullName: function() {
        let pr = new Promise((resolve, reject) => {
            resolve(this.firstName + " " + this.lastName);
            return pr.then(function(value) {
                return value;
            });
        });
    }
}

const person1 = {
    firstName: "vishnu",
    lastName: "reddy"
}

console.log(person.fullName.bind(person1));

let myPromise = new Promise(function(myResolve, myReject) {
    setTimeout(function() { myResolve("I love You !!"); }, 3000);
});

myPromise.then(function(value) {
    console.log(value);
});