import React from "react";
import Card from "@material-ui/core/Card";
import { connectContext } from "../../Context";

interface Props {
    org: Organization;
}
export default function OrgImage({ org }: Props) {
    const context = connectContext()!;

    const editTeam = () => {
        if (context.user) {
            context.history.push(`/Organization/edit/${org.id}`);
        } else {
            context.history.push(`/Organization/${org.id}`);
        }
    };

    return (
        <Card className={"org"} onClick={editTeam}>
            <img className={"img"} src={org.imageSrc} />
            <div className={"name"}>{org.name}</div>
        </Card>
    );
}
