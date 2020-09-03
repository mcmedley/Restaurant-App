<template>
  <div class="order" id="orders">
    <div class="container">
      <h3 class="text-center p-5">Your order has been submitted!</h3>
	</div>
	<div class="container2">
     <router-link to="/admin2/menu">
		<button @click="deleteOrder()" class="btn btn-primary" style="display: block; margin: 0 auto;">Back to Menu</button>
     </router-link>
	 <div class="container3" onload="deleteOrder(order)" v-for="order in orders" v-bind:key="order">
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
  firestore() {
    return {
      orders: db.collection("orders")
    };
  },
  methods: {
      deleteOrder(order) {
		this.$firestore.orders.doc(order[".key"]).delete();
	  },
  }
};
</script>
	