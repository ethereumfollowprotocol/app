#!/usr/bin/env bun
/**
 * Update outdated dependencies
 */

import bun from 'bun'
import packageJson from '../package.json' with { type: 'json' }

const { dependencies, devDependencies, sideEffects, bugs, ...rest } = packageJson

main().catch(error => {
  console.error(error)
  process.exit(1)
})

async function main() {
  const dependenciesNames = Object.keys(dependencies)
  const latestDependenciesVersions = await Promise.all(
    dependenciesNames.map(name => fetchPackageLatestVersion(name))
  )

  const updatedDependencies = Object.fromEntries(
    dependenciesNames.map((name, index) => [name, `^${latestDependenciesVersions[index]}`])
  )

  const devDependenciesNames = Object.keys(devDependencies)
  const latestDevDependenciesVersions = await Promise.all(
    devDependenciesNames.map(name => fetchPackageLatestVersion(name))
  )

  const updatedDevDependencies = Object.fromEntries(
    devDependenciesNames.map((name, index) => [name, `^${latestDevDependenciesVersions[index]}`])
  )

  const updatedPackageJson = {
    ...rest,
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies,
    sideEffects,
    bugs
  }

  const write = await bun.write(
    `${import.meta.dir}/../package.json`,
    `${JSON.stringify(updatedPackageJson, undefined, 2)}\n`
  )

  if (write) console.info('Dependencies updated')
  else console.warn('oof')
}

async function fetchPackageLatestVersion(name: string) {
  const response = await fetch(`https://registry.npmjs.org/${name}/latest`)
  const { version } = (await response.json()) as { version: string }
  return version
}
