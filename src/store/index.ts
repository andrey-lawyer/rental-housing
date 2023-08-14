import { supabase } from './../lib/supabaseClient'
import { createDirectStore } from 'direct-vuex'
import { useToast } from 'vue-toastification'
import type { IState } from './../type/storeType'
import type ICurrentUser from '@/type/userType'

const toast = useToast()

const { store } = createDirectStore({
  state: () => ({
    userCurrent: null as ICurrentUser | null,
    isLoading: false
  }),
  mutations: {
    setUser(state: IState, user: ICurrentUser) {
      state.userCurrent = user
    },
    setLoading(state: IState, bool: boolean) {
      state.isLoading = bool
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      commit('setLoading', true)

      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser()
        if (error) {
          if (error.message === 'User not found') {
            return console.log(error.message)
          } else return toast.error(error.message)
        }
        commit('setUser', { ...user?.user_metadata, id: user?.id })
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      } finally {
        commit('setLoading', false)
      }
    },

    async logOutUser({ commit }, idUser) {
      commit('setLoading', true)
      try {
        const { error } = await supabase.auth.admin.deleteUser(idUser)
        commit('setLoading', false)
        if (error) return toast.error(error.message)
        else {
          commit('setUser', null)
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      } finally {
        commit('setLoading', false)
      }
    },

    async loginUser({ commit }) {
      commit('setLoading', true)
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google'
        })
        if (error) return toast.error(error.message)
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      } finally {
        commit('setLoading', false)
      }
    }
  }
})

export default store

export type AppStore = typeof store
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore
  }
}
