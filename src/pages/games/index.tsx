import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_GAME, GET_GAMES } from "../../api/games";
import { useEffect, useState } from "react";
import { Game } from "../../types/game";
import Alert from "../../components/alert";
import Pagination from "../../components/table/pagination";
import Modal from "../../components/modal";
import ReactPortal from "../../components/portal";
import { toast } from "react-toastify";
import SortIcon from "../../components/table/sort-icon";
import { useNavigate } from "react-router-dom";
import {
  Pagination as PaginationType,
  PAGINATION_DEFAULT,
} from "../../types/pagination";
import DeleteIcon from "../../components/icons/delete";
import EditIcon from "../../components/icons/edit";

const Games = () => {
  const navigate = useNavigate();
  const [deleteGame] = useMutation(DELETE_GAME);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameIdToDelete, setGameIdToDelete] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<string>("id");
  const [order, setOrder] = useState<string>("asc");
  const [perPage, setPerPage] = useState(10);
  const { loading, error, data, refetch } = useQuery(GET_GAMES, {
    variables: { page, perPage, orderBy, order },
    pollInterval: 2000,
  });
  const [games, setGames] = useState<Game[]>([]);
  const [pagination, setPagination] =
    useState<PaginationType>(PAGINATION_DEFAULT);

  function handleModalOpen() {
    setIsModalOpen((val) => !val);
  }

  function handleDeleteConfirmation(id: number) {
    setGameIdToDelete(id);
    handleModalOpen();
  }

  function handleEdit(id: number) {
    navigate(`${id}/edit`);
  }

  async function handleSortBy(field: string) {
    if (orderBy == field) {
      setOrder((val) => (val == "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(field);
      setOrder((val) => (val == "asc" ? "desc" : "asc"));
    }
    await refetch();
  }

  async function handleOnDeleteConfirmationClick() {
    await deleteGame({
      variables: { id: gameIdToDelete },
    });
    await refetch();
    setIsModalOpen(false);
    toast("Deleted", { type: "success" });
  }

  async function handlePageChange(page: string) {
    setPage(+page);
    await refetch();
  }

  async function handlePerPageChange(perPage: number) {
    setPerPage(perPage);
    setPage(1);
    await refetch();
  }

  useEffect(() => {
    if (data) {
      setGames(data.all.list);
      setPagination(data.all.pagination);
    }
  }, [data]);

  useEffect(() => {
    if (!isModalOpen) {
      setGameIdToDelete(null);
    }
  }, [isModalOpen]);

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
                  <th
                    key={item}
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSortBy(item)}
                  >
                    <div className="flex items-center">
                      {item}
                      <SortIcon />
                    </div>
                  </th>
                ))}
                <th></th>
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
                  <td className="flex px-6 py-4">
                    <EditIcon onClick={() => handleEdit(game.id)} />
                    <DeleteIcon
                      onClick={() => handleDeleteConfirmation(game.id)}
                    />
                  </td>
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
      <ReactPortal>
        {isModalOpen && (
          <Modal
            onClose={handleModalOpen}
            onConfirm={handleOnDeleteConfirmationClick}
          />
        )}
      </ReactPortal>
    </div>
  );
};

export default Games;
