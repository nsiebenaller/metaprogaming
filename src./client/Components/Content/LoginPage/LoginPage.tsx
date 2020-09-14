import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connectContext } from "../../Context";

interface Props {}
export default function LoginPage(props: Props) {
    const context = connectContext()!;

    const [username, setUsername] = React.useState("");
    const handleUsername = (e: any) => setUsername(e.target.value);

    const [password, setPassword] = React.useState("");
    const handlePassword = (e: any) => setPassword(e.target.value);

    const [error, setError] = React.useState(false);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data } = await axios.post("/api/login", { username, password });
        if (!data.success) return setError(true);
        context.setUser(username);
        context.history.push("/");
    };

    return (
        <div>
            <h1>Login</h1>
            <form className="login-main" onSubmit={login}>
                <TextField
                    variant="outlined"
                    label="Username"
                    value={username}
                    onChange={handleUsername}
                    error={error}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    error={error}
                />
                <Button
                    variant="contained"
                    disableElevation
                    onClick={login}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
