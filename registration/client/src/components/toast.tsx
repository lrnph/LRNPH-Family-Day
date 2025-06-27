

type Status = 'success' | 'error' | 'warning' | 'info';

type ToastProps = {
  title: string;
  subtitle: string;
  status: Status;
  message: string;
}

const Toast = ({ title, message, subtitle }: ToastProps) => {
  

  return (
    <section className="p-4 px-6 bg-red-600 overflow-clip flex items-center justify-center relative gap-4">
      <img src="x.svg" className="w-5 h-5 flex-shrink-0 object-conver" />
      <div className="ml-2 h-full w-full flex flex-col items-start justify-center ">
        <h1 className="text-neutral-200 text-lg truncate text-start text-ellipsis font-bold">
          {title + " " + message}
        </h1>
        <p className="text-white text-base line-clamp-1">{subtitle}</p>
      </div>
      <span className="w-full h-full absolute border-x-4 border-red-700 ring-4 ring-black" />
      <span className="w-full h-full absolute border-b-4 border-red-900" />
      <span className="w-full h-full absolute border-t-4 border-red-400" />
    </section>
  )
}

export default Toast;
