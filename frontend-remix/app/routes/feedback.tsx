import { useState, useEffect } from 'react';
import { CommentsCarousel } from '~/components/CommentsCarousel';
import FeedbackForm from '~/components/FeedbackForm';

export default function () {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger the animation on mount
    setIsAnimating(true);
  }, []);

  return (
    <div
      className={`flex flex-col lg:flex-row justify-around items-center my-10 mx-20 ${
        isAnimating ? 'animate-in fade-in-100' : ''
      }`}
    >
      <CommentsCarousel />
      <FeedbackForm />
    </div>
  );
}
