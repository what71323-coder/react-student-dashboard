export function getStorageData<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T
): T {
  try {
    const storedData = localStorage.getItem(key);

    if (!storedData) return fallback;

    const parsed: unknown = JSON.parse(storedData);

    return validate(parsed) ? parsed : fallback;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return fallback;
  }
}

export function setStorageData<T>(
  key: string,
  data: T
): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving localStorage:", error);
  }
}
