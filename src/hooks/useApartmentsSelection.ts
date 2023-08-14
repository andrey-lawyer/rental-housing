import { supabase } from '@/lib/supabaseClient'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

import type {IApartment} from '@/type/apartmentType'


export default function useApartmentsSelection() {
  const toast = useToast()
  const apartmentsAll = ref<IApartment[] | []>([])
  const choice = computed(() => {
    if (select.value || input.value) return true
    return false
  })

  async function fetchApartments() {
    try {
      const { data, error } = await supabase.from('apartments').select()
      if (error) {
        toast.error(error.message)
      } else {
        apartmentsAll.value = data
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  onMounted(() => fetchApartments())

  const select = ref('');
  const input = ref<number>();

  const newApartments = computed(() => {
    const townsAmerica = select.value === 'america' ? ['Mexico City', 'Ottawa', 'New Orleans'] : []
    const townsEurope =
      select.value === 'europe'
        ? ['London', 'Paris', 'Brussels', 'Kyiv', 'Warsaw', 'Luxembourg', 'Stockholm', 'Budapest']
        : []

    const array = apartmentsAll.value.filter((el) => {
      if (select.value) {
        if (townsAmerica.includes(el.place)) {
          if (input.value && parseInt(el.price) > input.value) {
            return el
          }
          if (!input.value) {
            return el
          }
        }
        if (townsEurope.includes(el.place)) {
          if (input.value && parseInt(el.price) > input.value) {
            return el
          }
          if (!input.value) {
            return el
          }
        }
      }
      if (input.value && parseInt(el.price) > input.value && !select.value) {
        return el
      }
    })
    return array
  })

  return { select, input, choice, newApartments }
}
