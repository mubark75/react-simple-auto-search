import { clsx } from "clsx";

import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import ClearIcon from "@heroicons/react/24/outline/XMarkIcon";

export interface SearchFormProps {
  query: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  onChange,
  onClear,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(value);
  };

  const handleClearButtonClick = () => {
    onClear();
  };

  return (
    <form
      className={clsx(
        "flex items-center flex-grow",
        "max-w-4xl",
        "mr-5 rtl:ml-5 md:ml-5 rtl:mr-5"
      )}
    >
      <label
        htmlFor="search"
        className={clsx(
          "absolute",
          "w-0.5 h-0.5",
          "p-0 -m-0.5",
          "border-0",
          "whitespace-nowrap",
          "overflow-hidden"
        )}
      >
        Search
      </label>

      <div className={clsx("relative w-full")}>
        <div
          className={clsx(
            "absolute top-0 left-0 bottom-0",
            "flex items-center",
            "pl-3",
            "pointer-events-none"
          )}
        >
          <SearchIcon className={clsx("w-5 h-5")} />
        </div>

        <input
          type="text"
          id="search"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
          className={clsx(
            "block",
            "px-10 py-3",
            "bg-gray-100",
            "w-full",
            "border-none"
          )}
        />

        <button
          type="button"
          className={clsx(
            "absolute",
            "top-0 right-0 bottom-0",
            "hidden",
            "flex items-center",
            "pl-3 pr-3",
            "bg-none",
            "border-none",
            "cursor-pointer",
            {
              flex: query.length,
            }
          )}
          onClick={handleClearButtonClick}
        >
          <ClearIcon className={clsx("w-5 h-5")} />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
