let configs = {};
/**
 * 前端基本配置文件，可配置对应环境的接口地址
 */
if (process.env.APP_ENV === 'production') {
  configs = {
    prefix: {
      mcloud: 'https://xx.xx.com'
    }
  };
} else {
  // 本地开发
  configs = {
    prefix: {
      mcloud: 'https://xx.xx.com'
    }
  };
}

const { prefix } = configs;

module.exports = {
  urls: {
    // 接口地址配置
    getData: `${prefix.mcloud}/getData`
  }
};
