import type { AxiosError } from "axios";
import type { Claim } from "../../schemas";
import { AVATAR_DOMAIN } from "../../constants/endpoints";
import { activeBoothAtom, activeEmployeeAtom, activeStageAtom } from "../../stores";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { claimRewards, } from "../../services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Button from "../../components/button";
import Toast from "../../components/toast";


const ClaimcConfirmation = () => {

  const [activeEmployee, setActiveEmployee] = useAtom(activeEmployeeAtom)
  const booth = useAtomValue(activeBoothAtom)
  const setStage = useSetAtom(activeStageAtom)

  const claimMutation = useMutation({
    mutationFn: async (employeeId: string) => {
      if (!booth || !activeEmployee) return null
      const data: Claim = {
        employee_id: employeeId,
        booth_id: booth.id,
      };
      return await claimRewards(data);
    },
    onSuccess: () => {
      setStage("Success")
    },
    onError: (error: AxiosError) => {
      const data = error?.response?.data as { message: string}
      toast.custom(() => (
        <Toast title="Oops! something went wrong" message="" subtitle={data.message} status="error" />
      ), { duration: 5000});
    }
  });


  const handleClear = () => {
    setActiveEmployee(null)
    setStage("Input")
  }


  if (!activeEmployee) return <div>Error</div>


  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full  max-w-[400px] mx-auto">

      <img src={AVATAR_DOMAIN + activeEmployee.employeeId + ".jpg"} className="w-20 h-20 object-cover rounded-full ring-2 ring-green-500" />
      <h1 className="text-2xl text-center text-white font-minecraft-4 mt-4">{activeEmployee.firstName + " "+ activeEmployee.middleName +  " " +activeEmployee.lastName}</h1>
      <p className="text-lg text-neutral-400 font-medium font-minecraft-3 text-center mt-2">ID: {activeEmployee.employeeId}</p>
      <div className="flex flex-col items-center justify-center w-full mt-4 ring-1 bg-neutral-900">
        

        <div className="flex flex-col w-full items-center justify-center px-4 py-2 border-t border-neutral-700 gap-2">
          <label className="text-neutral-400 text-sm">Department</label>
          <p className="text-base text-neutral-200 font-medium font-minecraft-3 text-center">{activeEmployee.department}</p>
        </div>
        <div className="flex flex-col w-full items-center justify-center px-4 py-2 border-t border-neutral-700">
          <p className="text-xl text-neutral-200 font-medium font-minecraft-3 text-start">{activeEmployee.guests === 0 ? "No Guest Invited" : activeEmployee.guests + " Invited Guests"} 
          </p>
        </div>
        {/* {employee.department} */}
      </div>
      <button type="button" className="mt-8 text-white text-xl w-full p-2 font-minecraft-4 underline cursor-pointer" onClick={handleClear}>Change Employee</button>
      <Button className="mt-4" isLoading={claimMutation.isPending} onClick={() => claimMutation.mutate(activeEmployee.employeeId)}>Claim</Button>
    </div>
  )
};

export default ClaimcConfirmation;
