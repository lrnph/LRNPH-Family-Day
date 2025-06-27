import { cards } from '@constants';

const DashboardCardSkeleton = () => {
  return (
    <section className="w-full flex items-start justify-center gap-8 ">
      {cards.map((_, index) => (
        <div
          key={index}
          className="flex flex-col w-full ring-2 ring-neutral-950 border border-neutral-700 rounded-2xl bg-gradient-to-b from-neutral-400/10 to-neutral-900 animate-pulse"
        >
          <div className="p-4 flex items-center gap-3 border-b-2 border-neutral-950">
            <div className="w-10 h-10 bg-neutral-700 rounded-full" />
            <div className="w-32 h-6 bg-neutral-700 rounded" />
          </div>
          <div className="px-6 py-4 flex items-center border-t border-neutral-700">
            <div className="w-24 h-9 bg-neutral-700 rounded" />
          </div>
        </div>
      ))}
    </section>
  )
}

export default DashboardCardSkeleton