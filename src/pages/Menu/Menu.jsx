import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const offered = menu.filter((item) => item.category === "offered");
  // console.log(offered)
  return (
    <div>
      {/* helmet hocche project er title name ar sathe page er name ...route name ae ki */}
      <Helmet>
        <title>Bistro Boss | Menu </title>
      </Helmet>
      <Cover
        img={menuImg}
        title="our menu"
        subtitle="Would you like to try a dish?"></Cover>
      <SectionTitle
        heading="---Dont miss"
        subheading="Todays offer"></SectionTitle>
      {/*======= offered part ======== */}
      <MenuCategory items={offered}></MenuCategory>
      {/*======= Desserts part // ekhane cover component theke title nicchi ========= */}
      <MenuCategory
        items={desserts}
        title="dessert"
        img={dessertImg}
        subtitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."></MenuCategory>

      <MenuCategory
        items={pizza}
        title="pizza"
        img={pizzaImg}
        subtitle={
          "A pizza is a round, flatbread dish typically topped with tomato sauce, cheese, and a variety of toppings, then baked to perfection. The crust can vary from thin and crispy to thick and soft, depending on preference."
        }></MenuCategory>
      <MenuCategory
        items={soup}
        title={"soup"}
        img={soupImg}
        subtitle={
          "Soup is a warm, liquid-based dish made by simmering a variety of ingredients in water, broth, or stock."
        }></MenuCategory>
      <MenuCategory
        items={salad}
        title={"salad"}
        img={saladImg}
        subtitle={
          "Salad is a dish composed of a variety of fresh ingredients, typically featuring raw or cooked vegetables, fruits, proteins, and dressings. The base is often leafy greens like lettuce, spinach, or arugula, with toppings such as tomatoes, "
        }></MenuCategory>
    </div>
  );
};

export default Menu;
