let host: string = "https://studious-carnival-644w6rgwr9p2rq9q-5555.app.github.dev";
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
        users = data.users
      }
    }
  }

  console.log(users)
  let user = users.find((user) => user.id == id);
  return user ? user.name : 'Anonynums';
}



const auth = async () => {
  let username = (document.getElementById('username') as HTMLInputElement).value
  let passsword = (document.getElementById('password') as HTMLInputElement).value
  let status = document.getElementById('status')
  if (username && passsword) {
    let response = await fetch(`${host}/users`)
    let data: User[] = await response.json()
    if (data) {
      let userLogin:User|undefined = data.find((user) => user.username == username && user.password == passsword)
      if (userLogin) {
        if (status) {
          status.innerText = 'Success'
          localStorage.setItem('userid',userLogin.id.toString())
          localStorage.setItem('username',username)
          localStorage.setItem('password',passsword)
          console.log('success')
        }
      }
    }
  }
}
const onLoadFunc = ()=>{
  let username =localStorage.getItem('username')
  let password = localStorage.getItem('password')
  let form = document.getElementById('form')
  if (username && password){
    if (form){
      form.remove()
    }
  }
}

declare global {
  interface Window {
    auth: () => void;
    onLoadFunc:()=>void
  }
}
window.onLoadFunc = onLoadFunc
window.auth = auth;

export default getUserName;