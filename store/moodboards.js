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

  RENAME_INSPIRATION(state, {moodboard, moodboardName}) {
    state.userMoodboards.elements[moodboard.id].title = moodboardName;
  },

  DELETE_INSPIRATION(state, {inspiration, moodboard}) {
    const remaining = state.userMoodboards.elements[moodboard.id].inspirationItems.filter((item) => item.id != inspiration.id);
    state.userMoodboards.elements[moodboard.id].inspirationItems = remaining
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

  ADD_TO_MOODBOARD(state, {moodboardId, inspiration}) {
    state.userMoodboards.elements[moodboardId].inspirationItems = [
      ...state.userMoodboards.elements[moodboardId].inspirationItems,
      inspiration,
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

  getUserMoodboardById: (state) => (id) => {
    return state.userMoodboards.elements[id]
  },

  getCurrentMoodboard(state) {
    return state.currentMoodboard
  },

  getCurrentInspiration(state) {
    return state.currentInspiration
  },

  getMoodboardsCount(state) {
    if (!process.client) return 0;
    if(!state.userMoodboards.elements) return 0
    return Object.keys(state.userMoodboards.elements).length;
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
    if (!process.client) return;
    const currentMoodboard = JSON.stringify(context.state.currentMoodboard);
    const encoded = encodeURIComponent(Base64.encode(currentMoodboard));
    const url = new URL(
      `/inspirations/share/${encoded}`,
      window.location.origin
    );
    return url.href;
  },

  addToMoodboards(context, moodboards) {
    const currentInspiration = context.state.currentInspiration;
    if(!currentInspiration) return false
    moodboards.forEach((moodboard) => {
      context.commit("ADD_TO_MOODBOARD", {
        moodboardId: moodboard,
        inspiration: currentInspiration,
      });
    })
  },

  renameMoodboard(context, moodboardName) {
    const currentMoodboard = context.state.currentMoodboard;
    context.commit("RENAME_INSPIRATION", {
      moodboardName: moodboardName,
      moodboard: currentMoodboard,
    });
  },

  setCurrentMoodboard(context, moodboard) {
    context.commit("SET_CURRENT_MOODBOARD", moodboard);
  },

  setCurrentInspiration(context, inspiration) {
    context.commit("SET_CURRENT_INSPIRATION", {
      id: inspiration.id,
      image: inspiration.image,
      title: inspiration.title,
    });
  },

  duplicateBoard(context) {
    const currentMoodboard = context.state.currentMoodboard;
    context.commit("NEW_MOODBOARD", {
      title: currentMoodboard.title + " (copy)",
      originalId: currentMoodboard.id,
      id: uuidv4(),
      inspirationItems: currentMoodboard.inspirationItems,
    });
  },

  removeInspirationFromCurrentBoard(context) {
    const currentInspiration = context.state.currentInspiration;
    const currentMoodboard = context.state.currentMoodboard;
    context.commit("DELETE_INSPIRATION", {
      inspiration: currentInspiration,
      moodboard: currentMoodboard,
    });
  },

  removeInspiration(context, {moodboards}) {
    const currentInspiration = context.state.currentInspiration;
    moodboards.forEach(moodboard => {
      context.commit("DELETE_INSPIRATION", {
        inspiration: currentInspiration,
        moodboard: {
          id: moodboard
        },
      });
    })
  },

  async setFeatured(context, name) {
    try {
      const featured = await this.$graphql.default.request(query);
      featured.moodboards.forEach((moodboard) =>
        context.commit("SET_FEATURED", moodboard)
      );
    } catch (error) {
      console.log("Featured moodboards error", error);
    }
  },
};
