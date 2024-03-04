function Skeleton() {
  return (
    <div className="bg-gray-300 p-4 rounded-md animate-pulse">
      {/* Table header */}
      <div className="w-full h-8 bg-gray-400 mb-2 rounded" />
      {/* Table rows */}
      <div className="grid grid-cols-3 gap-2">
        <div className="w-1/4 h-8 bg-gray-400 rounded" />
        <div className="w-1/4 h-8 bg-gray-400 rounded" />
        <div className="w-1/4 h-8 bg-gray-400 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="w-1/4 h-8 bg-gray-400 rounded" />
        <div className="w-1/4 h-8 bg-gray-400 rounded" />
        <div className="w-1/4 h-8 bg-gray-400 rounded" />
      </div>
    </div>
  );
}

export default Skeleton;
