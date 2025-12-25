import getDb from "@/lib/mongodb"

export async function POST(request) {
  return request.json()
    .then((body) => getDb().then((db) => {
      return db.collection('documents').findOne({handle: body.handle})
        .then((findOne) => {
          if (findOne) {
            return {status: "exists", findOne}
          } else {
            return db.collection("documents").insertOne(body)
              .then((result) => {
                return {status: "inserted", result}
              })
          }
        })
    }))
    .then((data) => {
      if (data.status === "exists") {
        return Response.json({success: false, message: "Handle already exists", data})
      } else {
        return Response.json({success: true, message: "This bittree has been generated", data})
      }
    })
    .catch((error) => {
      return Response.json({error: true, message: "Your bittree not generated", error})
    })
}