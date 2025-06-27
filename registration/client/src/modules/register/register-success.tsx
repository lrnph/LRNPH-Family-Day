import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { AVATAR_DOMAIN } from "../../constants/endpoints";
import { activeEmployeeAtom, activeStageAtom } from "../../stores";
import confetti from "canvas-confetti";
import Button from "../../components/button";


const ClaimSuccess = () => {

  const [ activeEmployee, setActiveEmployee ] = useAtom(activeEmployeeAtom)
  const setActiveStage = useSetAtom(activeStageAtom)

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
    });
  }, []);

  const handleReturn = () => {
    setActiveStage("Input")
    setActiveEmployee(null)
  }

  if (!activeEmployee) return <div>No Employee Found</div>


  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full  max-w-[400px] mx-auto">

      <img src={AVATAR_DOMAIN + activeEmployee.employeeId + ".jpg"} className="w-20 h-20 object-cover rounded-full ring-2 ring-green-500" />
      <div className="flex flex-col items-center justify-center w-full mt-4 gap-2">
        <h1 className="text-2xl text-center text-white font-minecraft-4">{activeEmployee.firstName + " "+ activeEmployee.middleName +  " " +activeEmployee.lastName} is now 
          <span className="text-green-500 ml-2">
            registered!
          </span>
        </h1>
      </div>
      <Button className="mt-8" onClick={handleReturn}>Return</Button>

    </div>
  )
};

export default ClaimSuccess;
