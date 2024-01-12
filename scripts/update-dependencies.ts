#!/usr/bin/env bun
/**
 * Update outdated dependencies
 */

import bun from 'bun'
import packageJson from '../package.json' with { type: 'json' }

const {
  name,
  version,
  description,
  repository,
  type,
  scripts,
  dependencies,
  devDependencies,
  ...rest
} = packageJson

main().catch(error => {
  console.error(error)
  process.exit(1)
})

async function main() {
  const updated = await bumpDependencies()
  if (updated) console.log('Dependencies updated')
  else console.log('Dependencies are up to date')

  const { stdout, success } = bun.spawnSync(['bun', 'install', '--no-cache', '--force'])
  console.log(`success: ${success}`, stdout.toString())
}

async function bumpDependencies() {
  const unstableDependenciesNames = getUnstableDependencies(dependencies)
  const unstableDevDependenciesNames = getUnstableDependencies(devDependencies)

  // filter out packages whose version is beta or alpha
  const dependenciesNames = Object.keys(dependencies).filter(
    name => !Object.hasOwn(unstableDependenciesNames, name)
  )
  const latestDependenciesVersions = await Promise.all(
    dependenciesNames.map(name => fetchPackageLatestVersion(name))
  )

  const updatedDependencies = Object.fromEntries(
    dependenciesNames.map((name, index) => [name, `^${latestDependenciesVersions[index]}`])
  )

  for (const [name, version] of Object.entries(unstableDependenciesNames)) {
    updatedDependencies[name] = version
  }

  const devDependenciesNames = Object.keys(devDependencies).filter(
    name => !Object.hasOwn(unstableDevDependenciesNames, name)
  )

  const latestDevDependenciesVersions = await Promise.all(
    devDependenciesNames.map(name => fetchPackageLatestVersion(name))
  )

  const updatedDevDependencies = Object.fromEntries(
    devDependenciesNames.map((name, index) => [name, `^${latestDevDependenciesVersions[index]}`])
  )

  for (const [name, version] of Object.entries(unstableDevDependenciesNames)) {
    updatedDevDependencies[name] = version
  }

  const updatedPackageJson = {
    name,
    version,
    description,
    repository,
    type,
    scripts,
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies,
    ...rest
  }

  const write = await bun.write(
    `${import.meta.dir}/../package.json`,
    `${JSON.stringify(updatedPackageJson, undefined, 2)}\n`
  )

  return Boolean(write)
}

async function fetchPackageLatestVersion(name: string) {
  const response = await fetch(`https://registry.npmjs.org/${name}/latest`)
  const { version } = (await response.json()) as { version: string }
  return version
}

function getUnstableDependencies(dependencies: Record<string, string>) {
  return Object.entries(dependencies)
    .filter(([, version]) => /alpha|beta/.test(version))
    .reduce((acc, [name, version]) => ({ ...acc, [name]: version }), {}) as Record<string, string>
}
