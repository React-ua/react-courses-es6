import {observable, transaction, autorun} from "mobservable";

const numbers = observable([]);

autorun(() => console.log(numbers.length, "numbers!"));
// Prints: '0 numbers!'

transaction(() => {
    numbers.push(1);
    numbers.push(2);
    numbers.push(3);
});
// Prints: '3 numbers!'
