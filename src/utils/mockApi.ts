export async function mockApi(data: unknown) {
  const delay = Math.random() * 3000;

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}
