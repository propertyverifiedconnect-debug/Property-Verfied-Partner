export function getCookieValue() {
  name = 'client_token_partner'
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) return value;
  }
  return null; // cookie not found
}



export async function getServerCookieValue(name: string = 'client_token_partner') {
  const { cookies } = await import('next/headers');
  const cookieStore =  await cookies();
  console.log(cookieStore)
  return   cookieStore.get(name)?.value || null;
}

