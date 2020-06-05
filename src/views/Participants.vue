<template>
<div class="container mt-4">
  <div class="row justify-content-center">
    <div class="col-md-8"
      v-if=" user !== null && user.uid == userID">
      <h1 class="font-weight-light text-center">Participants</h1>

      <div class="card bg-light mb-4">
        <div class="card-body text-center">
          <div class="input-group input-group-lg">
            <input
              type="text"
              placeholder="Search Participants"
              class="form-control"
              v-model="searchQuery"
              ref="searchQuery" />
            <div class="input-group-append">
              <button
                class="btn btn-sm btn-outline-info"
                title="Pick a random participant"
                @click="chooseRandom">
                <font-awesome-icon icon="random"></font-awesome-icon>
              </button>
              <button
                class="btn btn-sm btn-outline-info"
                title="Reset Search"
                @click="resetQuery">
                <font-awesome-icon icon="undo"></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1" v-for="item in filteredParticipants" :key="item.id">
      <div class="card">
        <div class="card-body px-3 py-2 d-flex align-items-center justify-content-center">
          <div class="btn-group pr-2" v-if="user !== null && user.uid == userID">
            <button class="btn btn-sm" :class="[
                  item.star ? 'text-danger': '', 'btn-outline-secondary'
                ]" title="Give user a Star" @click="toggleStar(item.id)">
              <font-awesome-icon icon="star"></font-awesome-icon>
            </button>
            <a class="btn btn-sm btn-outline-secondary" title="Send user an email" :href="'mailto:' + item.email">
              <font-awesome-icon icon="envelope"></font-awesome-icon>
            </a>
            <button class="btn btn-sm btn-outline-secondary" title="Delete Participant" @click="deleteParticipant(item.id)">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </button>
          </div>
          <div>{{item.displayName}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import db from "../db.js"
export default {
  name: "Participants",
  data: function() {
    return {
      participants: [],
      displayParticipants: [],
      searchQuery: "",
      userID: this.$route.params.userID,
      projectID: this.$route.params.projectID
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    filteredParticipants: function() {
      const dataFilter = item => item.displayName.toLowerCase().match(this.searchQuery.toLowerCase()) && true;
      return this.displayParticipants.filter(dataFilter);
    }
  },
  methods: {
    chooseRandom: function() {
      const randomParticipant = Math.floor(Math.random() * this.participants.length);
      this.displayParticipants = [this.participants[randomParticipant]];
      //[add the following comment line to avoid console error from eslintrc.js]
      // eslint-disable-next-line
      console.log(this.displayParticipants);
    },
    resetQuery: function() {
      this.displayParticipants = this.participants;
      this.searchQuery = "";
      this.$refs.searchQuery.focus();
    },
    toggleStar: function(participantID) {
      const ref = db
        .collection("users")
        .doc(this.user.uid)
        .collection("projects")
        .doc(this.projectID)
        .collection("participants")
        .doc(participantID);

      ref.get().then(doc => {
        const star = doc.data().star;
        if (star) {
          ref.update({
            star: !star
          });
        } else {
          ref.update({
            star: true
          });
        }
      });
    },
    deleteParticipant: function(participantID) {
      if (this.user && this.user.uid == this.userID) {
        db.collection("users")
          .doc(this.user.uid)
          .collection("projects")
          .doc(this.projectID)
          .collection("participants")
          .doc(participantID)
          .delete();
      }
    }
  },
  props: ["user"],
  mounted() {
    db.collection("users")
      .doc(this.userID)
      .collection("projects")
      .doc(this.projectID)
      .collection("participants")
      .onSnapshot(snapshot => {
        const snapData = [];
        snapshot.forEach(doc => {
          snapData.push({
            id: doc.id,
            email: doc.data().email,
            displayName: doc.data().displayName,
            star: doc.data().star
          });
        });
        this.participants = snapData;
        this.displayParticipants = this.participants;
      });
  }
}
</script>
