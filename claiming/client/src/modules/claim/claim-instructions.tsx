

const steps = {
  QR: [
    {
      title: "Scan Your QR Code",
      description: "Use the scanner to scan the code.",
    },
    {
      title: "Wait for it to process",
      description: "The system will validate your code.",
    },
    {
      title: "Success!",
      description: "Your reward is ready to claim",
    },
  ],
  Manual: [
    {
      title: "Enter Employee ID",
      description: "Type in your Employee ID.",
    },
    {
      title: "Click Redeem",
      description: "The system will validate your ID.",
    },
    {
      title: "Success!",
      description: "Your reward is ready to claim",
    },
  ],
};

type ClaimIntructionsProps = {
  mode: string;
};

const ClaimIntructions = ({ mode }: ClaimIntructionsProps) => {
  const instructions = mode === "QR Code" ? steps.QR : mode === "Manual" ? steps.Manual : [];

  return (
    <div className="w-full flex flex-col  items-center justify-center mt-4">
      <h1 className="font-minecraft-4 text-3xl md:text-4xl text-white uppercase w-full text-center my-8">
        Instructions
      </h1>
      <div className="grid grid-cols-1 items-center w-full  gap-6 ">

        {instructions.length > 0 && (
          instructions.map((step, index) => (
            <div key={index} className="w-full h-fit px-8 flex flex-col gap-2 items-center justify-center relative bg-neutral-900 py-6">
              <span className="w-full h-full absolute border-t-4 border-r-4 border-neutral-950" />
              <span className="w-full h-full absolute border-b-4 border-l-4 border-neutral-700" />
              <h1 className="text-xl font-bold w-full text-center text-white font-minecraft-3 tracking-wide">
                Step {index + 1  + ": " + step.title} 
              </h1>
              <span className="text-neutral-200 text-base font-normal text-center">
                {" " +step.description}
              </span>
            
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClaimIntructions;
