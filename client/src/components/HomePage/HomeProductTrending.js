import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProductAction } from "../../redux/slices/products/productsSlice";
import baseURL from "../../utils/baseURL";

const HomeProductTrending = () => {
  const dispatch = useDispatch();
  const productURL = `${baseURL}/products`;

  useEffect(() => {
    dispatch(fetchAllProductAction({ url: productURL }));
  }, [dispatch]);
  // URLs:
  const {
    products: { products },
    loading,
    error,
  } = useSelector((state) => state?.products);
  // console.log(products);
  return (
    <>
      <section aria-labelledby="trending-heading">
        <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
          <div className="md:flex md:items-center md:justify-between">
            <h2
              id="favorites-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Trending Products
            </h2>
            <a
              href="#"
              className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
            >
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products?.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="group relative"
              >
                <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={product?.image[0]}
                    alt={product?.image[0]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  <span className="absolute inset-0" />
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  ${product.price}.00
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-sm md:hidden">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProductTrending;
