var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let host = "http://localhost:5555";
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
                    // console.log(data.users)
                    users = data.users;
                }
            }
        }
        console.log(users);
        let user = users.find((user) => user.id == id);
        return user ? user.name : 'Anonynums';
    });
}
export default getUserName;
