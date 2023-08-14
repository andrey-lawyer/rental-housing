import { supabase } from "@/lib/supabaseClient"

import type {IApartment} from "@/type/apartmentType"
import type ICurrentUser from "@/type/userType"

import { useToast } from 'vue-toastification'

export async function  addOrder (apartment:IApartment| null, user: ICurrentUser| null, original:any){
  const toast = useToast()
    
    const order = {idUser: user?.id, photo: apartment?.image, place: apartment?.place, description: apartment?.shortDescription, price: apartment?.price}
    original.commit('setLoading', true)     
    try {
      const {error} = await supabase.from('orders').insert(order).select()
        if (error) {
          toast.error(error.message)
      } else {
        toast.success('Order is accepted!')
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      original.commit('setLoading', false)
    }
  }