import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Projects from "../views/Projects.vue";
import Register from "../views/Register.vue";
import CheckIn from "../views/CheckIn.vue";
import Participants from "../views/Participants.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/checkin/:userID/:projectID",
    name: "CheckIn",
    component: CheckIn
  },
  {
    path: "/participants/:userID/:projectID",
    name: "Participants",
    component: Participants
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes
});

export default router;
