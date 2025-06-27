import type { AxiosError } from 'axios';
import { activeBoothAtom, activeEmployeeAtom, activeStageAtom } from '../../stores';
import { claimSchema, type Claim} from '../../schemas';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useAtomValue, useSetAtom } from 'jotai';
import { Controller, useForm } from "react-hook-form"
import { getEmployee } from '../../services';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import ClaimIntructions from './claim-instructions';
import Button from '../../components/button';
import Input from '../../components/input';
import Toast from '../../components/toast';
import clsx from 'clsx';



const ClaimInput = () => {

  const activeBooth = useAtomValue(activeBoothAtom)
  const setStage = useSetAtom(activeStageAtom)
  const setEmployee = useSetAtom(activeEmployeeAtom)
  const [ mode, setMode ] = useState<"QR Code" | "Manual">("QR Code")
  const [scannerKey, setScannerKey] = useState(0);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      employee_id: "",
      booth_id: activeBooth.id
    }
  })

  const resetScanner = () => {
    setScannerKey((prev) => prev + 1);
  }

  const confirmMutation = useMutation({
    mutationFn: async (employeeId: string) => {
      return await getEmployee(employeeId);
    },
    onSuccess: (data) => {
      setStage("Confirmation")
      setEmployee(data)
      resetScanner();
    },
    onError: (error: AxiosError) => {
      const data = error?.response?.data as { message: string }
      toast.custom(() => (
        <Toast title="Oops! something went wrong" message="" subtitle={data.message} status="error" />
      ), { duration: 5000});
      resetScanner();
    }
  });
  
  const onSubmit = async (data: Claim) => {
    console.log(data)
    confirmMutation.mutate(data.employee_id)
  }

  return (
    <section className="w-full  flex flex-col relative items-center justify-center pb-8">
      <div className="py-8 max-w-[400px] mx-auto w-10/12 flex-shrink-0">
        <img src="/title.png" className="w-full h-full object-contain" />
      </div>
      <div className="h-16 flex items-center justify-center w-full relative flex-shrink-0">
        {["QR Code", "Manual"].map((item, index) => {
          const isActive = item === mode
          return(
            <button
              key={index}
              className={clsx("flex-shrink-0 font-minecraft-3 w-fit text-xl tracking-wide px-4 h-12 cursor-pointer font-semibold relative uppercase border-r-2 border-t-2 border-neutral-500 outline-2 outline-neutral-900",{
                "text-gray-200 ": isActive,
                "text-neutral-500 ": !isActive,
                "z-10": index === 0, 
                "z-0": index !== 0,
              })}
              onClick={() => setMode(item as "QR Code" | "Manual")}
            >
             
              {item}
            </button>
          )
        })}
        <div className="h-px border-b-2 border-neutral-900 w-full absolute bottom-2 z-20" />
        <div className="h-px border-b-4 border-neutral-700 w-full absolute bottom-1 z-20" />
      </div>

      <div className="flex flex-col max-w-[400px] mx-auto w-full h-full items-center justify-center p-8">

        {mode === "QR Code" ? (
          <div className="overflow-clip aspect-square flex items-center justify-center h-72 ">
            {/* Add key to force remount on change */}
            <Scanner
              key={scannerKey}
              onScan={(result: IDetectedBarcode[]) => {
                if (result.length > 0) {
                  confirmMutation.mutate(result[0].rawValue);
                }
              }}
              classNames={{
                container: "border-2 border-neutral-500"
              }}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-start justify-center gap-2 p-4 ">
            <label className="font-medium uppercase text-sm text-gray-300 text-center">
              Employee ID (Ex. 2026-22032)
            </label>
            <Controller 
              name="employee_id"
              control={control}
              render={({ 
                field: { value, onChange},
                fieldState: { error }

              }) => (
                <Input 
                  value={value}
                  onChange={onChange}
                  placeholder="Enter employee ID"
                  error={!!error?.message}
                />
              )}
            />
            <Button type="submit" className="mt-4" isLoading={confirmMutation.isPending}>Confirm</Button>
          </form>
        )}
        <ClaimIntructions mode={mode} />
      </div>
    </section>
  )
}

export default ClaimInput
