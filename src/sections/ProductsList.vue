<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Menu</h1>
      <div class="row">
        <div class="col-md-4" v-for="product in products" v-bind:key="product">
          <div class="card product-item">
            <Carousel :perPage="1">
              <Slide v-for="image in product.images" v-bind:key="image">
                <img
                  :src="image"
                  class="card-img-top"
                  alt="..."
                  width="250px"
                />
              </Slide>
            </Carousel>
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.name }}</h5>
                <h5 class="card-priceS">{{ product.price | currency }}</h5>
              </div>
              <div class="d-flex justify-content-between">
                <h7 class="card-priceS">{{ product.description }}</h7>
              </div>
			  <div class="d-bottom-of-screen">
				<button @click="addItem(product)" class="btn btn-primary float-right">Add to cart</button>
			  </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="text-center p-2">Customer Opinion</h5>
              <div class="d-flex justify-content-center">
                <div class="btn-toolbar">
                  <button @click="upVote(product)" class="btn btn-danger">
                    <i class="far fa-thumbs-up"></i>
                  </button>
                  <span style="padding-left:20px"></span>
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title">{{ product.rating }}</h5>
                  </div>
                  <span style="padding-left:15px"></span>
                  <button @click="downVote(product)" class="btn btn-danger">
                    <i class="far fa-thumbs-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="form-group">
              <input
                type="text"
                placeholder="comments"
                v-model="comment"
                class="form-control"
              />
              <input
                type="submit"
                @click="addComment(product)"
                value="Post"
                class="btn btn-danger w-100"
              />
              <p v-for="profile in product.profiles" v-bind:key="profile">
              <p v-for="comment in product.comments" v-bind:key="comment">
                <span class="p-1">{{comment }}</span>
              </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Productslist",
  props: {
    msg: String,
  },
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      profile: {
        name: null,
      },
      product: {
        comments: [],
        rating: 0,
      },
      comment: null,
      products: [],
    };
  },
  firestore() {
    return {
      products: db.collection("products"),
      profile: db.collection("profiles"),
	  orders: db.collection("orders"),
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    },
    upVote(doc) {
      this.$firestore.products.doc(doc[".key"]).update({
        rating: this.product.rating + 1,
      });
      this.product.rating += 1;
    },
    downVote(doc) {
      this.$firestore.products.doc(doc[".key"]).update({
        rating: this.product.rating - 1,
      });
      this.product.rating -= 1;
    },
    addComment(doc) {
      this.product.comments.push(this.comment);
      this.$firestore.products.doc(doc[".key"]).update(this.product);
    },
	addItem(product) {
	  this.$firestore.orders.add(product);
      Swal.fire("Item Added to cart!", "success");
	}
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  background: #f2f2f2;
  background-image: url("/img/bg.jpg");
  padding-bottom: 3rem;
}
.btn btn-danger {
  text-align: center;
  margin-top: 20px;
}
.glyphicon:hover {
  opacity: 0.75;
  cursor: pointer;
}
.glyphicon {
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
}
</style>
