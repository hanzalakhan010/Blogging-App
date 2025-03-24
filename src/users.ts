let host: string = "http://localhost:5555";
let users: User[] = [];

async function getUserName(id: Number): Promise<String> {
  if (id == 0) return 'Anonynoums'
  if (users.length <= 0) {
    try {
      let response = await fetch(`${host}/users/${id}`);
      let data = await response.json();
      return data ? data.name : 'Anonynums'

    }
    catch {
      let response = await fetch('../data/db.json')
      let data = await response.json()
      if (data) {
        // console.log(data.users)
        users = data.users
      }
    }
  }

  console.log(users)   
  let user = users.find((user) => user.id == id);
  return user ? user.name : 'Anonynums';
}

export default getUserName;
