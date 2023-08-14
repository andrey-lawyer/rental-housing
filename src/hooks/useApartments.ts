import { supabase } from '@/lib/supabaseClient'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useToast } from 'vue-toastification'

import type {IApartment} from '@/type/apartmentType'


export default  function useApartments(page = 1) {
  const {
    direct: { original }
  } = useStore()
  const toast = useToast()
   const apartments = ref<IApartment[] | []>([])

  async function  fetchApartments (page: number){
    original.commit('setLoading', true)     
    const firstEl = (page - 1) * 6
    const lastEl = firstEl + 5
    try {
      const { data, error }:PostgrestSingleResponse<IApartment[]> = await supabase.from('apartments').select().range(firstEl, lastEl)
          if (error) {
            toast.error(error.message)
      } else {
        apartments.value = [...apartments.value, ...data]
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      original.commit('setLoading', false)
    }
  }

  onMounted(() => {
    fetchApartments(page);
  })


  
  return { apartments, fetchApartments }
}
