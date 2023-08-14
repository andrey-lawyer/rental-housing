<template>
  <Layout>
    <template v-slot="{user}">
    <div class="nav-link_block">
      <RouterLink class="link_nav" to="/">
        <inline-svg
      
        src="/images/icon.svg"
        width="80"
        height="20"
      />
     
      </RouterLink>
      <RouterLink class="link_nav" to="/apartments">Apartments</RouterLink>
      <template v-if="user">
      <RouterLink class="link_nav" to="/orders">Orders</RouterLink>
    </template>
    </div>
  </template>
  </Layout>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Layout from '@/components/LayoutHeader.vue'

</script>

<style scoped>

@media (max-width: 767px) {
.nav-link_block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
}
}
.link_nav {
  color: var(--vt-c-white);
  margin-right: 10px;
  display: inline-block;
  padding: 0.2rem 1rem;
  border-radius: 10px;
}
.router-link-exact-active {
  color: var(--vt-c-blue);
  background-color: var(--vt-c-white);
}

.link_nav:hover {
  outline: 1px solid var(--vt-c-white);
}

.router-link-exact-active:hover {
  outline: none;
}


</style>
