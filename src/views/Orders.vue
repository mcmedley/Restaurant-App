<template>
  <div class="order" id="orders">
    <div class="container">
      <h1 class="text-center p-5">Checkout</h1>
	  <router-link to="/admin2/last">
		<button class="btn btn-primary" style="display: block; margin: 0 auto;">Submit Order</button>
      </router-link>
      <div class="row p-5">
        <div class="col-md-4" v-for="order in orders" v-bind:key="order">
          <div class="card order-item">
            <div class="card-body">
              <div class="d-flex justify-content-between">
			    <h5 class="card-title">{{order.name}}</h5>
                <h5 class="card-title">{{order.price | currency}}</h5>
				
              </div>
			  <div class="d-last-thing-on-loop">
				<button @click="deleteItem(order)" class="btn btn-danger float-right">Delete</button>
			  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Orders",
  props: {
    msg: String
  },
  data() {
    return {
      orders: []
    };
  },
  firestore() {
    return {
      orders: db.collection("orders")
    };
  },
  methods: {
	deleteItem(order) {
	  this.$firestore.orders.doc(order[".key"]).delete();
    },
	deleteOrder(path) {
		var batch = db.batch()
		db.collection(path).listDocuments().then(val => {
			val.map((val) => {
				batch.delete(val)
			})

			batch.commit()
		})
	},
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .products {
//   margin-top: 7rem;
//   background: #f2f2f2;
//   padding-bottom: 3rem;
// }
</style>
