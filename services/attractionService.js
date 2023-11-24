const Attraction = require('../models/attractionModel')

const attractionService = {
    //* 추천 여행지
    async getTopAttractions(city) {
        // 특정 도시 &리뷰 수가 10개 이상
        const attractions = await Attraction.find({
            $or: [{ 'address.city': { $regex: city, $options: 'i' } }],
            'review.1': { $exists: true }
        }).populate('review');
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
    async getAttractionDetail(attractionID) {
        // 숙소 정보 조회
        const attraction = await Attraction.findOne({ attractionId: attractionID }).exec();
        if (!attraction) {
            throw new BadRequestError('숙소를 찾을 수 없습니다.');
        }
        console.log(attraction)
        //반환값
        const result = attraction
        return result;
    },
}
module.exports = attractionService;