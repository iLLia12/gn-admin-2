import { Align } from "./types.ts";
import { useEffect } from "react";
import useQueryParams from "../../../hooks/query-params";
import { useSearchParams } from "react-router-dom";

const Pagination = ({
  onPageChange,
  onPerPageChange,
  count = 0,
  countPages = 0,

  align = Align.RIGHT,
}: {
  onPerPageChange: (perPage: number) => void;
  onPageChange: (page: string) => void;
  count: number; // count all items in the DB
  countPages?: number;
  perPage?: number;
  align?: Align;
}) => {
  const { params } = useQueryParams();
  const [searchParams, setSearchParams] = useSearchParams({});

  function pageLinkClass(page: number) {
    const statusClass =
      "" + page == params.page
        ? "hover:bg-gray-100 bg-gray-100"
        : "bg-white hover:bg-gray-100";
    return `flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${statusClass} hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`;
  }

  useEffect(() => {}, [params.page]);

  function handleOnPreviousClick() {
    const current = searchParams.get("page");
    if (current == "1") return;
    if (current) {
      setSearchParams({
        page: "" + (+current - 1),
      });
      onPageChange(current);
    }
  }

  function handleOnNextClick() {
    const current = searchParams.get("page");
    if (countPages && current === "" + countPages) return;
    if (current) {
      const page = "" + (+current + 1);
      setSearchParams({
        page,
      });
      onPageChange(page);
    }
  }

  function handleOnPageChange(page: string) {
    setSearchParams({
      page: "" + page,
    });
    onPageChange(page);
  }

  return (
    <div className={`flex ${align}`}>
      <div className="pt-4">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">1</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {count}
          </span>{" "}
          Entries
        </span>
      </div>
      <nav aria-label="Page navigation example" className={`flex p-2`}>
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              onClick={() => handleOnPreviousClick()}
              className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          {[...Array(countPages)].map((_, val) => (
            <li key={val}>
              <a
                onClick={() => handleOnPageChange("" + (val + 1))}
                className={pageLinkClass(val + 1)}
              >
                {val + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              onClick={() => handleOnNextClick()}
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
