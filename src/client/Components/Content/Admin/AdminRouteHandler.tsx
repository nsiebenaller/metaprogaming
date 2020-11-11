import React from "react";

interface Props {
    redirect: (path: string) => void;
}
export default function AdminRouteHandler({ redirect }: Props) {
    return (
        <div className={"flex-row --right-pad-10"}>
            <AdminCard
                title={"Games"}
                path={"/Admin/Game"}
                redirect={redirect}
            />
            <AdminCard
                title={"Pages"}
                path={"/Admin/Page"}
                redirect={redirect}
            />
            <AdminCard
                title={"Images"}
                path={"/Admin/images"}
                redirect={redirect}
            />
            <AdminCard
                title={"Seasons"}
                path={"/Admin/Season/edit"}
                redirect={redirect}
            />
            <AdminCard
                title={"Users"}
                path={"/Admin/Users"}
                redirect={redirect}
            />
            <AdminCard
                title={
                    <React.Fragment>
                        Create
                        <br />
                        Organization
                    </React.Fragment>
                }
                path={"/Admin/Org/new"}
                redirect={redirect}
            />
            <AdminCard
                title={
                    <React.Fragment>
                        Create
                        <br />
                        Match
                    </React.Fragment>
                }
                path={"/Admin/Match/new"}
                redirect={redirect}
            />
        </div>
    );
}

interface AdminCardProps {
    title: React.ReactNode;
    path: string;
    redirect: (path: string) => void;
}
function AdminCard({ title, path, redirect }: AdminCardProps) {
    const handleClick = () => redirect(path);
    return (
        <div className={"admin-card"} onClick={handleClick}>
            <span>{title}</span>
        </div>
    );
}
