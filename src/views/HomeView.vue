<script setup lang="ts">


</script>

<template>
  <main class="home_page">
    <section >
    <h1 class="title-home"> This is an app for booking the finest apartments worldwide!</h1> 
    <div class="image-home"> </div>
    </section>

  </main>
</template>

<style scoped> 
.home_page{
  width: 100vw;
  height: 100vh;
  background-image: url('../images/hero.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  
}
.image-home{
  background-image: url('../images/wellcome.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 350px;
  height: 150px;
  border-radius: 20px;
  position: absolute;
  top:30%;
left:50%;
transform:translate(-50%, -50%);

opacity: 0;
  animation: fade 3s ease-in-out 1s forwards; 
}
.title-home{
  text-align: center;
width: 350px;
margin: 0 auto;
background-color: var(--vt-c-white);
color: var(--vt-c-blue);
border-radius: 10px;
  padding: 10px;
}

@keyframes fade {
  0% {
    opacity: 0; 
  }
  5% {
    opacity: 0,1; 
  }
  10% {
    opacity: 0,2; 
  }
  20% {
    opacity: 0,5; 
  }
  35% {
    opacity: 1; 
  }
  50% {
    opacity: 0,7; 
  }
  70% {
    opacity: 0,5; 
  }
  80% {
    opacity: 0,2 
  }
 90% {
    opacity: 0,1; 
  }
  100% {
    opacity: 0; 
  }
}


</style>

