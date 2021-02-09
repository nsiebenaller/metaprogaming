import { Button, command, TextArea, TextField, Checkbox } from "ebrap-ui";
import React from "react";
import {
    addPageComponent,
    deletePage,
    deletePageComponent,
    fetchPages,
    updatePage,
    updatePageComponent,
} from "../../../../Api";
import { connectContext, connectRouter } from "../../../../Store/Store";
import BracketManager from "./BracketManager";
import NewPageForm from "./NewPageForm";
import PageList from "./PageList";

interface Props {
    pageId?: number;
    isNewPage?: boolean;
}
const newTwitchStream: PageComponent = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    PageId: -1,
    content: "",
    type: "TWITCH_STREAM",
};
const newBracketConfig = {
    version: "v1",
    data: [{ header: "", rows: [] }],
};
const newBracket: PageComponent = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    PageId: -1,
    content: JSON.stringify(newBracketConfig),
    type: "BRACKET",
};
export default function AdminPagePage({ pageId, isNewPage }: Props) {
    const context = connectContext();
    const router = connectRouter()!;
    const [page, setPage] = React.useState<Page | undefined>();

    React.useEffect(() => {
        if (!pageId) return;
        const p = context.pages.find((x) => x.id === pageId);
        if (p) setPage(p);
    }, [pageId]);
    const navCreatePage = () => {
        router.navigate("/Admin/Page/new");
    };
    const navEditPage = (id: number) => {
        router.navigate(`/Admin/Page/${id}`);
    };
    const handleSavePage = async () => {
        if (!page) return;
        await updatePage(page);

        const components = page.components || [];
        if (components.length > 0) {
            const promises = new Array<Promise<any>>();
            components.forEach((c) => {
                if (c.id === -1) {
                    promises.push(addPageComponent({ ...c, PageId: page.id }));
                } else {
                    promises.push(updatePageComponent(c));
                }
            });
            await Promise.all(promises);
        }
        const pages = await fetchPages();
        const p = pages.find((x) => x.id === pageId);
        setPage(p);
        context.setContext({ pages: pages });
        await command.alert("Saved!");
    };
    const handleDeletePage = async () => {
        if (!page) return;
        await deletePage(page.id);
        const data = await fetchPages();
        context.setContext({ pages: data });
        router.navigate(`/Admin/Page`);
    };
    const handleAddComponent = (type: string) => {
        if (!page) return;

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
        const components = page.components || [];
        components.push(newComponent);
        setPage({ ...page, components });
    };
    const handleRemoveComponent = async (index: number) => {
        if (!page) return;
        const components = page.components || [];
        const component = components.find((_, idx) => idx === index);
        if (!component) return;
        setPage({
            ...page,
            components: components.filter((_, idx) => idx !== index),
        });
        await deletePageComponent(component.id);
    };
    const handleChangeComponent = (index: number, value: string) => {
        if (!page) return;
        const components = page?.components || [];
        setPage({
            ...page,
            components: components.map((c, idx) =>
                idx === index ? { ...c, content: value } : c
            ),
        });
    };

    if (isNewPage) {
        return <NewPageForm />;
    }

    if (!pageId) {
        return (
            <div>
                <h2>Manage Pages</h2>
                <PageList
                    pages={context.pages}
                    navCreatePage={navCreatePage}
                    navEditPage={navEditPage}
                />
            </div>
        );
    }

    if (!page) return null;
    return (
        <div>
            <h2>Manage Page: {page.name}</h2>
            <div className={"flex-row align-items-center"}>
                <TextField
                    label={"Name"}
                    value={page?.name || ""}
                    onChange={(name: string) => setPage({ ...page, name })}
                />
                <Checkbox
                    value={!!page.hidden}
                    label={"Hidden"}
                    color={"blue"}
                    onChange={() => setPage({ ...page, hidden: !page.hidden })}
                />
            </div>
            <br />
            <div className={"page-content-input"}>
                <TextArea
                    label={"Content"}
                    value={page?.content || ""}
                    onChange={(content: string) =>
                        setPage({ ...page, content })
                    }
                />
            </div>
            <div>
                {page.components &&
                    page.components.map((component, idx) => {
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
                            const bracketConfig = JSON.parse(component.content);

                            if (bracketConfig.version === "v1") {
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
                            } else {
                                return (
                                    <OldBracket
                                        key={idx}
                                        component={component}
                                        removeComponent={() =>
                                            handleRemoveComponent(idx)
                                        }
                                    />
                                );
                            }
                        }
                        return null;
                    })}
            </div>
            <br />
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
            <br />
            <div className={"flex-row --right-pad-10"}>
                <Button onClick={handleSavePage}>Save</Button>
                <Button onClick={handleDeletePage}>delete</Button>
            </div>
        </div>
    );
}

function OldBracket(props: any) {
    const bracket = JSON.parse(props.component.content);
    return (
        <div>
            {Object.keys(bracket).map((slot: string, slotIndex: number) => (
                <div
                    className={"col justify-content-center"}
                    key={`${slotIndex}`}
                >
                    {bracket[slot].map((team: string, teamIndex: number) => (
                        <React.Fragment key={`${slotIndex}-${teamIndex}`}>
                            <div className={"page-bracket-team"}>{team}</div>
                            {teamIndex % 2 === 1 && <hr className={"spacer"} />}
                        </React.Fragment>
                    ))}
                </div>
            ))}
            <br />
            <button className={"sm-btn"} onClick={props.removeComponent}>
                Delete Bracket
            </button>
        </div>
    );
}
