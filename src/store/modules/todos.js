import axios from 'axios';

const state = {
  todos: [

  ]
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setTodos', res.data);
  },
  async addTodo({ commit }, title) {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false });
    commit('addTodo', res.data);
  },
  async filterTodos({ commit }, e) {
    const limit = +e.target.options[e.target.options.selectedIndex].innerText;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    commit('setTodos', res.data);
  },
  async updateTodos({ commit }, updateTodo) {
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo);
    commit('updateTodos', data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit('deleteTodo', id);
  },
};

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  addTodo: (state, newTodo) => state.todos.unshift(newTodo),
  updateTodos: (state, updateTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
    if (index !== -1) {
      console.log({ index })
      state.todos.splice(index, 1, updateTodo)
    }
  },
  deleteTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id)
};

export default {
  state,
  getters,
  actions,
  mutations
};
