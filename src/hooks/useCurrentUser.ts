import { computed} from 'vue'
import { useStore } from 'vuex'
export default function useCurrentUser() {
  const {
    direct: { original}
  } = useStore()
  const user = computed(() => original.state.userCurrent)
  const loading = computed(() => original.state.isLoading)
 
  return { original, user, loading }
}
