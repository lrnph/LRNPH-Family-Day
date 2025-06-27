import { useAtom, useSetAtom } from "jotai";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { AVATAR_DOMAIN } from "../../constants/endpoints";
import { activeEmployeeAtom, activeStageAtom } from "../../stores";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import Button from "../../components/button";
import Toast from "../../components/toast";
import RadioButton from "@components/radio-button";
import { createRegistration } from "@services";
import { confirmationSchema, type Confirmation } from "@schemas";



const RegisterConfirmation = () => {
  const setStage = useSetAtom(activeStageAtom);
  const [activeEmployee, setActiveEmployee] = useAtom(activeEmployeeAtom);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Confirmation>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      employee_id: activeEmployee?.employeeId || "",
      invited_guests: undefined,
    },
  });

  const claimMutation = useMutation({
    mutationFn: async (data: Confirmation) => {
      await createRegistration(data);
    },
    onSuccess: () => {
      setStage("Success");
    },
    onError: (error: AxiosError) => {
      const data = error?.response?.data as { message: string };
      toast.custom(
        () => (
          <Toast
            title="Oops! something went wrong"
            message=""
            subtitle={data.message}
            status="error"
          />
        ),
        { duration: 5000 }
      );
    },
  });

  const onSubmit = (data: Confirmation) => {
    claimMutation.mutate(data);
  };

  const handleClear = () => {
    setActiveEmployee(null);
    setStage("Input");
  };

  if (!activeEmployee) return <div>Error</div>;

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full max-w-[400px] mx-auto">
      <img
        src={AVATAR_DOMAIN + activeEmployee.employeeId + ".jpg"}
        className="w-20 h-20 object-cover rounded-full ring-2 ring-green-500"
      />
      <h1 className="text-2xl text-center text-white font-minecraft-4 mt-4">
        {activeEmployee.firstName +
          " " +
          activeEmployee.middleName +
          " " +
          activeEmployee.lastName}
      </h1>
      <p className="text-lg text-neutral-400 font-medium font-minecraft-3 text-center mt-2">
        ID: {activeEmployee.employeeId}
      </p>
      <div className="flex flex-col items-center justify-center w-full mt-4 ring-1 bg-neutral-900">
        <div className="flex flex-col w-full items-center justify-center px-4 py-2 border-t border-neutral-700 gap-2">
          <label className="text-neutral-400 text-sm">Department</label>
          <p className="text-base text-neutral-200 font-medium font-minecraft-3 text-center">
            {activeEmployee.department}
          </p>
        </div>
        <div className="flex flex-col w-full items-center justify-center px-4 py-2 border-t border-neutral-700">
          <p className="text-lg text-neutral-200 font-medium font-minecraft-3 text-center">
            How many guests did you invite?
          </p>

          <Controller
            control={control}
            name="invited_guests"
            render={({ 
              field: { value, onChange},
             }) => (
              <div className="flex items-center justify-center w-full gap-4 my-4">
                {[0, 1, 2].map((item) => {
                  const isSelected = value === item;
                  return (
                    <RadioButton
                      key={item}
                      label={item === 0 ? "None" : String(item)}                      
                      value={item}
                      onChange={() => onChange(item)}
                      isSelected={isSelected}
                      error={!!errors.invited_guests}
                    />
                  );
                })}
              </div>
            )}
          />
          {errors.invited_guests && (
            <span className="text-base font-minecraft-3 text-rose-500">
              {errors.invited_guests.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="mt-8 text-white text-xl w-full p-2 font-minecraft-4 underline cursor-pointer"
        onClick={handleClear}
      >
        Change Employee
      </button>

      <Button
        className="mt-4"
        isLoading={isSubmitting || claimMutation.isPending}
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterConfirmation;
