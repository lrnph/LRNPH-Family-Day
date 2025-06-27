import type { Booth } from '../../schemas';
import { useAtomValue } from 'jotai';
import { activeBoothAtom, activeStageAtom } from '../../stores';
import ClaimInput from '../claim/claim-input';
import ClaimConfirmation from '../claim/claim-confirmation';
import ClaimSuccess from '../claim/claim-success';
import BoothBanner from './booth-banner';
import Footer from '../../components/footer';

type BoothModuleProps = {
  data: Booth[]
}

const BoothModule = ({ data }: BoothModuleProps) => {

  const activeStage = useAtomValue(activeStageAtom)
  const activeBooth = useAtomValue(activeBoothAtom)
  const booth = data.find(booth => booth.id === activeBooth.id) 

  return (
    <article className="w-full h-full bg-neutral-800 flex flex-col overflow-y-scroll relative">
      <BoothBanner booth={booth} />
      {activeStage === "Input" && <ClaimInput />}
      {activeStage === "Confirmation" && <ClaimConfirmation />}
      {activeStage === "Success" && <ClaimSuccess /> }
      <Footer />
    </article>
  );
};

export default BoothModule;
