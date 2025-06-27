
const HomeNotFound = () => {
  return (
    <article className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-800">
      <h1 className="text-3xl font-minecraft-4 mb-2 text-white text-center">Oops</h1>
      <p className="text-sm text-neutral-200 text-center">
        There are no available booths yet. If you think this is an error, please contact the IT department at <strong>8022</strong>.
      </p>
    </article>
  )
}

export default HomeNotFound