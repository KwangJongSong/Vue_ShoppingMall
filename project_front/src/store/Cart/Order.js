import { getOrderList, updateOrderList, deleteOrderList } from '@/api/Cart';
const state = {
  order: [],
  total: 0,
};

const mutations = {
  getOrderList(state, data) {
    state.order = data.data.result;
    state.total = data.data.result1[0].TOTAL_COUNT;
  },
};

const actions = {
  async getOrderList(context, data) {
    try {
      const response = await getOrderList(data);
      context.commit('getOrderList', response);
    } catch (error) {
      alert(error);
    }
  },
  async updateOrderList(context, data) {
    try {
      await updateOrderList(data);
    } catch (error) {
      alert(error);
    }
  },
  async deleteOrderList(context, data) {
    try {
      await deleteOrderList(data);
    } catch (error) {
      alert(error);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
