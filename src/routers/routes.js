import NotFound from "../page/notFound";
import baseRoutes from "./base.js";
import signRoutes from "./sign.js";
import feedRoutes from "./feed.js";
import newsRoutes from "./news.js";
import rankRoutes from "./rank.js";
import postRoutes from "./post.js";
import groupRoutes from "./group.js";
import messageRoutes from "./message.js";
import questionRoutes from "./question.js";
import profileRoutes from "./profile.js";
import walletRoutes from "./wallet.js";
import currencyRoutes from "./currency.js";

const router = [
  /* 基础入口 */
  { path: "/", redirect: "/signin" },
  ...baseRoutes,

  ...signRoutes,
  ...feedRoutes,
  ...postRoutes,
  ...newsRoutes,
  ...rankRoutes,
  ...groupRoutes,
  ...messageRoutes,
  ...questionRoutes,
  ...profileRoutes,
  ...walletRoutes,
  ...currencyRoutes,

  // {
  //   path: "/post/fatie",
  //   name: "postGroupFeed",
  //   component: postGroupFeed,
  //   meta: {
  //     keepAlive: true,
  //     title: "发布帖子",
  //     requiresAuth: true
  //   }
  // },
  { path: "*", component: NotFound } /* 404 页面 */
];

export default router;
