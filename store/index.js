const state = () => ({
  textColor: null,
  backgroundColor: null,
});

const mutations = {
  updateTextColor(state, payload) {
    state.textColor = payload;
  },

  updateBackgroundColor(state, payload) {
    state.backgroundColor = payload;
  },
};

export default { state, mutations };
