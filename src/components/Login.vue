<template>
  <div class="login">
    <!-- Modal -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
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
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                  >Login</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-register-tab"
                  data-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                  >Sign Up</a
                >
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
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
                    @keyup.enter="login"
                    v-model="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-primary" @click="login">Login</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Create a New Resteraunt Account</h5>

                <div class="form-group">
                  <label for="name">Resteraunt name</label>
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
import { fb, db } from "../firebase";
import $ from "jquery";
import Swal from "sweetalert2";
export default {
  name: "login",
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
    login() {
      var user = fb.auth().currentUser;
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          if (user.emailVerified) {
            $("#login").modal("hide");
            this.$router.replace("admin");
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
            Swal.fire({
              icon: "error",
              title: "Wrong password.",
            });
          } else {
            // alert(errorMessage);
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
                title: "Please verify your email address! Thank You ",
              });
            })
            .catch(function(error) {
              //alert(error.message);
            });
          $("#login").modal("hide");
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
          this.$router.replace("admin");
          // db.collection("profiles")
          //   .doc(user.user.uid)
          //   .set({
          //     name: this.name,
          //   })
          //   .then(function() {
          //     console.log("Document successfully written!");
          //   })
          //   .catch(function(error) {
          //     console.error("Error writing document: ", error);
          //   });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            //alert("The password is too weak.");
            Swal.fire({
              icon: "warning",
              title: "The password is too weak.",
            });
          } else {
            // alert(errorMessage);
          }
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
