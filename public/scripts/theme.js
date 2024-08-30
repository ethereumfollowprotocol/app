const storedTheme = window.localStorage.getItem('theme')

if (!storedTheme || storedTheme === 'system') {
  const userMedia = window.matchMedia('(prefers-color-scheme: dark)')

  if (userMedia.matches) {
    document.documentElement.classList.add('dark')
  }
}

if (storedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}

if (storedTheme === 'light') {
  document.documentElement.classList.remove('dark')
}
