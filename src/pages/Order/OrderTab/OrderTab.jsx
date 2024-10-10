import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  // ekhane amra each tab er items repeat na korar jonno component kor disi jeno ekbare use kora jay component niye
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {items.map((item) => (
        <FoodCard key={item._id} item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
