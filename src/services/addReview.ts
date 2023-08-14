import { supabase } from '@/lib/supabaseClient'
import { useToast } from 'vue-toastification'

import type {IReview} from '@/type/apartmentType'

export async function addReview(review: IReview[], id: number|undefined) {
  const toast = useToast()
  try {
    const { error, data } = await supabase
      .from('apartments')
      .update({ reviews: review })
      .eq('id', id)
      .select()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Review sent!')
      return data;
    }
  } catch (error) {
    if (error instanceof Error) toast.error(error.message)
  }
}
