const MenuItem = ({ item }) => {
  const { image, price, recipe, name } = item;
  return (
    // ============= "from our menu" section theke home page er ============ //
    <div className="flex space-x-4">
      <img
        style={{ borderRadius: "0 220px 220px 220px" }}
        className="w-[120px]"
        src={image}
        alt=""
      />
      <div>
        <h3 className="uppercase">{name}-------------</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-500">{price}</p>
    </div>
  );
};

export default MenuItem;
