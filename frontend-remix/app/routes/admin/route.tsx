import { useState, useEffect } from 'react';
import { CommentsCarousel } from '~/components/admin/CommentsCarousel';
import { SectionTechnologies } from '~/components/admin/SectionTechnologies';
import FeedbackForm from '~/components/FeedbackForm';

export default function () {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger the animation on mount
    setIsAnimating(true);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center my-10 mx-20">
      <div className='flex flex-col justify-center items-center my-10'>
        <h3 className='text-3xl my-5'> Skills {" "} 🛠️👨🏻‍💻</h3>
        <SectionTechnologies />
      </div>
      <div className='flex flex-col justify-center items-center my-10'>
        <h3 className='text-3xl my-5'> Feedback {" "} 💬</h3>
        <CommentsCarousel />
      </div>
    </div>
  );
}
