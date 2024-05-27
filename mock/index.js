import Mock from "mockjs";
import url from "url";
import { Random, toJSONSchema } from "mockjs"; // 引入random对象,随机生成数据的对象，（与占位符@一样）
import { regUrl } from "@/utils";
const okState = {
  code: 0,
  msg: "请求成功",
};

const errorState = {
  code: 1,
  msg: "请求失败",
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
    permissionRoutes: [
      {
        path: "/order",
        component: "Layout",
        name: "order-manage",
        redirect: "/order/list",
        alwaysShow: true,
        meta: {
          title: "订单管理",
          icon: "el-icon-odometer",
        },

        children: [
          {
            path: "list",
            component: "order-manage/order-list/index.vue",
            id: 2,
            name: "order-list",
            meta: {
              title: "订单列表",
              icon: "el-icon-set-up",
            },
            children: [],
          },
          {
            path: "product",
            component: "order-manage/product-manage/index.vue",
            name: "product-manage",
            meta: {
              title: "生产管理",
              icon: "icon-service",
            },
            id: 1,
            alwaysShow: true,
            children: [
              // {
              //   path: "list",
              //   hidden: true,
              //   meta: {
              //     title: "生产列表",
              //     icon: "icon-nav",
              //   },
              //   component: "/views/order-manage/product-manage/production-list",
              //   name: "product-list",
              // },
              {
                path: "review",
                meta: {
                  title: "审核管理",
                  icon: "el-icon-wallet",
                },
                component: "order-manage/product-manage/review-manage",
                name: "review-manage",
                children: [],
              },
            ],
          },

          {
            id: 2,
            path: "returnGoods",
            component: "order-manage/product-manage/return-goods",
            name: "return-goods",
            meta: {
              title: "退货管理",
              icon: "el-icon-collection",
            },
            children: [],
          },
        ],
      },
      {
        path: "/vue2",
        component: "Layout",
        meta: {
          title: "vue2特性测试",
          icon: "el-icon-eleme",
        },
        children: [
          {
            path: "keep-alive",
            component: "vue2-functional/keep-alive",
            name: "keep-alive-form",
            meta: {
              title: "页面缓存",
              icon: "el-icon-s-goods",
            },
            children: [],
          },
        ],
      },
      {
        path: "/Gui",
        component: "Layout",
        meta: {
          title: "Gui组件库的测试",
          icon: "el-icon-question",
        },
        children: [
          {
            path: "alert",
            component: "GUI-components/Alert",
            name: "alert",
            meta: {
              title: "alert组件",
              icon: "el-icon-s-goods",
            },
            children: [],
          },
        ],
      },
    ],
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor",
    permissionRoutes: [],
  },
};

Mock.setup({
  timeout: 300,
});

const produceData = function (opt) {
  console.log("opt", opt);
  let articles = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30),
      thumbnail_pic_s: Random.dataImage("100x50", "zjcopy.com"),
      date: Random.date() + "" + Random.time(),
      email: Random.email(),
      name: Random.cname(),
    };
    articles.push(newArticleObject);
  }
  return {
    ...okState,
    data: articles,
  };
};

const loginData = function (opts) {
  const body = JSON.parse(opts.body);
  const { username } = body;
  return {
    ...okState,
    data: {
      token: username + "-token",
    },
  };
};

const getInfoData = (opts) => {
  console.log("🚀 ~ getInfo ~ opts:", opts);
  //解析url中的参数
  const data = url.parse(opts.url, true).query;
  console.log("🚀 ~ getInfoData ~ data:", data);
  if (!users[data.data]) {
    return errorState;
  }
  return {
    ...okState,
    data: users[data.data],
  };
};
Mock.mock("/login", loginData);

Mock.mock("/getNewsList", produceData);

/**
 * 参考地址:https://www.cnblogs.com/jiaoshou/p/14162862.html
 */
Mock.mock(regUrl("/getInfo"), getInfoData);
