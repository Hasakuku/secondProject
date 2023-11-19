const Lodging = require('../models/lodgingModel')

const lodgingServices = {
   //인기 호텔 및 숙소
   async getPopularHotelList() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const lodgings = await Lodging.aggregate([
         {
            $lookup: {
               from: 'review',
               localField: '_id',
               foreignField: 'lodging',
               as: 'reviews'
            }
         },
         //
         {
            $match: {
               'reviews.9': { $exists: true }, // 리뷰가 10개 이상인 숙소
               'rooms': {
                  $elemMatch: {
                     'status': true, // 공실이 있는 객실
                     'availableDates': {
                        $gte: today,
                        $lt: tomorrow
                     }
                  }
               }
            }
         },
         //
         {
            $addFields: {
               averageRating: { $avg: '$reviews.rating' }, // 평균 평점 계산
               reviewCount: { $size: '$reviews' }, // 리뷰 개수 계산
               minPrice: { $min: '$rooms.price' } // 최저가 계산
            }
         },
         //
         {
            $sort: { averageRating: -1 } // 평균 평점으로 정렬
         },
         //
         {
            $limit: 4 // 상위 4개만 선택
         },
         //
         {
            $project: { // id, 이미지, 평균평점, 리뷰숫자, 최저가 반환
               _id: 0,
               image: 1,
               averageRating: 1,
               reviewCount: 1,
               minPrice: 1
            }
         }
      ]);

      return lodgings;
   }

}
module.exports = lodgingServices