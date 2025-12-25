import Link from "next/link"
import getDb from "@/lib/mongodb"

export default async function Page({ params }) {
  const { handle } = await params

  const db = await getDb()
  const item = await db.collection("documents").findOne({ handle })

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100">
        <p className="text-gray-700 text-lg">Bittree not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E9C0E9] flex justify-center px-6 text-gray-800">
      <div className="max-w-md w-full flex flex-col items-center mt-24">

        <div className="relative w-38 h-38 mb-4"> 
          <img 
            src={item.pic} 
            alt="Profile" 
            className="rounded-full border-4 border-white shadow-lg object-cover w-full h-full" 
          /> 
        </div>

        <h1 className="text-2xl font-bold mb-2">@{handle}</h1>
        <p className="text-center text-gray-600 mb-8 px-4">
          {item.desc}
        </p>

        <div className="w-full space-y-4">
          {item.links?.map((i, index) => (
            <Link
              key={index}
              href={i.url}
              target="_blank"
              className="block w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl shadow-md transition-all duration-300 border border-transparent hover:border-purple-400 text-center"
            >
              {i.text}
            </Link>
          ))}

          {item.links?.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              No links added
            </p>
          )}
        </div>

      </div>
    </div>
  )
}
