export const mapSetInfo = (info, base = 'page') => {
  const res = {}
  normalizeMap(info).forEach(({key, val}) => {
    res[key] = {
      get() {
        return this[base][val]
      },
      set(nVal) {
        let params = {}
        params[val] = nVal
        this.setInfo(params)
      }
    }
  })
  return res
}

export const mapBanner = (info, base = 'banner') => {
  const res = {}
  normalizeMap(info).forEach(({key, val}) => {
    res[key] = {
      get() {
        return this[base][val]
      },
      set(nVal) {
        let params = {}
        params[val] = nVal
        this.updateBanner(params)
      }
    }
  })
  return res
}

export const mapCurrentModule = (info, base = 'module') => {
  const res = {}
  normalizeMap(info).forEach(({key, val}) => {
    res[key] = {
      get() {
        return this[base][val]
      },
      set(nVal) {
        let params = {}
        params[val] = nVal
        this.update(params)
      }
    }
  })
  return res
}

function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}
