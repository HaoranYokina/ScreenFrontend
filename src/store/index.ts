import type {App} from "vue";
import persist from "pinia-plugin-persist";
import {createPinia} from "pinia";

const store = createPinia();
store.use(persist);

export function setupStore(app: App<Element>) {
    app.use(store);
}

export {store};
