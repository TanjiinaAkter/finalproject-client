import Cover from "../shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import coverImg from "../../assets/shop/banner2.jpg";
import { useState } from "react";
import useMenu from "../../hooks/useMenu";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
  // eita amra btn e click kore jei info pete chai oita capture kore order compo te useparams diye pabo..mane amra route ta ekhane anlam///router e :category likhsilam tai oitar value pete category k distructure kore useparam diye pelam
  // hit kortesi btn e ei route e dynamic vabe seta ber korlam useparams diye
  const { category } = useParams();
  console.log(category);
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const initialcategory = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialcategory);
  const [menu] = useMenu();
  console.log(menu);
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const desserts = menu.filter((item) => item.category === "dessert");
  const drinks = menu.filter((item) => item.category === "drinks");
  //   console.log(desserts, salad, soup, drinks, pizza);
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order food </title>
      </Helmet>
      <Cover
        img={coverImg}
        title={` order food from :${category}`}
        subtitle={"Would you like to try a dish?"}></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          {/* proti ta tab er info te ekekta salad, pizza emn kore specific item dekhabo tai amra arekta component er moddhe map use korbo        */}
          <OrderTab items={salad}></OrderTab>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {salad.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div> */}
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={desserts}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
