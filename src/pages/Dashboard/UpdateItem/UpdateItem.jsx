import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateItem = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  console.log(image_hosting_key, image_hosting_api);

  const { name, category, price, recipe, _id } = useLoaderData();

  //console.log(item);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    // img props ta ber kortesi karon ei img ta amra upload kortesi tai img ta diye dite hobe api
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      //
      const menuitem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuitem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionTitle
        heading="Update Item"
        subheading="Refresh or update info"></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME FIELD */}
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              type="text"
              defaultValue={name}
              {...register("name", { required: true })}
              required
              placeholder="recipe name"
              className="input input-bordered w-full "
            />
          </label>
          {/*  category and price field*/}
          <div className="form-control flex gap-4 md:flex-row w-full my-6">
            {/* CATEGORY FIELD */}
            <div className="w-full md:w-[50%]">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Category*</span>
                </div>
              </label>
              <select
                defaultValue={category}
                className="select select-bordered w-full "
                {...register("category", { required: true })}>
                <option disabled value="default">
                  select a category
                </option>
                <option value="Salad">Salad</option>
                <option value="Pizza">Pizza</option>
                <option value="Soup">Soup</option>
                <option value="Dessert">Desserts</option>
                <option value="drinks">drinks</option>
              </select>
            </div>
            {/* price FIELD */}
            <div className="w-full  md:w-[50%]">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Price*</span>
                </div>
              </label>
              <input
                type="number"
                defaultValue={price}
                {...register("price", { required: true })}
                placeholder="price"
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/*  recipe details field*/}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe details*</span>
            </label>
            <textarea
              defaultValue={recipe}
              {...register("recipe")}
              placeholder="Recipe details"
              className="textarea textarea-bordered textarea-lg w-full h-52"></textarea>
          </div>
          {/*  file input field*/}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <button className="btn">
            Update menu Item
            <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
