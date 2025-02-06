
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

app.get("/users/:id", (req, res) => {
    let user = getUserById(parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

app.post("/users", (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    if (!name || !age) {
        res.status(400).send("Invalid input");
        return;
    }
    let newUser = { id: ++lastUserId, name: name, age: age };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
    let userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).send("Invalid ID");
    } else {
        let userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            res.send("User deleted");
        } else {
            res.status(404).send("User not found");
        }
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


