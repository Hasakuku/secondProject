const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
   swaggerDefinition: {
      openapi: "3.0.0", //사용중인 오픈API 버전
      info: { // API에 필요한 정보
         title: 'Test API', // API 제목
         version: '1.0.0', // API 버전
         description: 'Test API with express', // API 상세
      },
      servers: [
         {
            url: "http://localhost:3000", // 요청 URL
         },
      ],
      //   host: 'localhost:3300',
      //   basePath: '/'
      //    //schemes: (Optional) 가능한 통신 방식 ex) ["http"], ["https"], ["http", "https"]
      //    //defomotopms: (Optional) DB 모델 정의
   },
   apis: ['./routes/*.js', './models/*.js', './models/TP/*.js',] // '../swagger/*', '../swagger/*.yaml'
};

const specs = swaggerJsdoc(options);

module.exports = {
   swaggerUi,
   specs
};

