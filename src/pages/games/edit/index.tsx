import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GAME, UPDATE_GAME } from "../../../api/games";
import Input from "../../../components/controls/input";
import { toKebabCase } from "../../../helpers.ts";
import TextArea from "../../../components/controls/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../types.ts";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mutateFunction, { loading, error, data: updateRes }] =
    useMutation(UPDATE_GAME);
  const { data } = useQuery(GET_GAME, {
    variables: { id: +id! },
    pollInterval: 2000,
  });
  const {
    register,
    handleSubmit,
    reset: resetForm,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await mutateFunction({
        variables: {
          updateBody: {
            ...data,
            id: +id!,
            slug: toKebabCase(data.name),
            year: +data.year,
          },
        },
      });
      resetForm();
      toast("Updated", { type: "success" });
    } catch (e: any) {
      toast(error?.message, { type: "error" });
    }
  };

  function handleBack() {
    navigate("/");
  }

  function setDefaultFormValues() {
    setValue("name", data.show.name);
    setValue("slug", data.show.slug);
    setValue("year", data.show.year);
    setValue("description", data.show.description);
  }

  useEffect(() => {
    if (data) setDefaultFormValues();
  }, [data]);

  useEffect(() => {
    if (updateRes) setDefaultFormValues();
  }, [updateRes]);

  return (
    <>
      {data && (
        <form
          className="max-w-sm mx-auto pt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="pb-4">
            <Input
              name="name"
              placeholder="name"
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 100,
                  message: "The name can be greater than 100 chars length",
                },
              }}
              error={errors.name}
              register={register}
            />
          </div>
          <div className="pb-4">
            <Input
              name="slug"
              disabled={true}
              error={errors.name}
              register={register}
              value={toKebabCase(watch("name") || "")}
            />
          </div>
          <div className="pb-4">
            <Input
              name="year"
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 4,
                  message: "max 4",
                },
                minLength: {
                  value: 4,
                  message: "min 4",
                },
              }}
              error={errors.year}
              register={register}
            />
          </div>
          <div className="pb-4">
            <TextArea
              name="description"
              placeholder="description"
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 1000,
                  message:
                    "The description can be greater than 1000 chars length",
                },
                minLength: {
                  value: 10,
                  message: "The description can be less than 10 chars length",
                },
              }}
              error={errors.description}
              register={register}
            />
          </div>
          <div className="flex">
            <button
              onClick={handleBack}
              className=" w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            >
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Back
              </span>
            </button>
            <button
              disabled={loading}
              className={`w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
            >
              Create
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Edit;
