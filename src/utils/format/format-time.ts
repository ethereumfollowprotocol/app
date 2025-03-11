export const formatTimeDiff = (timeDiff: number) => {
  if (timeDiff < 60) {
    return `${Math.floor(timeDiff)}s`
  } else if (timeDiff < 3600) {
    return `${Math.floor(timeDiff / 60)}m`
  } else if (timeDiff < 86400) {
    return `${Math.floor(timeDiff / 3600)}h`
  } else if (timeDiff < 2592000) {
    return `${Math.floor(timeDiff / 86400)}d`
  } else if (timeDiff < 31536000) {
    return `${Math.floor(timeDiff / 2592000)}m`
  } else {
    return `${Math.floor(timeDiff / 31536000)}y`
  }
}
