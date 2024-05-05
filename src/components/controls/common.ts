export function inputClassName(error: boolean) {
  let name = "block p-2.5 w-full text-sm rounded-lg border";
  if (error)
    name +=
      " bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  else
    name +=
      " text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  return name;
}

export function labelClassName(error: boolean) {
  let name = "block mb-2 text-sm font-medium";
  if (error) name += " text-red-700 dark:text-red-500";
  else name += " text-gray-900 dark:text-white";
  return name;
}
