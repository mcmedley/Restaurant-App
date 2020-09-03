<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Delivery Information</h3>
          </div>
        </div>
      </div>

      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active pt-3"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <label>Name</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Name</span
                      >
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      v-model="profile.name"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-8">
                <div class="form-group">
                  <label>Phone Number</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Phone Number</span
                      >
                    </div>
                    <input
                      type="text"
                      v-model="profile.phone"
                      placeholder="xxx-xxx-xxxx"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-8">
                <div class="form-group">
                  <label>Address</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Address</span
                      >
                    </div>
                    <input
                      type="text"
                      v-model="profile.address"
                      placeholder="Address"
                      class="form-control"
                    />
                  </div>
                </div>

                <div>
                  <Location></Location>
                </div>
                <div>
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateProfile"
                      value="Update Profile"
                      class="btn btn-primary w-100"
                    />
                  </div>
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
import { VueEditor } from "vue2-editor";
import { fb, db } from "../firebase";
import Location from "../views/Location.vue";
export default {
  name: "profile",
  components: {
    VueEditor,
    Location,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      profile: {
        name: null,
        phone: null,
        address: null,
      },
    };
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid),
    };
  },
  methods: {
    updateProfile() {
      this.$firestore.profile
        .update({
          name: this.profile.name,
          phone: this.profile.phone,
          address: this.profile.address,
        })
        .then(function() {
          Swal.fire(
            "Updated!",
            "Delivery details successfully Updated",
            "success"
          );
        });
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
