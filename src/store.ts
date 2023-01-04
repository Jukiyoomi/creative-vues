import { ActionContext, createStore } from "vuex";
import { User } from "firebase/auth";
import { auth } from "@/firebase";
import { Post } from "@/interfaces";

export interface State {
  user: User | null;
  posts: Post[];
}

// Create a new store instance.
export const store = createStore<State>({
  state() {
    return {
      user: auth.currentUser,
      posts: [],
    };
  },
  mutations: {
    setUser(state: State, data: User) {
      state.user = data;
    },
    setPosts(state: State, data: Post[]) {
      state.posts = data;
    },
  },
  actions: {
    setUser(context: ActionContext<State, State>, data: User) {
      context.commit("setUser", data);
    },
    getPosts(context: ActionContext<State, State>, data: Post[]) {
      context.commit("setPosts", data);
    },
    deletePost(context: ActionContext<State, State>, id: string) {
      const postsWithoutDeleted = store.state.posts.filter(
        (post) => post.user !== id
      );
      context.commit("setPosts", postsWithoutDeleted);
    },
    updatePost(
      context: ActionContext<State, State>,
      data: { id: string; text: string }
    ) {
      const updatedPosts = store.state.posts.map((post) => {
        if (post.id === data.id) {
          post.text = data.text;
        }
        return post;
      });
      context.commit("setPosts", updatedPosts);
    },
  },
});
