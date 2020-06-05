<template>
  <div id="app">
    <Navigation
      :user="user"
      @logout="logout" />
    <router-view
      clas="container"
      :user="user"
      :projects="projects"
      :error="error"
      @logout="logout"
      @addProject="addProject"
      @deleteProject="deleteProject"
      @checkIn="checkIn" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Firebase from "firebase";
import db from "./db.js";

export default {
  name: "App",
  data: function () {
    return {
      user: null,
      error: null,
      projects: []
    }
  },
  methods: {
    logout: function() {
      Firebase.auth()
      .signOut()
      .then(() => {
        this.user =null;
        this.$router.push("login");
      })
    },
    addProject: function(payload) {
      db.collection("users")
      .doc(this.user.uid)
      .collection("projects")
      .add({
        name: payload,
        createdAt: Firebase.firestore.FieldValue.serverTimestamp()
      });
    },
    deleteProject: function(payload) {
      db.collection("users")
      .doc(this.user.uid)
      .collection("projects")
      .doc(payload)
      .delete();
    },
    checkIn: function(payload) {
      db.collection("users")
      .doc(payload.userID)
      .collection("projects")
      .doc(payload.projectID)
      .get()
      .then(doc => {
        if (doc.exists) {
          db.collection("users")
          .doc(payload.userID)
          .collection("projects")
          .doc(payload.projectID)
          .collection("participants")
          .add({
            displayName: payload.displayName,
            email: payload.email,
            createdAt: Firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => this.$router.push("/participants/" + payload.userID + '/' + payload.projectID))
        } else {
          this.error = "Sorry, no such project."
        }
      })
    }
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;

        db.collection("users")
        .doc(this.user.uid)
        .collection("projects")
        .onSnapshot(snapshot => {
          const snapData = [];
          snapshot.forEach(doc => {
            snapData.push({
              id: doc.id,
              name: doc.data().name
            });
          });
          this.projects = snapData.sort((a,b) => {
            if (a.name.toLowerCase() - b.name.toLowerCase) {
              return -1;
            } else {
              return 1;
            }
          });
        });
      }
    });
  },
  components: {
    Navigation
  }
};
</script>
<style lang="scss">
$primary: #05b2dd;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
