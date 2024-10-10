import { Link } from "react-router-dom";
import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img, subtitle }) => {
  return (
    <div className="my-12">
      {title && <Cover title={title} subtitle={subtitle} img={img}></Cover>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <div className="flex justify-center ">
          <button className="btn btn-outline border-0 border-t-4 border-r-4 ">
            Order your favourite food
          </button>
        </div>
      </Link>
    </div>
  );
};

export default MenuCategory;
