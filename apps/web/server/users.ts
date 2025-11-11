export async function getUsers() {
  try {
    const res = await fetch(`${process.env.API_URL}/user`);

    if(!res.ok){
        return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}
