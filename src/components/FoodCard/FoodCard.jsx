const FoodCard = ({ item }) => {
  const { image, price, recipe, name } = item;
  console.log(item);
  return (
    <div className="card m-4 md:m-0 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute bg-slate-900 right-0 mr-4 px-4 text-white mt-4">${price}</p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
