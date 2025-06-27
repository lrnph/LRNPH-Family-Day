import type { Booth } from "./schemas";
import { Toaster } from "sonner";
import { activeBoothAtom } from "./stores";
import { useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { getBooth } from "./services";
import Loader from "./components/loader";
import BoothModule from "./modules/booth/booth-module";
import Navbar from "./modules/navbar/navbar";
import HomeModule from "./modules/home/home-module";
import HomeNotFound from "./modules/home/home-not-found";

const App = () => {

  const activeBooth = useAtomValue(activeBoothAtom)
  const { data, isLoading} = useQuery<Booth[]>({
    queryKey: ["booths"],
    queryFn: getBooth,
  });

  if (isLoading) return <Loader />
  if (!data) return <HomeNotFound />
  
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-start font-open-sans overflow-hidden">
      <Toaster />
      <Navbar />
      {activeBooth.id === 0 
        ? <HomeModule data={data} /> 
        : <BoothModule data={data} />
      }
    </main>
  );
}

export default App;
