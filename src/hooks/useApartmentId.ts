import { supabase } from '@/lib/supabaseClient'
import { useStore } from 'vuex'
import type { IApartment } from '@/type/apartmentType'
import { onMounted, ref } from 'vue'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useToast } from 'vue-toastification'

export default function useApartments(id: string | string[]) {
  const {
    direct: { original }
  } = useStore()
  const toast = useToast()
  const apartment = ref<IApartment | null>(null)

  async function getApartmentId() {
    original.commit('setLoading', true)
    try {
      const { data, error }: PostgrestSingleResponse<IApartment> = await supabase
        .from('apartments')
        .select()
        .eq('id', id)
        .single()
      if (error) return toast.error(error.message)
      apartment.value = data
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      original.commit('setLoading', false)
    }
  }
  onMounted(() => {
    getApartmentId()
  })

  return { apartment }
}
