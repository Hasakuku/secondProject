const Attraction = require('../models/attraction/attraction')
const AttractionReview = require('../models/attraction/attractionReview')
const { InternalServerError, BadRequestError } = require('../utils/customError')
const attractionService = {
    //* 추천 여행지
    async getTopAttractions(city) {
        // 특정 도시 &리뷰 수가 10개 이상
        const attractions = await Attraction.find({
            $or: [{ 'address.city': { $regex: city, $options: 'i' } }],
            'review.1': { $exists: true }
        }).populate('review');
        if (!attractions) throw new BadRequestError('잘못된 요청입니다.')
        // 각 관광지의 평균 평점
        attractions.forEach(attraction => {
            let totalRating = 0;
            attraction.review.forEach(review => {
                totalRating += review.rating;
            });
            attraction.avgRating = totalRating / attraction.review.length;
        });
        // 상위 3개의 여행지
        const topAttractions = attractions
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(0, 3)
            .map(attraction => ({
                attractionId: attraction.attractionId,
                name: attraction.name,
                mainImage: attraction.mainImage,
                reviewCount: attraction.review.length,
                country: attraction.country,
                address: attraction.address,
                avgRating: attraction.avgRating,
            }));
        return topAttractions;
    },
    //* 관광지 상세 조회
    async getAttractionDetail(id) {
        const attraction = await Attraction.findOne({ attractionId: id }).populate('review').exec();
        if (!attraction) {
            throw new BadRequestError('관광지를 찾을 수 없습니다.');
        }
        //반환값
        let totalRating = 0;
        attraction.review.forEach(review => {
            totalRating += review.rating;
        });
        attraction.avgRating = (totalRating / attraction.review.length).toFixed(2);

        const result = attraction;
        return result;
    },
//     // 관광지 리뷰 생성
//     async createReview(data) {
//         const { user, content, rating, image } = data
//         const results = new AttractionReview({
//             user,
//             content,
//             rating,
//             image,
//         })
//         const result = await results.save()
//         return {result}
//     }
}
module.exports = attractionService;

// attractionId: attraction.attractionId,
//             lodging:attraction.lodging,
//             types:attraction.types,
//             name:attraction.name,
//             location: attraction.location,
//             address: attraction.address,
//             map: attraction.map,
//             phoneNumber: attraction.map,
//             description: attraction.description,
//             image: attraction.image,
//             mainImage: attraction.mainImage,
//             ticket: attraction.ticket,
//             operatingTime: attraction.operatingTime,
//             recommendTourTime: attraction.recommendTourTime,
//             avgRating: (attraction.avgRating).toFixed(2),
//             review: attraction.review[0]