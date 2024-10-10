import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./Featured.css";
import img from "../../../assets/home/featured.jpg";
const Featured = () => {
  return (
    <section className="featured-img my-12 py-6 ">
      <div className="relative z-10 text-white">
        <SectionTitle
          heading="---Check it out---"
          subheading="FROM OUR MENU"></SectionTitle>
        <div className="flex justify-center items-center flex-col md:flex-row m-4 md:m-0">
          <div className="flex md:flex-1 justify-center md:justify-end items-center ">
            <img src={img} className="w-full md:w-[400px]" alt="" />
          </div>
          <div className="text-white flex flex-col space-y-4 flex-1">
            <div className="w-[90%] md:w-[60%] mx-auto mt-6">
              <h3>March 20, 2023</h3>
              <h3>WHERE CAN I GET SOME?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                voluptate facere, deserunt dolores maiores quod nobis quas
                quasi. Eaque repellat recusandae ad laudantium tempore
                consequatur consequuntur omnis ullam maxime tenetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
