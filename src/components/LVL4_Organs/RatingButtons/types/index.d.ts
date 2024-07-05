export type RatingButtonsProps = {
  totalRatings: number;
  onRatingChange?: (rating: number, id?: string) => void;
  rated?: number;
  id?: string;
  loading?: boolean;
};
