

import { supabase } from '@/lib/supabaseClient'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { watch } from 'vue'
import { useToast } from 'vue-toastification'

import type IOrders from '@/type/ordersType'
import useCurrentUser from './useCurrentUser'


export default function useOrders() {
  const {
    direct: { original }
  } = useStore()
  const toast = useToast()
  const orders = ref<IOrders[] | null>(null)
  const { user } =  useCurrentUser()
  async function getOrders(userId: string) {
    original.commit('setLoading', true)
    try {
      const { data, error }: PostgrestSingleResponse<IOrders[]> = await supabase.from('orders').select().eq('idUser', userId)
      if (error) return toast.error(error.message)
      orders.value = data;
      
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      original.commit('setLoading', false)
    }
  }
  
  watch(user, (newUser) => {
    if (newUser !== null )
    getOrders(newUser?.id)
  })

  onMounted(()=>{
    original.dispatch('getCurrentUser');
  })
  return { orders }
}
