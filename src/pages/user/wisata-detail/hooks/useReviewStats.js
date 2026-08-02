export const useReviewStats = (reviews) => {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) /
        totalReviews
      : 0;

  const ratingCount = [1, 2, 3, 4, 5].map(
    (rating) => reviews.filter((review) => review.rating === rating).length
  );

  const ratingPercentage = ratingCount.map((count) =>
    totalReviews > 0 ? (count / totalReviews) * 100 : 0
  );

  return { averageRating, totalReviews, ratingCount, ratingPercentage };
};
