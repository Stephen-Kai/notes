import Vue from '/vue.js';

const vm = new Vue({
    el: '#app',
    data: {
        msg: 'basic-msg',
        text: 'test 文本',
        html: '<p>html文本</p>',
        count: 0,

    },
    methods: {
        sayHello() {
            alert('hello world');
        }
    }
})

console.log(vm);
