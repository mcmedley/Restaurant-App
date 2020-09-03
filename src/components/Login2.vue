<template>
  <div class="login2">
    <!-- Modal -->
    <div
      class="modal fade"
      id="login2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="login2Title"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul
              class="nav nav-fill nav-pills mb-3"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-login2"
                  role="tab"
                  aria-controls="pills-login2"
                  aria-selected="true"
                  >Login</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-r-tab"
                  data-toggle="pill"
                  href="#pills-r"
                  role="tab"
                  aria-controls="pills-r"
                  aria-selected="false"
                  >Sign Up</a
                >
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login2"
                role="tabpanel"
                aria-labelledby="pills-login2-tab"
              >
                <h5 class="text-center">Login Please</h5>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    @keyup.enter="login2"
                    v-model="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-primary" @click="login2">login</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-r"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Create a New User Account</h5>

                <div class="form-group">
                  <label for="name">Username</label>
                  <input
                    type="text"
                    v-model="name"
                    class="form-control"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-primary" @click="register">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb } from "../firebase";
import $ from "jquery";
import Swal from "sweetalert2";
export default {
  name: "login2",
  props: {
    msg: String,
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    login2() {
      var user = fb.auth().currentUser;
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          if (user.emailVerified) {
            $("#login2").modal("hide");
            this.$router.replace("admin2");
          } else {
            //alert("Please verify you email to login! - Team Eat24");
            Swal.fire({
              icon: "info",
              title: "Please verify you email to login! - Team Eat24",
            });
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            //alert(errorMessage);
            Swal.fire({
              icon: "error",
              title: "Wrong password.",
            });
          }
          console.log(error);
        });
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          var user = fb.auth().currentUser;
          user
            .sendEmailVerification()
            .then(function() {
              // alert("Please verify your email address! Thank You ");
              Swal.fire({
                icon: "info",
                title:
                  "Please verify your email address! Thank You! - Team Eat24 ",
              });
            })
            .catch(function(error) {
              //alert(error.message);
            });
          $("#login2").modal("hide");
          this.$router.replace("admin2");
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              name: this.name,
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            Swal.fire({
              icon: "warning",
              title: "The password is too weak.",
            });
          } else {
            //alert(errorMessage);
          }
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
