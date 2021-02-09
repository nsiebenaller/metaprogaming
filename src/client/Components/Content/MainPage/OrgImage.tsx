import React from "react";
import { Icon } from "ebrap-ui";
import { connectContext, connectRouter } from "@Store";
import * as Sec from "@/utils/security";
import Image from "@/Shared/Image";

interface Props {
    org: Organization;
}
export default function OrgImage({ org }: Props) {
    const context = connectContext();
    const router = connectRouter();

    const editTeam = () => {
        const isDirector = Sec.isOrgDirector(org.id, context.user);
        const isCoach = Sec.isOrgCoach(org.id, context.user);
        const isAdmin = Sec.isAdmin(context.user);

        if (isDirector || isCoach || isAdmin) {
            router.navigate(`/Organization/edit/${org.id}`);
        } else {
            router.navigate(`/Organization/${org.id}`);
        }
    };

    return (
        <div className={"card org"} onClick={editTeam}>
            <Image className={"img"} src={org.image} />
            <div className={"name"}>{org.name}</div>
            <Icon className={"org-arrow"} iconName={"ChevronRight"} />
        </div>
    );
}
