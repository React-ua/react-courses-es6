import {observable, observe, toJSON} from 'mobservable'
const person = observable({
    firstName: "Maarten",
    lastName: "Luther"
});
console.log(person);
console.log(toJSON(person));
const disposer = observe(person, (change) => {
    console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name]);
});

person.firstName =  "Martin";
// Prints: 'update firstName from Maarten to Martin'

disposer();
// Ignore any future updates
person.firstName =  "Mohamed";
// Nothing happened
