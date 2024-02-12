const svgResources = new Map()

function loadIcons() {
  let modules = import.meta.glob('@/assets/images/icons/**/*.svg', {
    as: 'raw',
    eager: true
  })
  for (const fileName in modules) {
    const name = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length - 4)
    svgResources.set(name, modules[fileName])
  }
}

function getSvgIcon(name: string) {
  console.log(name)

  return svgResources.get(name)
}

export { loadIcons, getSvgIcon, svgResources }
