import React from "react";
import * as Sec from "../../../utils/security";
import { Button, TextField } from "ebrap-ui";

interface Props {
    user: User | undefined;
    organization: Organization;
    imageRef?: React.MutableRefObject<HTMLImageElement | null>;
    handleFile?: (event: React.FormEvent<HTMLInputElement>) => void;
    setName?: (name: string) => void;
    saveOrganization?: () => void;
    deleteOrganization?: () => void;
}
export default function OrgHeader(props: Props) {
    const showImage = props.organization.image !== "";

    if (canEdit(props.organization.id, props.user)) {
        return (
            <div>
                <div
                    className={
                        "row align-items-center children--margin-right-10"
                    }
                >
                    <img
                        className={"org-img"}
                        style={{ display: showImage ? "block" : "none" }}
                        ref={props.imageRef}
                        src={props.organization.image}
                    />
                    <input type={"file"} onInput={props.handleFile} />
                </div>
                <br />
                <div className="flex-row --right-pad-10">
                    <TextField
                        label={"Organization Name"}
                        value={props.organization.name || ""}
                        onChange={props.setName}
                        botPad
                    />
                    <Button
                        onClick={props.saveOrganization}
                        color="blue-500"
                        topPad
                    >
                        Save
                    </Button>
                    <Button
                        onClick={props.deleteOrganization}
                        color="red-500"
                        topPad
                    >
                        Delete
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={
                "row align-items-center children--margin-right-10 children--margin-top-0"
            }
        >
            <img
                className={"org-img"}
                style={{ display: showImage ? "block" : "none" }}
                src={props.organization.image}
            />
            <h1>{props.organization.name}</h1>
        </div>
    );
}

function canEdit(orgId: number, user: User | undefined) {
    if (Sec.isAdmin(user)) return true;
    if (Sec.isOrgDirector(orgId, user)) return true;
    return false;
}
