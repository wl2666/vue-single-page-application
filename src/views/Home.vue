<template>
  <div class="mt-3">
    <div class="text-secondary text-center">
      <div v-if="user" class="text-center">
        Welcome back
        <span class="font-weight-bold text-info">{{user.displayName}}</span>, <a href="#" role="button" class="text-primary" @click="$emit('logout')">logout</a>
      </div>
    </div>
    <hr>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-10 col-lg-8 col-xl-7">
          <h4 class="display-4 text-primary mb-2">Projects Dashboard</h4>
          <p class="lead">
            This simple management application is to help you organize your projects when you pursue your degree at TC, allowing you to
            track certain task sets and finish your tasks on time!
          </p>

          <router-link
            class="btn btn-outline-primary mr-2"
            to="/register"
            v-if="!user"
          >Register</router-link>
          <router-link
            class="btn btn-outline-primary mr-2"
            to="/login"
            v-if="!user"
          >Log In</router-link>
          <router-link
            class="btn btn-primary"
            to="/projects"
            v-if="user"
          >Projects</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "home",
  props: ["user"]
};
</script>
