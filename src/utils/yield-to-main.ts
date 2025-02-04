export const yieldToMain = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
