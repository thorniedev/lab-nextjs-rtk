
export async function fetchData(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/${url}`, {
    cache: 'no-store'
  });
  return res.json();
}
