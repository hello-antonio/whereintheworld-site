import axios from 'axios'

const API =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://restcountries.com/v2'

export default {
  getAll() {
    return axios
      .get(`${API}/all?name;population;region;capital;flag;alpha3Code`)
      .then(res => res.data)
  },
  getCountryByAlphaCode(code) {
    return axios
      .get(
        `${API}/alpha/${code}?fields=name;capital;population;flag;nativeName;region;subregion;topLevelDomain;currencies;languages;borders`
      )
      .then(res => res.data)
  },
  getAllExtra() {
    return axios.get(
      `${API}/all?fields=name;population;region;capital;flag;alpha3Code;nativaName;subregion;topLevelDomain;currencies;languages;borders`
    )
  },
  getAllLinks(codes) {
    if (codes === undefined && codes.length == 0) return []
    return axios
      .all(
        codes.map(code =>
          axios.get(`${API}/alpha/${code.toLowerCase()}?fields=name;alpha3Code`)
        )
      )
      .then(
        axios.spread(function(...res) {
          let data = []
          res.forEach(item => {
            data.push(item.data)
          })
          return data
        })
      )
  }
}
