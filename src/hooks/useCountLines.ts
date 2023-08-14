
  import { supabase } from '@/lib/supabaseClient'
import { computed, onMounted, ref } from 'vue'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useToast } from 'vue-toastification'

export default  function useCounts() {
  const toast = useToast()
   const elements = ref<any>()

  async function  fetchCount (){
   
    try {
      const {count, error}:PostgrestSingleResponse<number[]> = await supabase.from('apartments')
      .select('count', { count: 'exact' });
         if (error) {
          toast.error(error.message)
      } else {
        elements.value = count
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    } 
  }
  onMounted(() => {
    fetchCount();
  })
  const totalPages = computed(() => Math.ceil(elements.value / 6))

  return {elements, totalPages}
}
