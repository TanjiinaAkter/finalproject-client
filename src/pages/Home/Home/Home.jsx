import { Helmet } from "react-helmet-async";
import AnotherSection from "../AnotherSection/AnotherSection";
import Banner from "../Banner/Banner";
import CallUs from "../CallUs/CallUs";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommendents from "../Recommendents/Recommendents";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home </title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <AnotherSection></AnotherSection>
      <PopularMenu></PopularMenu>
      <CallUs></CallUs>
      <Recommendents></Recommendents>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
