import { promises as fs } from 'fs'
import path from 'path'
let i = 0

const findAllFilesInDir = async function(folderName, fileToExclude) {
  let fileNames = await fs.readdir(folderName)

  fileNames = await Promise.all(
    fileNames.map(async file => {
      const currentPath = path.join(folderName, file)
      const stats = await fs.stat(currentPath)

      if (stats.isDirectory()) return findAllFilesInDir(currentPath)
      else if (stats.isFile()) return currentPath
    })
  )

  return fileNames
    .reduce((all, folderContent) => {
      return all.concat(folderContent)
    }, [])
    .filter(fileName => {
      return fileName !== fileToExclude || typeof fileName === 'undefined'
    })
}

export default findAllFilesInDir
