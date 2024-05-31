function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  debugger;
  let keyArr = path.split(".");
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error("please transfer a valid prop path to form item!");
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
}
/**
 * demo1
 */
// const ret = getPropByPath(
//   {
//     name: "张三",
//     items: [{ value: 0 }, { value: 1 }],
//   },
//   "items.0.value"
// );
// console.log(ret);
/**
 * {
    "o": {
        "value": 0
    },
    "k": "value",
    "v": 0
}
 */
/**
 * demo2
 */

const ret1 = getPropByPath(
  [
    { message: "年龄不能为空", required: true },
    { type: "number", message: "年龄必须为数字值" },
  ],
  "1.message"
);
console.log(ret1);
