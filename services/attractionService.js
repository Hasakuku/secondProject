const Attraction = require('../models/attractionModel')

const attractionService = {
    //* 추천 여행지
    async getTopAttractions(city) {
        // 특정 도시 &리뷰 수가 10개 이상
        const attractions = await Attraction.find({
            'address.city': city,
            'review.9': { $exists: true }
        });
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
                avgRating: attraction.avgRating,
            }));
        return topAttractions;
    }
}
module.exports = attractionService;