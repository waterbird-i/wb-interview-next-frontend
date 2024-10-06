const { generateService } = require("@umijs/openapi");


generateService({
  // 请求库路径
  requestLibPath: "import request from '@/libs/request'",
  // 接口文档路径
  schemaPath: "http://localhost:8101/api/v2/api-docs",
  serversPath: "./src",
});
