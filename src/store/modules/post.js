export default {
  actions: {
    async fetchPosts(ctx, limit = 3) {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/posts?_limit=" + limit
      );
      const posts = await res.json();

      ctx.dispatch("logPosts", ctx.getters.allPosts);

      ctx.commit("updatePosts", posts);
    },
    logPosts(posts) {
      console.log(posts);
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts;
    },
    createPost(state, newPost) {
      state.posts.unshift(newPost);
    }
  },
  state: {
    posts: []
  },
  getters: {
    validPosts(state, getters) {
      return getters.allPosts.filter(post => {
        return post.title && post.body;
      });
    },
    allPosts(state) {
      return state.posts;
    },
    postsCount(state, getters) {
      return getters.allPosts.length;
    }
  }
};
