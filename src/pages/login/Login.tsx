import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const { loginUser, googleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    loginUser(data.email, data.password);
    navigate("/");
  };

  const handleGoogleLogin = () => {
    googleLogin().then(async (data) => {
      toast.success("Login Successfully!");
      navigate("/");
      if (data.user) {
        const user = data.user;
        const userData = {
          email: user.email,
          role: "buyer",
          status: "approved",
          wishlist: [],
        };

        const res = await axios.post(
          `http://localhost:3000/user/${user.email}`,
          {
            userData,
          }
        );

        if (res.data.insertedId) {
          toast.success("User Created Successfully!");
          navigate("/");
        }
      }
    });

    // navigate("/");
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm">email is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p>
              New this site please{" "}
              <NavLink to="/register" className="underline text-blue-600">
                Register
              </NavLink>
            </p>
          </form>
          <div className="divider w-10/12 mx-auto">OR</div>
          <div className="text-center mb-8">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-secondary w-fit"
            >
              <span>
                <img
                  width="26"
                  height="26"
                  src="https://img.icons8.com/fluency/48/google-logo.png"
                  alt="google-logo"
                />
              </span>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
