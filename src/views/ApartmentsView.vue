<script setup lang="ts">
import { ref } from 'vue'
import useApartments from '@/hooks/useApartments'
import ApartmentItem from '@/components/ApartmentItem.vue'
import useApartmentsSelection from '@/hooks/useApartmentsSelection'
import useCounts from '@/hooks/useCountLines';

const chosenOptions = ref([
  { value: 'europe', name: 'Europe' },
  { value: 'america', name: 'North America' }
])

const page = ref<number>(1)
const { apartments, fetchApartments } = useApartments(page.value)
const { select, input, newApartments, choice } = useApartmentsSelection()
const {totalPages}= useCounts();

const showSelect = ref(false)
const onClickSelection = () => (showSelect.value = true)
const onClickAll = () => (showSelect.value = false)
const updateShowSelect = (newValue: boolean) => {
  showSelect.value = newValue
}

const showObserver = ref(false)
const updateShowObserver = () => {
  showObserver.value = true
}

const onPage = async () => {
  if (totalPages.value!==page.value){
   page.value += 1
   await fetchApartments(page.value)
  }
}
</script>

<template>
  <main>
    <ContainerUi class="container">
      <div class="block">
        <SelectUi
          :options="chosenOptions"
          v-model="select"
          .showSelect="showSelect"
          @update-showSelect="updateShowSelect"
        />
        <ButtonUi :myClass="'button'" @click="onClickAll">Show all</ButtonUi>
      </div>
      <div class="block">
        <InputUi
          class="input_apartment"
          v-model.number="input"
          .showSelect="showSelect"
          @update-showSelect="updateShowSelect"
          placeholder="price from..."
        />
        <ButtonUi :disabled="!choice" :myClass="'button'" @click="onClickSelection"
          >Selection of housing</ButtonUi
        >
      </div>
      <ul class="apartments-list">
        <template v-if="!showSelect">
          <li class="apartments-item" v-for="item in apartments" :key="item.id">
            <ApartmentItem :apartment="item" @load-update="updateShowObserver" />
          </li>
        </template>

        <template v-if="showSelect">
          <template v-if="newApartments.length > 0">
            <li class="apartments-item" v-for="item in newApartments" :key="item.id">
              <ApartmentItem :apartment="item" />
            </li>
          </template>
          <template v-else>
            <p>There is nothing there!</p>
          </template>
        </template>
      </ul>
    </ContainerUi>
    <template v-if="showObserver && !showSelect">
      <div v-intersection="onPage" class="observer"></div>
    </template>
    <div  class="last"></div>
  </main>
</template>

<style>
.apartments-list {
  display: grid;
  grid-template-columns: repeat( 1fr);
  gap: 10px;
}
.apartments-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.apartments-item:hover .apartment-description {
  opacity: 1;
}


.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.block {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.observer {
  height: 20px;
}
.last{
  height: 20px;
}

@media screen and (min-width: 768px) {
  .apartments-list {
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
}

@media screen and (max-width: 767px) {
  .block {
    gap: 5px;

}



}
</style>
