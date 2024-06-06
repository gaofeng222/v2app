import Vue from "vue";

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([:-_]+(.))/g;

const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

const trim = function (string) {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFeFF]+$/, "");
};

const camelCase = function (name) {
  return name.replace(
    SPECIAL_CHARS_REGEXP,
    function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }
  );
};

const test = camelCase("flex_item_box");
console.log("🚀 ~ test:", test); //flexItemBox

export const on = (function () {
  // 判断是否是服务器环境
  if (!isServer && document.addEventListener) {
    // 如果是标准浏览器环境，则使用addEventListener
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

export const off = (function () {
  // 判断是否是服务器环境
  if (!isServer && document.removeEventListener) {
    // 如果是标准浏览器环境，则使用addEventListener
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    // 如果是ie环境，则使用detachEvent
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

export const once = function (el, event, fn) {
  // 事件处理函数
  const listener = function () {
    // 执行事件处理函数
    fn && fn.apply(this, arguments);
    // 移除事件
    off(el, event, listener);
  };
  // 绑定事件
  on(el, event, listener);
};

export function hasClass(el, cls) {
  //不存在元素或类名，直接返回false
  if (!el || !cls) return false;
  //判断类名是否包含空格，有则直接返回false
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");

  if (el.classList) {
    //使用classList
    return el.classList.contains(cls);
  } else {
    //兼容性写法
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

//
export function addClass(el, cls) {
  //不存在元素或类名，直接返回false
  if (!el || !cls) return;
  let curClass = el.className;
  const classes = cls?.split(" ");
  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      //不存在则添加
      !hasClass(el, clsName) && el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.setAttribute("class", curClass);
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return;
  let curClass = " " + el.classList + " ";
  let classes = cls?.split(" ");
  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.remove(" " + clsName + " ", "");
    }
  }

  if (!el.classList) {
    el.setAttribute("class", trim(curClass));
  }
}

export const getStyle =
  ieVersion < 9
    ? function (element, styleName) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === "float") {
          styleName = "styleFloat";
        }
        try {
          switch (styleName) {
            case "opacity":
              try {
                return element.filters.item("alpha").opacity / 100;
              } catch (e) {
                return 1.0;
              }
            default:
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null;
          }
        } catch (e) {
          return element.style[styleName];
        }
      }
    : function (element, styleName) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === "float") {
          styleName = "cssFloat";
        }
        try {
          var computed = document.defaultView.getComputedStyle(element, "");
          return element.style[styleName] || computed
            ? computed[styleName]
            : null;
        } catch (e) {
          return element.style[styleName];
        }
      };

/* istanbul ignore next */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === "object") {
    for (var prop in styleName) {
      if (Object.hasOwnProperty.apply(styleName, prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === "opacity" && ieVersion < 9) {
      element.style.filter = isNaN(value)
        ? ""
        : "alpha(opacity=" + value * 100 + ")";
    } else {
      element.style[styleName] = value;
    }
  }
}

export const isScroll = (el, vertical) => {
  if (isServer) return;

  const determinedDirection = vertical !== null && vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, "overflow-y")
      : getStyle(el, "overflow-x")
    : getStyle(el, "overflow");

  return overflow.match(/(scroll|auto|overlay)/);
};

export const getScrollContainer = (el, vertical) => {
  if (isServer) return;

  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

export const isInContainer = (el, container) => {
  if (isServer || !el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  );
};
