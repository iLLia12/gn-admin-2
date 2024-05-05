import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { STORE_GAME } from "../../../api/games";
import { toast } from "react-toastify";
import { toKebabCase } from "../../../helpers.ts";
import Input from "../../../components/controls/input";
import TextArea from "../../../components/controls/textarea";

type Inputs = {
  name: string;
  slug: string;
  year: number;
  description: string;
};

const CreateGame = () => {
  const [mutateFunction, { loading, error }] = useMutation(STORE_GAME);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await mutateFunction({
        variables: { createBody: { ...data, year: +data.year } },
      });
      resetForm();
      toast("Created", { type: "success" });
    } catch (e: any) {
      toast(error?.message, { type: "error" });
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto pt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-4">
          <Input
            name="name"
            placeholder="name"
            rules={{
              required: "This field is required",
              maxLength: 100,
            }}
            error={errors.name}
            register={register}
          />
        </div>
        <div className="pb-4">
          <Input
            name="slug"
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
              max: 4,
              min: 4,
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
              max: 1000,
              min: 10,
            }}
            error={errors.year}
            register={register}
          />
        </div>
        <button
          disabled={loading}
          className={`w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
        >
          Create
        </button>
      </form>
    </>
  );
};
export default CreateGame;
