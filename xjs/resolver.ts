export async function defaultResolver(widgetName: string) {
  try {
    return (await import(/* @vite-ignore */ `/${widgetName}.ts`)).default;
  } catch (e) {
    throw `Widget ${widgetName} not found`;
  }
}
