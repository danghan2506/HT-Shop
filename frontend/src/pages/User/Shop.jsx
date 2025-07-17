import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useGetFilteredProductsQuery } from '../../redux/api/product-api-slice'
import { useGetAllCategoriesQuery } from '../../redux/api/category-api-slice'
import { useEffect } from 'react'
import { useState } from 'react'
import SmallProduct from '../../components/small-product'
import { setCategories, setChecked, setProducts, setRadio } from '../../redux/features/shop/shop-slice'
import Loading from '../../components/loader'
function Shop() {
  const dispatch = useDispatch()
  const {categories, products, checked, radio} = useSelector((state) => state.shop)
  const categoriesQuery = useGetAllCategoriesQuery()
  const [priceRange, setPriceRange] = useState()
  const { data: filteredData, isLoading: isProductLoading } = useGetFilteredProductsQuery({ checked, radio });
  const uniqueBrands = [
    ...new Set(filteredData?.map((p) => p.brand).filter(Boolean))
  ];
  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };
    const handleBrandClick = (brand) => {
    const productsByBrand = filteredData?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };
  useEffect(() => {
    if (categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);
  useEffect(() => {
    if (filteredData) {
      let filtered = filteredData;

      // Optional: Filter theo input giá
      if (priceRange) {
        filtered = filtered.filter((product) =>
          product.price.toString().includes(priceRange) ||
          product.price === parseInt(priceRange, 10)
        );
      }

      dispatch(setProducts(filtered));
    }
  }, [filteredData, priceRange, dispatch]);
  return (
     <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {categories?.listCategory?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-enter mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filer by Price
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceRange}
                // onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loading />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <SmallProduct product={p}/>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Shop