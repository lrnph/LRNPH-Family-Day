import { Toaster } from "sonner";
import BoothModule from "./modules/register/register-module";
import Navbar from "./modules/navbar/navbar";

const App = () => {

  
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-start font-open-sans overflow-hidden">
      <Toaster />
      <Navbar />
      <BoothModule />
    </main>
  );
}

export default App;
