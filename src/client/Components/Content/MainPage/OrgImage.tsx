import React from "react";
import Card from "@material-ui/core/Card";
import { connectContext, connectRouter } from "../../Context";

interface Props {
    org: Organization;
}
export default function OrgImage({ org }: Props) {
    const context = connectContext()!;
    const router = connectRouter()!;

    const editTeam = () => {
        if (context.user) {
            router.history.push(`/Organization/edit/${org.id}`);
        } else {
            router.history.push(`/Organization/${org.id}`);
        }
    };

    return (
        <Card className={"org"} onClick={editTeam}>
            <img className={"img"} src={org.image} />
            <div className={"name"}>{org.name}</div>
        </Card>
    );
}
