const storedTheme = window.localStorage.getItem('theme')

if (!storedTheme || storedTheme === 'system') {
  const userMedia = window.matchMedia('(prefers-color-scheme: dark)')

  if (userMedia.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
} else if (storedTheme === 'dark') {
  document.documentElement.classList.add('dark')
} else if (storedTheme === 'light') {
  document.documentElement.classList.remove('dark')
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (storedTheme === 'system') {
    if (e.matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
})
