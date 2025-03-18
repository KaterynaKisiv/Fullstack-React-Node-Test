export function getValue(targetName: string): string | null {
  const cookies = window.document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === undefined || value === undefined) {
      continue
    }

    if (name === targetName) {
      return value
    }
  }

  return null
}

export function hasValue(name: string): boolean {
  return getValue(name) !== null
}
