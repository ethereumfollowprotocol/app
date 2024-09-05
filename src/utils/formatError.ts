export const formatError = (names: (string | undefined)[]) =>
  `${names.slice(0, 10).join(', ')}${names.length > 10 ? ', ...' : ''}`
