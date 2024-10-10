// import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  // ===========  custom hook theke menu niye data nicchi  ============//
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const populars = data.filter(() => item.category === "popular");

  //       setMenu(popularItems);
  //     });
  // }, []);
  return (
    <section className="mb-12">
      <SectionTitle
        heading="---Check it out---"
        subheading="FROM OUR MENU"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center items-center my-6">
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          View full menu
        </button>
      </div>
    </section>
  );
};

export default PopularMenu;
