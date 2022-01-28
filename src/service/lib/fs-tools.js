import express from "express"
import { dirname, join, extname } from "path"
import { fileURLToPath } from "url"
import fs from "fs-extra"

const { readJSON, writeJSON, writeFile } = fs

const datafolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const fullProductjsonPath = join(datafolderPath, "products.json")
const publicFolderPath = join(process.cwd(), "./public/image")

export const getProducts = () => readJSON(fullProductjsonPath)
export const writeProducts = (content) => writeJSON(fullProductjsonPath, content)

// export const saveProductImg = (filename, buffer) => writeFile(join(publicFolderPath, filename), buffer)
console.log(datafolderPath)

export const uploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file
    const extenstion = extname(originalname)

    const fileName = `${req.params.id}${extenstion}`
    const pathToFile = join(publicFolderPath, fileName)

    fs.writeFileSync(pathToFile, buffer)
    const imageUrl = `http://localhost:3001/${fileName} `
    req.file = imageUrl
  } catch (error) {
    next(error)
  }
}
