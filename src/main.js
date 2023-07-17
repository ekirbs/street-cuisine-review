import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueGoogleMaps from "@fawmi/vue-google-maps";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEnvelope,
  faCheck,
  faLock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

library.add(faEnvelope, faCheck, faLock, faSpinner, faGithub, faInstagram, faLinkedin);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDH7BdbUXCS6bgi4-kadjzN7gJiFvIDElg",
    // libraries: [places],
    // installComponents: true,
    language: "en",
  },
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
