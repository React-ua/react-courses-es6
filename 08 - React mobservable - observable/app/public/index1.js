import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
// observable accepts a value and returns a getter / setter function that holds this value
const cityName = observable("Vienna");

// The returned function can be invoked without arguments to get the currently stored value
console.log(cityName());
// prints 'Vienna'


// Registers an observer function that will fire each time the stored value is replaced.
cityName.observe(function(newCity, oldCity) {
  console.log(oldCity, "->", newCity);
});
// observable can be invoked with one argument to update the currently stored value.
// Replaces the currently stored value. Notifies all observers.
cityName("Amsterdam");
// prints 'Vienna -> Amsterdam'
