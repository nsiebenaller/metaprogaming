import { Button, TextField } from "ebrap-ui";
import React from "react";
import { createOrganization, fetchOrganizations } from "../../../../Api";
import * as Util from "../../../../utils/file";
import { connectContext } from "../../../Context";

const initOrg: Organization = {
    id: -1,
    image: "",
    name: "",
    players: new Array<Player>(),
};
export default function NewOrgPage() {
    const context = connectContext();

    const imageRef = React.useRef<HTMLImageElement | null>(null);
    const [file, setFile] = React.useState<File | undefined>();
    const [org, setOrg] = React.useState<Organization>(initOrg);

    const handleFile = (event: React.FormEvent<HTMLInputElement>) => {
        const file = Util.extractFile(event);
        setFile(file);
        if (!file) return;
        Util.setImage(file, imageRef);
    };
    const setName = (name: string) => setOrg({ ...org, name });
    const save = async () => {
        if (!file) {
            return window.alert("Org must have an image");
        }
        const data = await createOrganization(org.name, file);
        if (data.success) {
            window.alert("success!");
        } else {
            return window.alert("Error saving!");
        }
        const organizations = await fetchOrganizations();
        context.setContext({ organizations });
    };

    return (
        <div>
            <h2>Create Organization</h2>
            <img
                className={"org-img"}
                ref={imageRef}
                src={`${Util.Bucket}${org.image}`}
            />
            <br />
            <input type={"file"} onInput={handleFile} />
            <br />
            <br />
            <div className="flex-row --right-pad-10">
                <TextField
                    label={"Organization Name"}
                    value={org.name || ""}
                    onChange={setName}
                    botPad
                />
                <Button onClick={save} color="blue-500" topPad>
                    Save
                </Button>
            </div>
        </div>
    );
}
