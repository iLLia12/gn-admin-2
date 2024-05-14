import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "../../api/games";
import { useEffect, useState } from "react";
import { Game } from "../../types/game";
import Alert from "../../components/alert";
import Pagination from "../../components/table/pagination";
import { Pagination as PaginationType } from "../../types/pagination";

const PAGINATION_DEFAULT = {
  count: 0,
  perPage: 10,
  page: 1,
  countPages: 0,
};

const Games = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { loading, error, data, refetch } = useQuery(GET_GAMES, {
    variables: { page, perPage },
    pollInterval: 2000,
  });
  const [games, setGames] = useState<Game[]>([]);
  const [pagination, setPagination] =
    useState<PaginationType>(PAGINATION_DEFAULT);

  async function handlePageChange(page: string) {
    setPage(+page);
    await refetch();
  }

  function handlePerPageChange(perPage: number) {
    setPerPage(perPage);
  }

  useEffect(() => {
    if (data) {
      setGames(data.all.list);
      setPagination(data.all.pagination);
    }
  }, [data]);

  if (loading) return null;
  if (error) return <Alert message={error?.message} />;

  return (
    <div>
      <div className="p-4 flex justify-end">
        <Link to="create">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        {games.length && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(games[0]).map((item) => (
                  <th key={item} scope="col" className="px-6 py-3">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {games.map((game: Game) => (
                <tr
                  key={game.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {Object.keys(game).map((key: string) => (
                    <td key={key} className="px-6 py-4">
                      {game[key as keyof Game]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        count={pagination.count}
        onPageChange={handlePageChange}
        countPages={pagination.countPages}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default Games;
