import { formatDateWithSuffix } from "@utils/date"
import { ExportIcon, RefreshIcon } from "@icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getExport } from "@services";
import DashboardBarChart from "./dashboard-bar-chart";
import DashboardCards from "./dashboard-cards";
import Button from "@components/button";


const DashboardModule = () => {


  const queryClient = useQueryClient()

  const handleRefresh = () => {
    queryClient.resetQueries({ queryKey: ["chart"]})
    queryClient.resetQueries({ queryKey: ["cards"]})
  }

  const exportMutation = useMutation({
    mutationFn: async () => {
      return await getExport();
    },
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `Family_Day_Report.xlsx`);

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    },
  });


  return (
    <article className="bg-neutral-900 w-full h-full rounded-3xl ring-2 ring-neutral-950 border-1 border-neutral-700 flex flex-col p-8 gap-8 overflow-hidden ">
      <div className="flex items-center justify-between h-fit">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-neutral-200 text-2xl font-medium tracking-tight">Good Morning, Admin👋</h1>
          <p className="text-base text-neutral-400">{formatDateWithSuffix(new Date())}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button variant="secondary" className="flex items-center justify-center gap-2" onClick={handleRefresh}>
            <RefreshIcon className="w-4 h-4 stroke-2 stroke-white" />
            Refresh
          </Button>
          <Button className="flex items-center justify-center gap-2" onClick={() => exportMutation.mutate()}>
            <ExportIcon className="w-4 h-4 stroke-2 stroke-white" />
            Export
          </Button>

        </div>
      </div>
      <DashboardCards />
      <DashboardBarChart />
    </article>
  )
}

export default DashboardModule