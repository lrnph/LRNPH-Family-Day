import { cards } from '@constants';
import { getAnalytics } from '@services';
import { useQuery } from '@tanstack/react-query';
import type { CardData } from '@types';
import DashboardCardSkeleton from './dashboard-card-skeleton';

const DashboardCards = () => {
  const { data, isLoading } = useQuery<CardData>({
    queryKey: ['cards'],
    queryFn: getAnalytics,
  });

  if (isLoading) return <DashboardCardSkeleton />

  if (!data) {
    return (
      <section className="w-full flex items-center justify-center py-10">
        <p className="text-red-500 text-lg">Failed to load data</p>
      </section>
    );
  }

  return (
    <section className="w-full flex items-start justify-center gap-8">
      {cards.map((card, index) => {
        const cardValue = data[card.valueKey as keyof CardData];

        return (
          <div
            key={index}
            className="flex flex-col w-full ring-2 ring-neutral-950 border border-neutral-700 rounded-2xl bg-gradient-to-b from-neutral-400/10 to-neutral-900"
          >
            <div className="p-4 flex items-center gap-3 border-b-2 border-neutral-950">
              <figure className="w-10 h-10 flex items-center justify-center">
                <card.icon className="w-6 h-6 stroke-2 stroke-neutral-500" />
              </figure>
              <h1 className="text-xl font-normal tracking-tight text-neutral-200">{card.name}</h1>
            </div>
            <div className="px-6 py-4 flex items-center border-t border-neutral-700">
              <h2 className="text-3xl font-normal tracking-tight text-neutral-200">
                {cardValue ?? 'N/A'}
              </h2>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DashboardCards;
