import { useAtomValue } from 'jotai';
import { activeStageAtom } from '../../stores';
import ClaimInput from './register-input';
import ClaimConfirmation from './register-confirmation';
import ClaimSuccess from './register-success';
import BoothBanner from './register-banner';
import Footer from '../../components/footer';



const BoothModule = () => {

  const activeStage = useAtomValue(activeStageAtom)

  return (
    <article className="w-full h-full bg-neutral-800 flex flex-col overflow-y-scroll relative">
      <BoothBanner />
      {activeStage === "Input" && <ClaimInput />}
      {activeStage === "Confirmation" && <ClaimConfirmation />}
      {activeStage === "Success" && <ClaimSuccess /> }
      <Footer />
    </article>
  );
};

export default BoothModule;
