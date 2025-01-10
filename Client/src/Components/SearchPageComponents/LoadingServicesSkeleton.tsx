const LoadingServicesSkeleton = () => {
  const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className={`flex items-center space-x-4 p-4 ${
        index === 3 ? "" : "border-b-2"
      } border-[#3B3B3D]`}
    >
      <div
        className={`w-24 h-32 rounded-lg animate-pulse ${
          index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      ></div>
      <div className="flex-1 space-y-4 py-1">
        <div
          className={`h-4 rounded w-3/4 animate-pulse ${
            index % 2 === 0 ? "bg-gray-500" : "bg-gray-600"
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        ></div>
        <div
          className={`h-4 rounded w-1/2 animate-pulse ${
            index % 2 === 0 ? "bg-gray-500" : "bg-gray-600"
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        ></div>
        <div
          className={`h-4 rounded w-full animate-pulse ${
            index % 2 === 0 ? "bg-gray-500" : "bg-gray-600"
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        ></div>
      </div>
    </div>
  ));

  return <div className="space-y-4">{skeletonItems}</div>;
};

export default LoadingServicesSkeleton;
