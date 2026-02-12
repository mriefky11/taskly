import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import {component} from './components';
import {createPinia} from 'pinia';

const pinia = createPinia();
let app = createApp(App);

app = component(app);
app.use(router);
app.use(pinia);
app.mount('#app');
