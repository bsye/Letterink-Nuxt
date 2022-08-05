export default function ({ store, app: { $axios }, redirect }) {
  console.log(store.getters["moodboards/areFeaturedSet"]);
  store.dispatch("moodboards/setFeatured");
}
