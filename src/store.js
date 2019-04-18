import Vue from 'vue'
import Vuex from 'vuex'
import RestCountries from './services/RestCountries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selection: 'All',
    searchQuery: '',
    networkError: false,
    regions: ['All'],
    regionTotals: {},
    countriesLinks: [],
    data: []
  },
  mutations: {
    SET_SELECTION: (state, selection) => {
      state.selection = selection
    },
    SET_SEARCH_QUERY: (state, query) => {
      state.searchQuery = query
    },
    NETWORK_STATUS: (state, status) => {
      state.networkError = status
    },
    SET_REGIONS: (state, regions) => {
      state.regions = regions
    },
    SET_REGION_TOTALS: (state, results) => {
      state.regionTotals = results
    },
    SET_DATA_URLS: (state, data) => {
      state.countriesLinks = data
    },
    SET_DATA: (state, data) => {
      state.data = data
    }
  },
  actions: {
    setSelection({ commit }, selection) {
      commit('SET_SELECTION', selection)
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query)
    },
    networkStatus({ commit }, status) {
      commit('NETWORK_STATUS', status)
    },
    setData({ commit }, data) {
      let totals = data.reduce(function(acc, { region }) {
        // count all
        if (!acc['All']) acc['All'] = 0
        // there are two empty region keys
        if (region.length)
          if (region in acc) {
            acc[region]++
          } else {
            acc[region] = 1
          }
        acc['All']++
        return acc
      }, [])

      let regions = Object.keys(totals)
      // sort but 'All' must be first
      regions.sort() // firt sort then add 'All'
      regions.unshift('All') // at index 0
      regions.splice(regions.lastIndexOf(regions[0]), 1) // remove last 'All'

      // commit all
      commit('SET_DATA', data)
      commit('SET_REGIONS', regions)
      commit('SET_REGION_TOTALS', totals)
    },
    setCountryLinks({ commit }, data) {
      let countriesData = data.reduce(function(acc, { alpha3Code, name }) {
        acc[alpha3Code] = {
          name: name,
          alpha3Code: alpha3Code
        }
        return acc
      }, [])

      commit('SET_DATA_URLS', countriesData)
    },
    setAllData({ commit }) {
      RestCountries.getAllExtra()
        .then(res => {
          commit('SET_DATA', res.data)
          commit('NETWORK_STATUS', false)
        })
        .catch(error => {
          console.log(error)
          commit('NETWORK_STATUS', true)
        })
    }
  }
})
