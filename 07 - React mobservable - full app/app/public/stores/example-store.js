import {observable} from 'mobservable'
let counter = observable({
  timer: 0
})

counter.resetTimer = function() {
    counter.timer = 0;
};

setInterval(() => {
    counter.timer += 1;
}, 1000);

export default counter
