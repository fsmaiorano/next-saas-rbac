'use server'

export async function signInWithEmailAndPassword(data: FormData) {
  console.log(Object.fromEntries(data))
  // return fetch('/api/auth/sign-in', {
  //   method: 'POST',
  //   body: data,
  // })
}
