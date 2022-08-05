import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    key: "LETTERINK_MOODBOARDS",
  }).plugin(store);


}