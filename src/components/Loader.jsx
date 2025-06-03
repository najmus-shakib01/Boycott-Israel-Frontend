const Loader = () => {
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-64 animate-pulse"
          >
            <div className="bg-gray-200 dark:bg-gray-700 h-6 w-3/4 mb-3 rounded"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full mb-2 rounded"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-5/6 mb-2 rounded"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-2/3 mb-4 rounded"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-8 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
