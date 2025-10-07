export async function mockApi(data: unknown) {
  const delay = Math.random() * 2000;

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}
