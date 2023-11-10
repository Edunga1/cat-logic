import * as path from "path"
import Data from "./similarity-result.json"

const mapPathToData = Data.reduce(
  (acc, doc) => {
    const filenameX = path.basename(doc.filename_x)
    const filenameY = path.basename(doc.filename_y)
    if (!acc.has(filenameX)) {
      acc.set(filenameX, [])
    }
    acc.get(filenameX)?.push({
      path: filenameY,
      similarity: doc.similarity,
    })
    return acc
  },
  new Map<string, Doc[]>()
)

interface Doc {
  path: string;
  similarity: number;
}

export default function getRelatedDocs(filepath: string): Doc[] {
  const filename = path.basename(filepath)
  const paths = Array.from(mapPathToData.keys())
  const found = paths.find(x => x.includes(filename))
  if (!found) {
    return []
  }
  return mapPathToData.get(found) ?? []
}
