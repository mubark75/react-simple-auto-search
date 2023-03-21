import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Logo from "../Logo";
import Dialog from "./Dialog";
import SearchForm from "./SearchForm";

import useDebounce from "../../../hooks/useDebounce";

import { fakeStoreApi } from "../../../utils/api";
import { truncate } from "../../../utils/truncate";
import { SearchProductsResult } from "../../../types/product";

export interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const trendingProducts = [
  { id: 1, name: "cloud skin", href: "/product/cloud skin" },
  { id: 2, name: "glazed lids", href: "/product/glazed lids" },
  { id: 3, name: "washed denim", href: "/product/washed denim" },
  { id: 4, name: "overlined lips", href: "/product/overlined lips" },
  { id: 5, name: "Bleached eyebrows", href: "/product/Bleached eyebrows" },
];

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<SearchProductsResult["products"]>(
    []
  );

  const debouncedQuery = useDebounce(query);

  const handleSearchFormChange = (value: string) => {
    setIsLoading(!!value);
    setQuery(value);
  };

  const handleSearchFormClearButtonClick = () => {
    setQuery("");
  };

  const handleCancelButtonClick = () => {
    onClose();
  };

  useEffect(() => {
    const abortController = new AbortController();

    const handleGetProducts = async () => {
      setError("");
      setProducts([]);

      if (debouncedQuery.length > 0) {
        try {
          setIsLoading(true);

          const res = await fakeStoreApi.get<SearchProductsResult>(
            "/products/search",
            {
              params: { q: debouncedQuery, limit: 10 },
              signal: abortController.signal,
            }
          );

          setIsLoading(false);
          setProducts(res.data.products);
        } catch (error: any) {
          if (error.name !== "CanceledError") {
            console.log("error:", error);
            setIsLoading(false);
            setError(error?.message || "oops someting went wrong");
          }
        }
      }
    };

    handleGetProducts();

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <header className={clsx("md:border-b md:border-b-gray-50")}>
        <div className={clsx("container", "py-3")}>
          <div className={clsx("flex justify-between items-center")}>
            <div className={clsx("hidden md:block")}>
              <Logo />
            </div>

            <SearchForm
              query={query}
              onChange={handleSearchFormChange}
              onClear={handleSearchFormClearButtonClick}
            />

            <button
              className={clsx("bg-none", "border-none", "cursor-pointer")}
              onClick={handleCancelButtonClick}
            >
              cancel
            </button>
          </div>
        </div>
      </header>

      {error && <Error error={error} />}

      {!error && isLoading && <LoadingSkeleton />}

      {!error && !isLoading && !query && (
        <section data-testid="trending-products">
          <div className={clsx("container", "px-5 py-10")}>
            <h3 className={clsx("mb-5", "text-lg capitalize")}>
              trending products
            </h3>

            <ul>
              {trendingProducts.map((product) => (
                <li key={product.id}>
                  <a
                    href={product.href}
                    className={clsx(
                      "block",
                      "my-3",
                      "no-underline capitalize",
                      "opacity-70"
                    )}
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {!error && !isLoading && query && products.length === 0 && (
        <EmptyResult />
      )}

      {!error && !isLoading && query && products?.length > 0 && (
        <section className={clsx("container", "flex justify-center p-10")}>
          <ul className={clsx("flex flex-wrap flex-grow", "-mx-2")}>
            {products.slice(0, 4).map((product) => {
              const href = `/product/${product.id}`;

              return (
                <li
                  data-testid="product-card"
                  key={product.id}
                  className={clsx(
                    "flex flex-col flex-[100%] max-w-full px-2 mb-10",
                    "xs:flex-[33.333%] xs:max-w-[33.333%] lg:flex-[25%] lg:max-w-[25%]"
                  )}
                >
                  <a
                    href={href}
                    className={clsx("block", "aspect-w-1 aspect-h-1")}
                  >
                    <img
                      data-testid="product-card-image"
                      src={product.thumbnail}
                      alt={product.title}
                      className={clsx("w-full h-full", "object-contain")}
                    />
                  </a>

                  <div
                    className={clsx(
                      "flex justify-between flex-col flex-grow",
                      "text-center"
                    )}
                  >
                    <a href={href} className={clsx("no-underline")}>
                      <h3
                        data-testid="product-card-title"
                        className={clsx("my-2", "text-sm font-bold")}
                      >
                        {product.title}
                      </h3>
                    </a>

                    <p
                      data-testid="product-card-description"
                      className={clsx("opacity-70")}
                    >
                      {truncate(product.description, 40)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </Dialog>
  );
};

const Error = ({ error }: { error: string }) => {
  return (
    <section data-testid="error" className={clsx("container", "px-5 py-10")}>
      {error}
    </section>
  );
};

const LoadingSkeleton = () => {
  return (
    <section
      id="loading"
      role="status"
      aria-busy="true"
      aria-hidden="false"
      data-testid="loading"
      className={clsx("container", "flex justify-center px-5 py-10")}
    >
      <ul className={clsx("flex flex-wrap -mx-2 max-w-7xl w-full")}>
        {Array.from(Array(4)).map((_, idx) => {
          return (
            <li
              key={idx}
              className={clsx(
                "flex flex-col flex-[100%] max-w-full px-2 mb-10",
                "xs:flex-[33.333%] xs:max-w-[33.333%]",
                "lg:flex-[25%] lg:max-w-[25%]"
              )}
            >
              <div className={clsx("block", "aspect-w-1 aspect-h-1")}>
                <div
                  className={clsx("w-full h-full bg-gray-100 animate-pulse")}
                />
              </div>

              <div
                className={clsx(
                  "flex flex-col justify-between text-center flex-grow"
                )}
              >
                <div className={clsx("w-full h-2 my-2 bg-gray-100")} />

                <div className={clsx("w-full h-2 bg-gray-100")} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const EmptyResult = () => {
  return (
    <section data-testid="empty-result">
      <div className={clsx("container", "flex flex-col items-center", "py-10")}>
        <h3 className={clsx("capitalize mb-5")}>ooops! no result found</h3>
        <p>try a new search or use our suggestions.</p>
      </div>
    </section>
  );
};

export default SearchDialog;
