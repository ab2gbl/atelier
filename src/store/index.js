import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    account:{
      "id": null,
      "email": null,
      "username": null,
      "role": null,
      "is_verified": null,
      "image": null,
      "skills": null
    },
    Planfiedchallenges:[],
    NonPlanfiedchallenges:[],
  },
  getters: {
    // Get the account object from the state
    getAccount: state => state.account
  },
  mutations: {
    // Update the account object in the state
    setAccount: (state, data) => {
      state.account = data;
    },
    GetPlanfiedchallenges_M(state){
      axios.get('http://127.0.0.1:8000/getPlanfiedchallenges/').then(resp=>{
          state.Planfiedchallenges=resp.data
      })
    }, GetNonPlanfiedchallenges_M(state){
      axios.get('http://127.0.0.1:8000/getNonPlanfiedchallenges/').then(resp=>{
          state.NonPlanfiedchallenges=resp.data
      })
    }
    
  },
  actions: {
    login: ({ commit }, data) => {
      // Call the setAccount mutation to update the account object
      commit('setAccount', data);
    },
    GetPlanfiedchallenges ({ commit }) {
      commit('GetPlanfiedchallenges_M')
    },
    GetNonPlanfiedchallenges ({ commit }) {
      commit('GetNonPlanfiedchallenges_M')
    }
  },
  modules: {}
});