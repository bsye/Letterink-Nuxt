export default function ({ store, app: { $axios }, redirect }) {
  store.dispatch("moodboards/setFeatured");
}
