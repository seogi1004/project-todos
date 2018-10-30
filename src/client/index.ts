import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import 'typeface-roboto';
// https://vuetifyjs.com/en/framework/icons#introduction
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.use(Vuetify);

new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
});
