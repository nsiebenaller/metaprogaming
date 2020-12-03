import React from "react";
import axios from "axios";
import { Button } from "ebrap-ui";
import { connectContext, connectRouter } from "../../../Store/Store";
import { checkUser } from "../../../Api";

interface Props {}
export default function LoginPage(props: Props) {
    const context = connectContext()!;
    const router = connectRouter()!;

    const [username, setUsername] = React.useState("");
    const handleUsername = (e: any) => setUsername(e.target.value);

    const [password, setPassword] = React.useState("");
    const handlePassword = (e: any) => setPassword(e.target.value);

    const [error, setError] = React.useState(false);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data } = await axios.post("/api/login", { username, password });
        if (!data.success) return setError(true);
        const check = await checkUser();
        if (check.verified) {
            context.setContext({ user: check.user, selectedGame: undefined });
            router.navigate("/");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form className="login-main" onSubmit={login}>
                <input
                    type={"text"}
                    placeholder={"Username"}
                    onChange={handleUsername}
                    value={username}
                />
                <input
                    type={"password"}
                    placeholder={"Password"}
                    onChange={handlePassword}
                    value={password}
                />
                <Button onClick={login}>Login</Button>
            </form>
            {error && <div>Invalid Credentials</div>}
        </div>
    );
}
