<script setup lang="ts">
import useOrders from '@/hooks/useOrders'

const { orders } = useOrders();

const patch = import.meta.env.VITE_PROJECT_NAME_SUPABASE + import.meta.env.VITE_IMAGES;

</script>

<template>
  <main>
    <section>
    <ContainerUi>
    
        <template v-if="orders && orders.length>0">
          <h1 class="title"> Your orders</h1>
        <ul class="orders-list">
          <template v-if="orders && orders.length > 0">
            <li class="orders-item" v-for="item in orders" :key="item.id">
              <img
                class="photo"
                loading="lazy"
                :src="patch + item.photo"
                :alt="item.photo"
              />
              <div  class="orders-block">
                <h2 class="place">{{ item.place }}</h2>
                <p class="description">{{ item.description }}</p>
                <p class="description">{{ item.price }}</p>
              </div>
            </li>
          </template>
        </ul>
      </template>
      <template v-if="orders && orders.length===0" >
        <p class="title">There are no orders here yet</p>
      </template>
    </ContainerUi>
  </section>
  </main>
</template>

<style scoped> 
.title{
text-align: center;
font-weight: bold;
margin-top: 20px;
font-size: 26px;

}
.orders-list{
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
.orders-item{

  border-radius: 20px;
  border: 1px solid var(--vt-c-blue);
}
.orders-block{
  border-radius: 20px;
  text-align: center;
  padding: 10px;
  
}
.photo{
 border-top-left-radius: 20px;
 border-top-right-radius: 20px;
 object-fit: cover;
}

.place{
  font-weight: bold;
  margin-bottom: 30px;
 
}
.description{
  font-size: 20px;
}
@media (min-width: 767px) {
  .photo{
  width: 350px;
  height: 300px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 0;
  }

 .orders-item{
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  border: 1px solid var(--vt-c-blue);
}

}
@media (min-width: 1200px) {
  .orders-item{
 
  border-radius: 20px;
  border: 1px solid var(--vt-c-blue);
}
.photo{
 width: 500px;
 height: 300px;
}
}
</style>