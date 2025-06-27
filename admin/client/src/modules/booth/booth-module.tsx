import BoothForm from "./booth-form"
import BoothTable from "./booth-table"

const BoothModule = () => {
  return (
    <article className="bg-neutral-900 w-full h-full rounded-3xl ring-2 ring-neutral-950 border-1 border-neutral-700 flex flex-col p-8 gap-8 ">
      <BoothForm />
      <BoothTable />
    </article>
  )
}

export default BoothModule