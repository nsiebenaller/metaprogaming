import React from "react";
import { connectContext, connectRouter } from "../../Context";
import * as Util from "../../../utils/file";
import { Icon } from "ebrap-ui";

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
        <div className={"card org"} onClick={editTeam}>
            <img className={"img"} src={`${Util.Bucket}${org.image}`} />
            <div className={"name"}>{org.name}</div>
            <Icon className={"org-arrow"} iconName={"ChevronRight"} />
        </div>
    );
}
