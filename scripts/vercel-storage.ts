#!/usr/bin/env bun
import bun from 'bun'
import fs from 'node:fs'
import * as vblob from '@vercel/blob'
import { raise } from '#/lib/utilities.ts'

const VERCEL_BLOB_READ_WRITE_TOKEN = process.env.VERCEL_BLOB_READ_WRITE_TOKEN
if (!VERCEL_BLOB_READ_WRITE_TOKEN) raise('VERCEL_BLOB_READ_WRITE_TOKEN is not defined')

const fontsLocation = `${import.meta.dir}/../src/app/assets/fonts`

main().catch(error => {
  // console.error(error)
  process.exit(1)
})

async function main() {
  await putFonts()
}

async function putFonts() {
  const fontsPaths = fs
    .readdirSync(fontsLocation, { encoding: 'utf8' })
    .map(font => ({ filename: font, fullPath: `${fontsLocation}/${font}` }))

  const fonts = await Promise.all(
    fontsPaths.map(async font => ({
      filename: font.filename,
      fullPath: font.fullPath,
      content: await bun.file(font.fullPath).arrayBuffer()
    }))
  )

  const results = await Promise.all(
    fonts.map(font =>
      vblob.put(`/fonts/${font.filename}`, font.content, {
        access: 'public',
        token: VERCEL_BLOB_READ_WRITE_TOKEN,
        contentType: 'application/octet-stream'
      })
    )
  )

  // console.log(JSON.stringify(results, undefined, 2))
}
