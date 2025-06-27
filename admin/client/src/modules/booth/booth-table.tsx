import type { Booth } from "../../schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBooth, updateBooth } from "../../services";
import clsx from "clsx";
import Button from "@components/button";
import BoothTableSkeleton from "./booth-table-skeleton";

const BoothTable = () => {

  const { data, isLoading, refetch, } = useQuery<Booth[]>({
    queryKey: ["booths"],
    queryFn: getBooth,
  });

  const boothMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: boolean }) => {
      return await updateBooth(id, status);
    },
    onSuccess: () => {
      refetch();
    },
  });


  if (isLoading) return <BoothTableSkeleton />

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center text-lg">
        <p className="text-neutral-200">No booths found.</p>
      </div>
    );
  }

  return (

    <section className="w-full flex flex-col items-start justify-start ring-2 ring-neutral-950 border-1 border-neutral-700 rounded-2xl h-full bg-gradient-to-b from-neutral-400/10 to-neutral-900 overflow-hidden">
      <div className="w-full border-b-2 border-neutral-700 grid grid-cols-[20%_40%_30%_10%] h-16 items-center justify-center p-6">
        {["ID", "Name", "Status", "Actions"].map((item, index) => (
          <label key={index} className="text-sm uppercase text-neutral-200">{item}</label>
        ))}
      </div>
      <div className="w-full h-full overflow-y-scroll border-t-2 border-neutral-950">
        {data.map((booth, index) => {
          const isActive = booth.is_active
          return (
            <div key={index} className="p-6 grid grid-cols-[20%_40%_30%_10%] w-full  text-neutral-200 border-b-2 border-dashed border-neutral-800 items-center justify-center">
              <p className="text-lg font-medium w-full">{booth.id}</p>
              <p className="text-sm w-full">{booth.booth_name}</p>
              <div className="flex items-center justify-start gap-2">
                <span className={clsx("w-2 h-2 rounded-full relative", {
                    "bg-green-500 ": isActive,
                    "bg-neutral-500": !isActive, 
                })}>
                  <span className={clsx("w-2 h-2 rounded-full absolute", {
                    "bg-green-500 animate-ping": isActive,
                    "bg-neutral-500": !isActive,
                  })} />
                </span>
                <label className={clsx("text-sm ", {
                  "text-green-500": isActive,
                  "text-neutral-400": !isActive

                })}>
                  {isActive ? "Active" : "Inactive"}
                </label>
                
              </div>
              <Button 
                className="w-full max-w-32 flex items-center justify-center gap-2"
                variant={isActive ? "secondary" : "primary"}
                onClick={() => boothMutation.mutate({ id: booth.id, status: !isActive })}
              >
                {isActive ? "Deactivate": "Activate"}
              </Button>
            </div>
          )})
        }
      </div>
    </section>
  );
};

export default BoothTable;
