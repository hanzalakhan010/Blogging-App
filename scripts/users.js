var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let host = "https://studious-carnival-644w6rgwr9p2rq9q-5555.app.github.dev";
let users = [];
function getUserName(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id == 0)
            return 'Anonynoums';
        if (users.length <= 0) {
            try {
                let response = yield fetch(`${host}/users/${id}`);
                let data = yield response.json();
                return data ? data.name : 'Anonynums';
            }
            catch (_a) {
                let response = yield fetch('../data/db.json');
                let data = yield response.json();
                if (data) {
                    users = data.users;
                }
            }
        }
        console.log(users);
        let user = users.find((user) => user.id == id);
        return user ? user.name : 'Anonynums';
    });
}
const auth = () => __awaiter(void 0, void 0, void 0, function* () {
    let username = document.getElementById('username').value;
    let passsword = document.getElementById('password').value;
    let status = document.getElementById('status');
    if (username && passsword) {
        let response = yield fetch(`${host}/users`);
        let data = yield response.json();
        if (data) {
            let userLogin = data.find((user) => user.username == username && user.password == passsword);
            if (userLogin) {
                if (status) {
                    status.innerText = 'Success';
                    localStorage.setItem('userid', userLogin.id.toString());
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', passsword);
                    console.log('success');
                }
            }
        }
    }
});
const onLoadFunc = () => {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    let form = document.getElementById('form');
    if (username && password) {
        if (form) {
            form.remove();
        }
    }
};
window.onLoadFunc = onLoadFunc;
window.auth = auth;
export default getUserName;
