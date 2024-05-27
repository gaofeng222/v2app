import Alert from "./src/main.vue";

Alert.install = (Vue) => {
  Vue.component(Alert.name, Alert);
};

export default Alert;
