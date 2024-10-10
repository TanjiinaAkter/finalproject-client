// import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import ItemCategory from "../../shared/ItemCategory/ItemCategory";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";

const Recommendents = () => {
  const [menu] = useMenu();

  const saladToShow = menu.filter((item) => item.category === "salad");
  // console.log(saladToShow);

  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())

  //     .then((data) => {
  //       const showSalad = data.filter((item) => item.category === "salad");
  //       setSalad(showSalad);
  //     });
  // }, []);
  return (
    <section>
      <SectionTitle
        heading={"---Should Try---"}
        subheading={"CHEF RECOMMENDS"}></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12 ">
        {saladToShow.slice(0, 3).map((item) => (
          <FoodCard key={item._id} item={item}></FoodCard>
        ))}
      </div>
    </section>
  );
};

export default Recommendents;
