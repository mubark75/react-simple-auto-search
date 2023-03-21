import {
  render,
  screen,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, DefaultRequestMultipartBody, PathParams } from "msw";

import { server } from "../../mocks/server";

import Menu from ".";
import { navLinks } from "./Nav";
import { trendingProducts } from "./SearchDialog";

import { SearchProductsResult } from "../../types/product";

global.ResizeObserver = require("resize-observer-polyfill");

describe("app menu", () => {
  beforeEach(() => {
    render(<Menu />);
  });

  test("should render logo, navlinks and search button", () => {
    expect(getLogo()).toBeInTheDocument();

    expect(getLinks()).toEqual(navLinks.map((l) => l.name));

    expect(getSearchButton()).toBeInTheDocument();
  });

  describe("when search dialog is open", () => {
    beforeEach(() => {
      act(() => {
        userEvent.click(getSearchButton());
      });
    });

    test("should render searchform, cancel button and trending products", () => {
      expect(getSearchForm()).toBeInTheDocument();
      expect(getSearchForm()).toHaveFocus();
      expect(getCancelButton()).toBeInTheDocument();
      expect(getTrendingProductsHeading()).toBeInTheDocument();
      expect(getTrendingProductsListItems()).toEqual(
        trendingProducts.map((p) => p.name)
      );
    });

    test("should close when cancel button is clicked", () => {
      act(() => userEvent.click(getCancelButton()));

      expect(querySearchForm()).not.toBeInTheDocument();
      expect(queryCancelButton()).not.toBeInTheDocument();
      expect(queryTrendingProductsHeading()).not.toBeInTheDocument();
    });

    test("should close when escape button is clicked", () => {
      act(() => userEvent.keyboard("{Escape}"));

      expect(querySearchForm()).not.toBeInTheDocument();
      expect(queryCancelButton()).not.toBeInTheDocument();
      expect(queryTrendingProductsHeading()).not.toBeInTheDocument();
    });

    test("should render loading skeletons then products", async () => {
      act(() => userEvent.type(getSearchForm(), "samsung"));

      await waitForElementToBeRemoved(() => queryLoadingSkeleton());

      expect(
        screen.getAllByTestId("product-card").map((item) => item.textContent)
      ).toHaveLength(4);
      expect(
        screen
          .getAllByTestId("product-card-image")
          .map((item) => item.textContent)
      ).toHaveLength(4);
      expect(
        screen
          .getAllByTestId("product-card-title")
          .map((item) => item.textContent)
      ).toHaveLength(4);
      expect(
        screen
          .getAllByTestId("product-card-description")
          .map((item) => item.textContent)
      ).toHaveLength(4);
    });

    describe("when server return error", () => {
      beforeEach(() => {
        server.use(
          rest.get("https://dummyjson.com/products/search", (_, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: "error" }));
          })
        );
      });

      test("should render loading skeletons then error message", async () => {
        act(() => userEvent.type(getSearchForm(), "samsung"));

        await waitForElementToBeRemoved(() => queryLoadingSkeleton());

        expect(getError()).toBeInTheDocument();
      });
    });

    describe("when server return empty list", () => {
      beforeEach(() => {
        server.use(
          rest.get<
            DefaultRequestMultipartBody,
            PathParams,
            SearchProductsResult
          >("https://dummyjson.com/products/search", (_, res, ctx) => {
            return res(ctx.json({ limit: 0, skip: 0, products: [], total: 0 }));
          })
        );
      });

      test("should render loading skeletons then empty list", async () => {
        act(() => userEvent.type(getSearchForm(), "samsung"));

        await waitForElementToBeRemoved(() => queryLoadingSkeleton());

        expect(getEmptyList()).toBeInTheDocument();
      });
    });
  });
});

const getLogo = () => {
  return screen.getByRole("heading", { name: /logo/i });
};

const getLinks = () => {
  return screen.getAllByRole("link").map((i) => i.textContent);
};

const getSearchButton = () => {
  return screen.getByRole("button", {
    name: /search\-button/i,
  });
};

const getSearchForm = () => {
  return screen.getByRole("textbox", {
    name: /search/i,
  });
};

const querySearchForm = () => {
  return screen.queryByRole("textbox", {
    name: /search/i,
  });
};

const getCancelButton = () => {
  return screen.getByRole("button", {
    name: /cancel/i,
  });
};

const queryCancelButton = () => {
  return screen.queryByRole("button", {
    name: /cancel/i,
  });
};

const getTrendingProductsHeading = () => {
  return screen.getByRole("heading", {
    name: /trending products/i,
  });
};

const queryTrendingProductsHeading = () => {
  return screen.queryByRole("heading", {
    name: /trending products/i,
  });
};

const getTrendingProductsListItems = () => {
  return screen.getAllByRole("listitem").map((i) => i.textContent);
};

const queryLoadingSkeleton = () => {
  return screen.queryByTestId("loading");
};

const getError = () => {
  return screen.getByTestId("error");
};

const getEmptyList = () => {
  return screen.getByTestId("empty-result");
};
