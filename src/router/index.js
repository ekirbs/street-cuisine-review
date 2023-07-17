import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Home,
  Feed,
  Posts,
  SinglePost,
  EditPost,
  Profile,
  Register,
  SignIn,
  Test,
  Vendors,
  SingleVendor
} from "../views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory('/'),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/feed",
      name: "feed",
      component: Feed,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/edit-post/:postId",
      name: "editPost",
      component: EditPost,
      meta: {
        requiresAuth: true,
      },
      props: true
    },
    {
      path: "/post/:postId",
      name: "singlePost",
      component: SinglePost,
      meta: {
        requiresAuth: true,
      },
      props: true,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true,
      },
      props: true,
    },
    {
      path: "/test",
      name: "test",
      component: Test,
      meta: {
        requiresAuth: true,
      },
      props: true,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn,
    },
    {
      path: "/vendors",
      name: "vendors",
      component: Vendors,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/vendor/:identifier",
      name: "single-vendor",
      component: SingleVendor,
      meta: {
        requiresAuth: true,
      },
      props: true
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you don't have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
