let host: string = "http://localhost:5555";
let users: User[] = [];

async function getUserName(id: Number): Promise<String | undefined> {
  let response = await fetch(`${host}/users`);
  let data = await response.json();
  if (data) {
    users = data;
  }
  let user = users.find((user) => user.id == id);
  return user? user.name:'Anonynums';
}

export default getUserName;
