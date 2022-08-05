const { v4: uuidv4 } = require("uuid");
import { Base64 } from "js-base64";

import query from "~/graphql/queries/moodboards";

export const state = () => ({
  userMoodboards: {
    featured: null,
    elements: null,
  },

  currentInspiration: false,
  currentMoodboard: false,
});

export const mutations = {
  SET_FEATURED(state, moodboard) {
    state.userMoodboards.featured = {
      ...state.userMoodboards.featured,
      [moodboard.id]: moodboard,
    };
  },

  SET_CURRENT_INSPIRATION(state, inspiration) {
    state.currentInspiration = inspiration
  },

  SET_CURRENT_MOODBOARD(state, moodboard) {
    state.currentMoodboard = moodboard
  },

  NEW_MOODBOARD(state, moodboard) {
    state.userMoodboards.elements = {
      ...state.userMoodboards.elements,
      [moodboard.id]: moodboard,
    };
  },

  ADD_TO_MOODBOARD(state, payload) {
    const moodboard = payload.moodboard;
    if (state.currentInspiration)
      state.userMoodboards.elements[moodboard.id].inspirationItems = [
        ...state.userMoodboards.elements[moodboard.id].inspirationItems,
        state.currentInspiration,
      ];
  },
};

export const getters = {
  areFeaturedSet(state) {
    return state.userMoodboards.featured ? true : false
  },

  getFeatured(state) {
    return state.userMoodboards.featured
  },

  getCurrentMoodboard(state) {
    return state.currentMoodboard
  },

  getUserMoodboards(state) {
    return state.userMoodboards.elements
  },
}

export const actions = {
  createMoodboard(context, name) {
    context.commit("NEW_MOODBOARD", {
      title: name,
      id: uuidv4(),
      inspirationItems: [],
    });
  },

  generateShare(context, name) {
    const currentMoodboard = JSON.stringify(context.state.currentMoodboard)
    return encodeURIComponent(Base64.encode(currentMoodboard));
  },

  setCurrentMoodboard(context, moodboard) {
    context.commit("SET_CURRENT_MOODBOARD", moodboard);
  },

  duplicateBoard(context) {
    const currentMoodboard = context.state.currentMoodboard
    context.commit("NEW_MOODBOARD", {
      title: currentMoodboard.title,
      originalId: currentMoodboard.id,
      id: uuidv4(),
      inspirationItems: currentMoodboard.inspirationItems
    })
  },

  setCurrentInspiration(context, inspiration) {
    context.commit("SET_CURRENT_INSPIRATION", {
      id: inspiration.id,
      image: inspiration.image,
      title: inspiration.title,
    });
  },

  async setFeatured(context, name) {
    try {
      const featured = await this.$graphql.default.request(query)
      featured.moodboards.forEach(moodboard => context.commit('SET_FEATURED', moodboard))
    } catch (error) {
      console.log('Featured moodboards error', error)
    }
  }
};
