<template>
  <div class="choice">
    <div
      class="modal fade"
      id="choice"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">What do you Wanna do ?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <button
              class="btn btn-primary btn-lg btn-block"
              data-toggle="modal"
              data-target="#login"
              @click="register"
            >Deliver</button>
            <button
              class="btn btn-primary btn-lg btn-block"
              data-toggle="modal"
              data-target="#login2"
              @click="register"
            >Order</button>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "choice",
  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    register() {
      $("#choice").modal("hide");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
