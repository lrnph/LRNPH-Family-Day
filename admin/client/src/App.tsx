
import Sidebar from "@components/sidebar";
import DashboardModule from "./modules/dashboard/dashboard-module";
import { useAtomValue } from "jotai";
import { activeTabAtom } from "@stores";
import BoothModule from "@modules/booth/booth-module";

const App = () => {


  const activeTab = useAtomValue(activeTabAtom)


  return (
    <main className="w-screen h-screen flex items-start justify-start font-open-sans overflow-hidden bg-neutral-900 overflow-y-scroll p-16">
      <article className="flex items-center justify-start w-full h-full max-w-[1920px] max-h-[1080px] h-full mx-auto">
        <Sidebar />
        {activeTab === "Dashboard" && <DashboardModule /> }
        {activeTab === "Booth" && <BoothModule />}
      </article>
    </main>
  );
}

export default App;
