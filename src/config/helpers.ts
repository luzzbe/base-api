export const str = (value: string | undefined, key: string): string => {
  if (value === undefined || value === "") {
    throw new Error(`Missing environment variable ${key}.`)
  }
  return value
}

export const int = (value: string | undefined, key: string): number => {
  const parsed = parseInt(value || "", 10)
  if (isNaN(parsed)) {
    throw new Error(`Invalid environment variable ${key}.`)
  }
  return parsed
}

export const bool = (value: string | undefined, key: string): boolean => {
  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}.`)
  }
  return value === "true"
}
