import {mobservable, observable, observe} from 'mobservable';

var person = observable({
    name: "John",
    age: 42,
    showAge: false,
    labelText: function() {
        return (this.showAge ? `${this.name} (age: ${this.age})` : this.name);
    }
});

console.log(person.labelText);
//  prints: John (age: 42)

// object properties don't expose an 'observe' method,
// but don't worry, 'mobservable.observe' is even more powerful
mobservable.observe(() => console.log(person.labelText));

person.name = "Dave";
// prints: Dave (age: 42)

person.age = 21;
// prints: Dave (age: 21)
