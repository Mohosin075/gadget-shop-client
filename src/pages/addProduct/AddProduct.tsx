import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function AddProduct() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      sellerEmail: user?.email,
    };

    console.log(productData);
    try {
      const res = await axios.post(
        "http://localhost:3000/add-product",
        productData
      );

      if (res?.data?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-center my-10">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between w-full gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title?.type == "required" && (
              <p className="text-red-500 text-sm">title is required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Brand</span>
            </label>
            <input
              type="text"
              placeholder="brand"
              className="input input-bordered"
              {...register("brand", { required: true })}
            />
            {errors.brand?.type === "required" && (
              <p className="text-red-500 text-sm">brand is required</p>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
            {errors.price?.type === "required" && (
              <p className="text-red-500 text-sm">price is required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">category</span>
            </label>
            <input
              type="text"
              placeholder="category"
              className="input input-bordered"
              {...register("category", { required: true })}
            />
            {errors.category?.type === "required" && (
              <p className="text-red-500 text-sm">category is required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              type="number"
              placeholder="stock"
              className="input input-bordered"
              {...register("stock", { required: true })}
            />
            {errors.stock?.type === "required" && (
              <p className="text-red-500 text-sm">stock is required</p>
            )}
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            placeholder="image URL"
            className="input input-bordered"
            {...register("imageURL", { required: true })}
          />
          {errors.imageURL?.type === "required" && (
            <p className="text-red-500 text-sm">imageURL is required</p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="description">
            <span className="label-text">description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-primary"
            placeholder="Bio"
          ></textarea>
          {errors.description?.type === "required" && (
            <p className="text-red-500 text-sm">description is required</p>
          )}
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
