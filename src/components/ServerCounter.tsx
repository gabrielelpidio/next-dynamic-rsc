

const ServerCounter = async ({count}: {count: number}) => {
  return <p className="text-2xl font-bold mb-4">
      {`Server ${count ?? 0}`}
  </p>
}
export default ServerCounter