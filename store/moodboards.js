const state = () => ({
  userMoodboards: {},
});

const mutations = {
  setMoodboards(state, payload) {},

  addMoodboard(state, payload) {
    const userMoodboard = state.userMoodboards[payload.id] || moodboard;
    state.userMoodboards[payload.id] = userMoodboard;
  },

  addInspirationToMoodboard(state, payload) {
    const { moodboard, inspiration } = payload;

    const userMoodboard = state.userMoodboards[moodboard.id] || moodboard;
    state.userMoodboards[moodboard.id] = userMoodboard;

    state.userMoodboards[moodboard.id].inspirationItems.push(inspiration);
  },
};

const actions = {
  createMoodboard(context, payload) {
    context.commit("addMoodboard", {
      title: payload,
      id: 1,
      inspirationItems: [],
    });
  },
};

export default { state, mutations };
