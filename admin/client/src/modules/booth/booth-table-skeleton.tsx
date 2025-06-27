const BoothTableSkeleton = () => {
  return (
    <section className="w-full flex flex-col items-start justify-start ring-2 ring-neutral-950 border-1 border-neutral-700 rounded-2xl h-full bg-gradient-to-b from-neutral-400/10 to-neutral-900 overflow-hidden animate-pulse">
      {/* Table Header */}
      <div className="w-full border-b-2 border-neutral-700 grid grid-cols-[20%_60%_10%_10%] h-16 items-center justify-center p-6">
        {["ID", "Name", "Status", "Actions"].map((_, index) => (
          <div key={index} className="h-5 bg-neutral-700 rounded w-3/4"></div>
        ))}
      </div>

      {/* Skeleton Rows */}
      {[...Array(12)].map((_, index) => (
        <div key={index} className="p-6 grid grid-cols-[20%_60%_10%_10%] w-full text-neutral-200 border-b border-dashed border-neutral-700 items-center justify-center">
          <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
          <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neutral-700 rounded-full" />
            <div className="h-4 bg-neutral-700 rounded w-12"></div>
          </div>
          <div className="h-10 bg-neutral-700 rounded w-24"></div>
        </div>
      ))}
    </section>
  );
};

export default BoothTableSkeleton;
