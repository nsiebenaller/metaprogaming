import { Button, command, TextArea, TextField, Checkbox } from "ebrap-ui";
import React from "react";
import {
    createPage,
    deletePage,
    fetchPages,
    updatePage,
} from "../../../../Api";
import { connectContext, connectRouter } from "../../../Context";
import PageList from "./PageList";

const initNewPage: Page = {
    id: -1,
    name: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    hidden: true,
};
interface Props {
    pageId?: number;
    isNewPage?: boolean;
}
export default function AdminPagePage({ pageId, isNewPage }: Props) {
    const context = connectContext();
    const router = connectRouter()!;
    const [page, setPage] = React.useState<Page | undefined>();
    const [newPage, setNewPage] = React.useState<Page>(initNewPage);

    React.useEffect(() => {
        if (!pageId) return;
        const p = context.pages.find((x) => x.id === pageId);
        if (p) setPage(p);
    }, [pageId]);

    const navCreatePage = () => {
        router.history.push("/Admin/Page/new");
    };
    const navEditPage = (id: number) => {
        router.history.push(`/Admin/Page/${id}`);
    };
    const handleCreatePage = async () => {
        await createPage(newPage.name, newPage.content, !!newPage.hidden);
        const data = await fetchPages();
        context.setContext({ pages: data });
        router.history.push(`/Admin/Page`);
    };
    const handleSavePage = async () => {
        if (!page) return;
        await updatePage(page);
        const data = await fetchPages();
        context.setContext({ pages: data });
        await command.alert("Saved!");
    };
    const handleDeletePage = async () => {
        if (!page) return;
        await deletePage(page.id);
        const data = await fetchPages();
        context.setContext({ pages: data });
        router.history.push(`/Admin/Page`);
    };

    if (isNewPage) {
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
                        noResize
                    />
                </div>
                <Button onClick={handleCreatePage}>Create</Button>
            </div>
        );
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
                    noResize
                />
            </div>
            <div className={"flex-row --right-pad-10"}>
                <Button onClick={handleSavePage}>Save</Button>
                <Button onClick={handleDeletePage}>delete</Button>
            </div>
        </div>
    );
}
