import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
const Testimonials = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);
  return (
    <section className="my-12">
      <SectionTitle
        heading="---What Our Clients Say---"
        subheading="TESTIMONIALS"></SectionTitle>
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {review.map((rev) => (
            <SwiperSlide key={rev._id}>
              <div className="px-24 my-12 text-center flex flex-col items-center justify-center">
                <div>
                  <Rating
                    style={{ maxWidth: 180, marginBottom:'13px' }}
                    value={rev.rating}
                 
                  />
                </div>
                <p>{rev.details}</p>
                <h3 className="my-5 text-yellow-500 text-2xl font-semibold">
                  {rev.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
