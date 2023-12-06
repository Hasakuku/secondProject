const express = require('express');
const userController = require('../controllers/userController')
const { getUserReview } = require('../services/commonService')
const permission = require('../middlewares/permission')
const router = express.Router();

router.get('/review', permission('user'), getUserReview)

router.get('/', permission('user'), userController.getUser)
// router.get('/', (req, res) => {
//    const authHeader = req.headers.authorization;

//    if (authHeader) {
//       const token = authHeader.split(' ')[1];
//       // 토큰을 검증하고 사용자 데이터를 가져옵니다.
//       // 이 부분은 실제 사용자 데이터를 가져오는 로직에 따라 달라집니다.
//       if (token) {
//          res.json(token);
//       } else {
//          res.status(401).json({ error: 'Invalid token' });
//       }
//    } else {
//       res.status(401).json({ error: 'No token provided' });
//    }
// })
router.post('/favorites', permission('user'), userController.addFavorites)
router.delete('/favorites', permission('user'), userController.delFavorites)
router.post('/', userController.findUser)
router.put('/', permission('user'), userController.updateUser)


module.exports = router;

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 회원 정보 조회
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:  
 *               
 *             example:
 *               
 *
 *     responses:
 *       200:
 *         description: 회원 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId: {type: integer}
 *                 name: {type: string}
 *                 email: {type: string}
 *                 level: {type: string}
 *                 booking: {type: string}
 *                 favorites: [{type: string}]
 *               example:
 *                 {"userId": 1,
 *                 "name": "admin",
 *                 "email": "admin@test.com",
 *                 "level": "sliver",
 *                 "booking": ,
 *                 "review": ,
 *                 "favorites": [lodgings:]}
 */

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: 회원 정보 수정
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:  
 *               email: {type: string}
 *               password: {type: string}
 *               name: {type: string}
 *             example:
 *               {
 *                "email": "admin@test.com",
 *                "password": "Aa1234!",
 *                "name": "admin"
 *                }
 */


/**
 * 
 * /api/users/review:
 *   get:
 *     summary: 리뷰 조회
 *     requestBody:
 *       token: 
 *         type: string
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:
 *               types:
 *                 type: string
 *               user:
 *                 type: string
 *               lodging:
 *                 type: string
 *               attraction:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               {
 *                 "types": "lodging",
 *                 "user": "605c17c4b392053daaa3c9a6",
 *                 "lodging": "605c17c4b392053daaa3c9a7",
 *                 "content": "이 호텔은 정말 훌륭했습니다. 서비스도 좋고, 방도 깨끗했습니다. 다음에도 이용하고 싶습니다.",
 *                 "rating": 1,
 *                 "image": ["image1.jpg", "image2.jpg"]
 *                 }
 *
 *     responses:
 *       201:
 *         description: 리뷰 조회 성공
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    types:
 *                      type: string
 *                    user:
 *                      type: string
 *                    lodging:
 *                      type: string
 *                    attraction:
 *                      type: string
 *                    content:
 *                      type: string
 *                    rating:
 *                      type: string
 *                    image:
 *                      type: array
 *                      items:
 *                        type: string
 *                  example:
 *                    {
 *                      "types": "lodging",
 *                      "user": "605c17c4b392053daaa3c9a6",
 *                      "lodging": "605c17c4b392053daaa3c9a7",
 *                      "content": "이 호텔은 정말 훌륭했습니다. 서비스도 좋고, 방도 깨끗했습니다. 다음에도 이용하고 싶습니다.",
 *                      "rating": 1,
 *                      "image": ["image1.jpg", "image2.jpg"]
 *                      }
 */

/**
 * @swagger
 * /users/favorites:
 *   delete:
 *     summary: 즐겨찾기 삭제
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             example:
 *               {
 *                "attraction": "605c17c4b392053daaa3c9a6",
 *                "lodging": "655d93d91116b641aa22f75a"
 *               }
 *     responses:
 *       200:
 *         description: 즐겨찾기 제거 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 즐겨찾기에서 제거되었습니다.
 */
/**
 * @swagger
 * /users/favorites:
 *   post:
 *     summary: 즐겨찾기 추가
 *     tags: [Users]
 *     parameters:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             example:
 *               {
 *                "attraction": "605c17c4b392053daaa3c9a6",
 *                "lodging": "655d93d91116b641aa22f75a"
 *               }
 *     responses:
 *       201:
 *         description: 즐겨찾기 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 즐겨찾기에 추가되었습니다.
 */
