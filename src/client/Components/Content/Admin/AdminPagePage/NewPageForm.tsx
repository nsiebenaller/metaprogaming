import { Button, Checkbox, command, TextArea, TextField } from "ebrap-ui";
import React from "react";
import { addPageComponent, createPage } from "../../../../Api";
import { connectContext } from "../../../../Store/Store";
import BracketManager from "./BracketManager";

const initNewPage: Page = {
    id: -1,
    name: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    hidden: true,
    components: [],
};
const newTwitchStream: PageComponent = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    PageId: -1,
    content: "",
    type: "TWITCH_STREAM",
};
const newBracketConfig: BracketConfig = {
    version: "v1",
    data: [{ header: "First Round", rows: [] }],
};
const newBracket: PageComponent = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    PageId: -1,
    content: JSON.stringify(newBracketConfig),
    type: "BRACKET",
};
export default function NewPageForm() {
    const context = connectContext();

    const [newPage, setNewPage] = React.useState<Page>(initNewPage);
    const handleAddComponent = (type: string) => {
        let newComponent = null;
        switch (type) {
            case "TWITCH_STREAM":
                newComponent = newTwitchStream;
                break;
            case "BRACKET":
                newComponent = newBracket;
                break;
            default:
                return;
        }
        const components = newPage.components || [];
        components.push(newComponent);
        setNewPage({ ...newPage, components });
    };
    const handleRemoveComponent = (index: number) => {
        const components = newPage.components || [];
        setNewPage({
            ...newPage,
            components: components.filter((_, idx) => idx !== index),
        });
    };
    const handleChangeComponent = (index: number, value: string) => {
        const components = newPage.components || [];
        setNewPage({
            ...newPage,
            components: components.map((c, idx) =>
                idx === index ? { ...c, content: value } : c
            ),
        });
    };
    const handleCreatePage = async () => {
        const response = await createPage(
            newPage.name,
            newPage.content,
            !!newPage.hidden
        );
        if (!response.success) {
            return await command.alert("Error creating page!");
        }
        const components = newPage.components || [];
        if (components.length > 0) {
            const promises = new Array<Promise<CreateResponse>>();
            components.forEach((c) => {
                promises.push(addPageComponent({ ...c, PageId: response.id }));
            });
            await Promise.all(promises);
        }
        context.loadPages();
        context.navigate(`/Admin/Page`);
    };

    return (
        <div>
            <h2>New Page</h2>
            <div className={"flex-row align-items-center"}>
                <TextField
                    label={"Name"}
                    value={newPage.name}
                    onChange={(name: string) =>
                        setNewPage({ ...newPage, name })
                    }
                />
                <Checkbox
                    value={!!newPage.hidden}
                    label={"Hidden"}
                    color={"blue"}
                    onChange={() =>
                        setNewPage({ ...newPage, hidden: !newPage.hidden })
                    }
                />
            </div>
            <br />
            <div className={"page-content-input"}>
                <TextArea
                    label={"Content"}
                    value={newPage.content}
                    onChange={(content: string) =>
                        setNewPage({ ...newPage, content })
                    }
                />
            </div>
            <div>
                {newPage.components &&
                    newPage.components.map((component, idx) => {
                        if (component.type === "TWITCH_STREAM") {
                            return (
                                <div key={idx}>
                                    <TextField
                                        placeholder={"Enter Twitch Channel"}
                                        value={component.content}
                                        onChange={(value) =>
                                            handleChangeComponent(idx, value)
                                        }
                                    />
                                    <Button
                                        onClick={() =>
                                            handleRemoveComponent(idx)
                                        }
                                    >
                                        Remove
                                    </Button>
                                    <br />
                                </div>
                            );
                        } else if (component.type === "BRACKET") {
                            return (
                                <BracketManager
                                    key={idx}
                                    component={component}
                                    changeComponent={(value: string) =>
                                        handleChangeComponent(idx, value)
                                    }
                                    removeComponent={() =>
                                        handleRemoveComponent(idx)
                                    }
                                />
                            );
                        }
                        return null;
                    })}
            </div>
            <div className={"row children--margin-right-10"}>
                <Button
                    onClick={() => handleAddComponent("TWITCH_STREAM")}
                    botPad
                >
                    Add Twitch Stream
                </Button>
                <Button onClick={() => handleAddComponent("BRACKET")} botPad>
                    Add Bracket
                </Button>
            </div>
            <Button onClick={handleCreatePage} color={"blue"}>
                Create
            </Button>
        </div>
    );
}
