<template>
  <header class="header_app">
    <ContainerUi>
      <nav class="nav_app">
        <slot :user="user"></slot>

        <div class="nav_user" v-if="user && !loading">
          <img class="nav_user_-img" :src="user.picture" :alt="user.name" />
          <p>{{ user.name }}</p>
          <ButtonUi
            :myClass="'link'"
            @click="original.dispatch('logOutUser', user.id)"
            type="button"
            >Log Out</ButtonUi
          >
        </div>
        <div v-else-if="!user && !loading">
          <ButtonUi :myClass="'link'" @click="showModal"  type="button">Login</ButtonUi>
        </div>
      </nav>
      <ModalUi v-model:isShown="modelVisible">
        <ModalGoogle />
      </ModalUi>
    </ContainerUi>
  </header>
  <div class="no_header"></div>
  <div v-if="loading">
    <LoaderUi />
  </div>
</template>

<script setup lang="ts" name="Layout">

import useCurrentUser from '@/hooks/useCurrentUser'
import ModalGoogle from '@/components/ModalGoogle.vue'
import useModal from '@/hooks/useModal'
import { onMounted } from 'vue';

const { original, user, loading } = useCurrentUser();
const { modelVisible, showModal } = useModal();

onMounted(() => {
  original.dispatch('getCurrentUser');
});
</script>

<style scoped>
.header_app {
  line-height: 1.5;
  background-color: var(--vt-c-blue);
  position: fixed;
  z-index: 999999;
  width: 100%;

}
.no_header{
  height: 65px;
}
.nav_app {
  font-size: 12px;
  padding: 1rem 0;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.nav_user {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--vt-c-white);
}
.nav_user_-img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

@media (max-width: 767px) {
  .nav_app{
    display: block;
  }
  .nav_user {
  display: flex;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
  justify-content:end;  
  border-top: 1px solid var(--vt-c-white);
  padding-top: 8px;
  gap: 10px;
  color: var(--vt-c-white);
}
.no_header{
  height: 113px;
}
}
</style>

