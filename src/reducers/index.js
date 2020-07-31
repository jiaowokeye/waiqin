// 请勿修改此文件
const reducersCache = {};

function importAll(r) {
  r.keys().forEach((key) => {
    const name = key.replace(/.\/|.js$/g, '');
    reducersCache[name] = r(key).default;
  });
}

importAll(require.context('./', true, /^((?!index).)+\.js$/));

export default reducersCache;
