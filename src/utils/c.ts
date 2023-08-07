export default (...parts: (string | false | undefined | null)[]): string =>
  parts.filter((part) => part && part !== ' ').join(' ')
