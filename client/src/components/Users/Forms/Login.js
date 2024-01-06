import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice";
import Modal from "../../../utils/modal";
import LoadingComponent from "../../LoadingComp/LoadingComponent";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "test@test.com",
    password: "11111",
  });
  //---- Destructuring ----
  const { email, password } = formData;
  // ---- onchange handler ----

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(email, password);
    dispatch(loginUserAction({ email, password }));
  };

  const { loading, error, userInfo } = useSelector((state) => {
    return state?.users?.userAuth;
  });

  //select store data
  // useEffect(() => {
  //   if (userInfo) {
  //     if (userInfo?.userFound?.isAdmin) {
  //       window.location.href = "/admin";
  //       // alert("test");
  //     } else {
  //       window.location.href = "/customer-profile";
  //     }
  //   }
  // }, [userInfo]);

  return (
    <>
      <section className="py-20 bg-gray-100 overflow-x-hidden">
        <div className="relative container px-4 mx-auto">
          <div className="absolute inset-0 bg-blue-200 my-24 -ml-4" />
          <div className="relative flex flex-wrap bg-white">
            <div className="w-full md:w-4/6 px-4">
              <div className="lg:max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
                <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                  Login to your account
                </h3>
                <p className="mb-5 font-semibold font-heading">
                  Happy to see you again
                </p>

                <form
                  className="flex flex-wrap -mx-4"
                  onSubmit={onSubmitHandler}
                >
                  <div className="w-full md:w-1/2 px-4 mb-8 md:mb-5">
                    <label>
                      <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                        Your Email
                      </h4>
                      <input
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="email"
                      />
                    </label>
                  </div>
                  <div className="w-full md:w-1/2 px-4 mb-5">
                    <label>
                      <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                        Password
                      </h4>
                      <input
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="password"
                      />
                    </label>
                  </div>
                  {error && (
                    <span className="text-red-600 font-normal w-full md:w-1/2 px-4 mb-5">
                      {error?.message.replace(
                        "Internal Server Error: Error:",
                        ""
                      )}
                    </span>
                  )}
                  <div className="w-full px-4">
                    {loading ? (
                      <LoadingComponent />
                    ) : (
                      <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-12 rounded-md uppercase">
                        Login
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div
              className="w-full md:w-2/6 h-128 md:h-auto flex items-center lg:items-end px-4 pb-20 bg-cover bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://cdn.pixabay.com/photo/2017/03/29/04/47/high-heels-2184095_1280.jpg")',
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
