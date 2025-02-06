
import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;


let users = [{ id: 1, name: "Dmytro Danylkovych", age: 19 }];
let cars = [{ id: 1, brand: "Ford"}];

let lastUserId = 1;

function getById(object, id) {
    return object.find(item => item.id === id);
}

function getUser(users, id) {
    let user = getById(users, parseInt(id));
    if (user) {
        return user;
    } else {
        throw new Error("User not found!");
    }
}

function addUser(users, name, age) {
    if (!name || !age) {
        throw new Error("User not found!");
    }
    let newUser = { id: ++lastUserId, name: name, age: age };
    users.push(newUser);
    return newUser;
}

function deleteUser(users, id) {
    let userId = parseInt(id);
    if (isNaN(userId)) {
        throw new Error("User not found!");
    }
    else {
        let userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            return "User deleted";
        } else {
            throw new Error("User not found!");
        }
    }
}

app.get("/users/:id", (req, res) => {
    try {
        let response = getUser(req.params.id);
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});

app.post("/users", (req, res) => {
    try {
        let response = addUser(
            users,
            req.body.name,
            req.body.age
        );
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});

app.delete("/users/:id", (req, res) => {
    try {
        let response = deleteUser(req.params.id);
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


