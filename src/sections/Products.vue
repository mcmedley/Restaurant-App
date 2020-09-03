<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="services">Services</h1>
      <div class="row">
        <div class="col-md-4">
          <img
            src="/img/delivery.svg"
            class="card-img-top"
            alt="..."
            width="100"
            height="250"
          />
          <br />
          <div class="card product-item">
            <div class="card-body">
              <h3 class="card-title" align="center">24/7 Delivery</h3>
              <p class="card-text">
                Order whatever you desire whenever you desire it! Eat24 offers
                food delivery 24 hours a day, 7 days a week. Order from any
                restaurants in your range, and never stay hungry.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <img
            src="/img/delivery1.svg"
            class="card-img-top"
            alt="..."
            width="100"
            height="250"
          />
          <div class="card product-item">
            <div class="card-body">
              <h3 class="card-title" align="center">Efficient Delivery</h3>
              <p class="card-text">
                Eat24 not only offers 24/7 deliveries, but also offers some of
                the fastest deliveries in the business. We guarantee to deliver
                your desired food hot and fresh as fast as possible. We always
                put our customers first!
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <img
            src="/img/grocery.svg"
            class="card-img-top"
            alt="..."
            width="100"
            height="250"
          />
          <div class="card product-item">
            <div class="card-body">
              <h3 class="card-title" align="center">Multiple Choices</h3>
              <p class="card-text">
                No need to worry about getting stuck on what to eat, we offer a
                wide variety on restuarant choices. We make sure to only have
                the best food to deliver for our customers, that varies from all
                different type of cuisines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #191919;
  background-image: url("/img/bg.jpg");
  padding-bottom: 3rem;
}
img {
  padding-bottom: 10%;
}
</style>

<style scoped lang="scss">
.services {
  font-weight: 600;
  color: white;
  padding: 30px;
  text-align: center;
  font-size: 70px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
