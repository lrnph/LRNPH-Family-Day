import { boothSchema, type BoothFormData } from "../../schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooth } from "../../services";
import Input from "../../components/input";
import Button from "../../components/button";

const BoothForm = () => {

  const queryClient = useQueryClient()
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(boothSchema),
    defaultValues: {
      booth_name: "",
    }
  })

  const boothMutation = useMutation({
    mutationFn: async (data: BoothFormData) => {
      return await createBooth(data);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["booths"]})
      reset()
    },
  });

  const onSubmit = async (data: BoothFormData) => {
    boothMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center justify-between gap-4 ">
      <div className="flex items-center justify-start w-full">
         <h1 className="text-neutral-200 text-2xl font-medium tracking-tight">Available Booths</h1>
      </div>
      <div className="flex items-center justify-center gap-4 w-120">
        <Controller 
          name="booth_name"
          control={control}
          render={({ 
            field: { value, onChange},
            fieldState: { error }

          }) => (
            <Input 
              value={value}
              onChange={onChange}
              placeholder="Enter Booth Name"
              error={!!error?.message}
            />
          )}
        />
        <Button type="submit" >Create</Button>
      </div>
    </form>
  )
}

export default BoothForm