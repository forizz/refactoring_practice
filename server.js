
import express from "express";

const app = express();
app.use(express.json());


let users = [{ id: 1, name: "Dmytro Danylkovych", age: 19 }];
let cars = [{ id: 1, brand: "Ford"}];

let lastUserId = 1;

function getUserById(id) {
    return users.find(user => user.id === id);
}

function getCarById(id) {
    return cars.find(car => car.id === id);
}

function getUser(id) {
    let user = getUserById(parseInt(id));
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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


