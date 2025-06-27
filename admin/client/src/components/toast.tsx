

type Status = 'success' | 'error' | 'warning' | 'info';

type ToastProps = {
  title: string;
  subtitle: string;
  status: Status;
  message: string;
}

const Toast = ({ title, message, subtitle }: ToastProps) => {
  

  return (
    <section className="p-4 ring-2 ring-neutral-950 bg-neutral-800 overflow-clip flex items-center justify-center relative gap-2">
      <img src="x.svg" className="w-6 h-6 flex-shrink-0 object-conver" />
      <div className="ml-2 h-full w-full flex flex-col items-start justify-center ">
        <h1 className="text-neutral-200 text-lg truncate text-start text-ellipsis font-bold">
          {title + " " + message}
        </h1>
        <p className="text-neutral-400 text-base line-clamp-1">{subtitle}</p>
      </div>
      <div className="h-full border-t-3 border-r-3 border-neutral-900 w-full absolute z-20" />
      <div className="h-full border-b-3 border-l-3 border-neutral-700 w-full absolute z-20" />
    </section>
  )
}

export default Toast;
