<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Menu</h3>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src alt class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <div class="product-test">
        <h3 class="d-inline-block">Menu</h3>
        <button @click="addNew" class="btn btn-primary float-right">
          Add Menu Item
        </button>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" v-bind:key="product">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <button class="btn btn-primary" @click="editProduct(product)">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    @click="deleteProduct(product)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <div class="form-group d-flex">
                  <div
                    class="p-1"
                    v-for="image in product.images"
                    v-bind:key="image"
                  >
                    <img :src="image" alt width="80px" />
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Menu Item</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <label>Product Name</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Name</span
                      >
                    </div>
                    <input
                      type="text"
                      placeholder="Product Name"
                      v-model="product.name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label>Product Description</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Description</span>
                    </div>
                    <textarea
                      name="description"
                      placeholder="Product Description"
                      v-model="product.description"
                      class="form-control"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Food Details</h4>
                <hr />

                <div class="form-group">
                  <label>Product Price</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Product price"
                      v-model="product.price"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input
                    type="file"
                    @change="uploadImage"
                    class="form-control"
                  />
                </div>

                <div class="form-group d-flex">
                  <div
                    class="p-1"
                    v-for="image in product.images"
                    v-bind:key="image"
                  >
                    <img :src="image" alt width="80px" />
                  </div>
                </div>

                <div class="progress">
                  <div class="progress-bar" style="min-width: 0px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >
              Add Item
            </button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from "../firebase";
import $ from "jquery";
import Swal from "sweetalert2";

export default {
  name: "Products",
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        images: [],
        comment: null,
      },
      activeItem: null,
      modal: null,
    };
  },
  firestore() {
    return {
      products: db.collection("products"),
    };
  },
  methods: {
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb
          .storage()
          .ref("products/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $(".progress-bar").css("width", progress + "%");
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    },

    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        images: [],
      };
      $(".progress-bar").css("width", 0 + "%");
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      $("#product").modal("hide");
    },
    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },
    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc[".key"]).delete();
          Swal.fire("Deleted!", "Menu Item has been deleted.", "success");
        }
      });
    },
    readData() {},
    addProduct() {
      this.$firestore.products.add(this.product);
      Swal.fire("Added!", "Menu Item successfully added", "success");
      $("#product").modal("hide");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
