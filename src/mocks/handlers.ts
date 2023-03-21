import { rest, DefaultRequestMultipartBody, PathParams } from "msw";

import { SearchProductsResult } from "../types/product";

export const handlers = [
  rest.get<DefaultRequestMultipartBody, PathParams, SearchProductsResult>(
    "https://dummyjson.com/products/search",
    (_, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json({
          limit: 1,
          skip: 0,
          total: 100,
          products: Array.from(Array(4)).map((_, index) => ({
            id: index,
            brand: "brand",
            category: "category",
            description: "some description",
            discountPercentage: 10,
            images: [],
            price: 100,
            rating: 10,
            stock: 100,
            thumbnail: "thumbnail",
            title: "title",
          })),
        })
      );
    }
  ),
];
