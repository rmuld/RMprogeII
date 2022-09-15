import express, { Request, Response, Express } from "express";

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

interface INewUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}
interface IUser extends INewUser {
    id: number
}
const users: IUser[] = [
    {id: 1, firstName: "Kaja", lastName: "Kraps", email: "kaja@kraps.ee", password: "kaja", role: "admin" },
    {id: 2, firstName: "Kersti", lastName: "Kenake", email: "kersti@kenake.ee", password: "kersti", role: "user" }
]

app.get("/api/v1/health", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Hello!"
    });
});

app.get("/api/v1/users", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Get all Users!",
        users
    });
});


app.post("/api/v1/users", (req: Request, res: Response) => {
    console.log(req.body)
    const { firstName, lastName, email, password, role } = req.body;
    const id = users.length + 1;
    const newUser: IUser = {
        id,
        firstName,
        lastName,
        email,
        password,
        role
    }
    users.push(newUser)

    res.status(201).json({
        success: true,
        message:  `User withe email ${newUser.email} was created`
    });
});

app.delete("/api/v1/users/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    console.log(index)
    if (!index) {
        return res.status(404).json({
            success: false,
            message: "User not found!"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Delete all Users!"
    });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App is running on port ${PORT}`);
});