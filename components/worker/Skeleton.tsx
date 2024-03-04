export default function Skeleton() {
    return (
      <ul className="max-w-3xl mx-auto space-y-2 h-screen">
        <div className="animate-pulse bg-gray-300 w-1/5 h-10 inline-block"></div>
        {[...Array(3)].map((_, index) => (
          <li key={index} className='flex gap-2 animate-pulse'>
            <div className="w-1/3 h-40 bg-gray-300"></div>
            <div className="w-2/3 h-40 bg-gray-300"></div>
          </li>
        ))}
      </ul>
    )
  }