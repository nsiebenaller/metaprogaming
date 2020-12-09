import { createTemplate, fetchTemplates } from "../../../../Api";
import { Button, command, TextField } from "ebrap-ui";
import React from "react";
import BracketElement from "./BracketElement";

interface Props {
    component: PageComponent;
    changeComponent: (value: string) => void;
    removeComponent: () => void;
}
function useBracketConfig(component: PageComponent): BracketConfig {
    const [content, setContent] = React.useState<BracketConfig>(
        JSON.parse(component.content)
    );
    React.useEffect(() => {
        setContent(JSON.parse(component.content));
    }, [component]);
    return content;
}
export default function BracketManager(props: Props) {
    const content = useBracketConfig(props.component);
    const removeComponent = async () => {
        const query = "Are you sure you'd like to delete this bracket?";
        const confirm = await command.confirm(query);
        if (confirm) props.removeComponent();
    };
    const saveAsTemplate = async () => {
        const templateName = await command.modal(CreateTemplateModal);
        if (templateName === null) return;
        const newTemplate: Template = {
            id: -1,
            createdAt: "",
            updatedAt: "",
            name: templateName,
            content: JSON.stringify(content),
        };
        const saveResp = await createTemplate(newTemplate);
        if (!saveResp.success) {
            return await command.alert("Error saving template");
        }
        command.snackbar("Template Saved!");
    };
    const loadFromTemplate = async () => {
        const template = await command.modal(LoadTemplateModal);
        if (!template) return;
        props.changeComponent(template.content);
    };

    return (
        <div className={"box-content margin-bot-10"}>
            <BracketEditor
                content={content}
                changeComponent={props.changeComponent}
            />
            <hr />
            <div className={"children--margin-right-10"}>
                <button className={"sm-btn"} onClick={removeComponent}>
                    Delete Bracket
                </button>
                <button className={"sm-btn"} onClick={saveAsTemplate}>
                    Save as Template
                </button>
                <button className={"sm-btn"} onClick={loadFromTemplate}>
                    Load from Template
                </button>
            </div>
        </div>
    );
}

interface BracketEditorProps {
    content: BracketConfig;
    changeComponent: (value: string) => void;
}
function BracketEditor(props: BracketEditorProps) {
    const { content, changeComponent } = props;
    const handleElementChange = (col: number, row: number, value: string) => {
        content.data[col].rows[row].content = value;
        changeComponent(JSON.stringify(content));
    };
    const addColumn = () => {
        content.data.push({ header: "", rows: [] });
        changeComponent(JSON.stringify(props.content));
    };
    const removeColumn = () => {
        if (content.data.length <= 1) return;
        content.data.pop();
        changeComponent(JSON.stringify(props.content));
    };

    console.log(content);

    return (
        <div className={"row"}>
            {content.data.map((col, key) => {
                const onHeaderChange = (value: string) => {
                    content.data[key].header = value;
                    changeComponent(JSON.stringify(content));
                };
                const onElementChange = (row: number, value: string) => {
                    handleElementChange(key, row, value);
                };
                const addElement = (type: BracketElementType) => {
                    content.data[key].rows.push({ type, content: "text" });
                    changeComponent(JSON.stringify(content));
                };
                const removeElement = () => {
                    content.data[key].rows.pop();
                    changeComponent(JSON.stringify(content));
                };

                return (
                    <div className={"col"} key={key}>
                        <HeaderElement
                            value={col.header}
                            onChange={onHeaderChange}
                        />
                        <BracketRowList
                            rows={col.rows}
                            handleElementChange={onElementChange}
                        />
                        <RowControls
                            column={col}
                            addElement={addElement}
                            removeElement={removeElement}
                        />
                    </div>
                );
            })}
            <ColumnControls
                addColumn={addColumn}
                removeColumn={removeColumn}
                disableRemove={content.data.length <= 1}
            />
        </div>
    );
}

interface BracketRowListProps {
    rows: Array<BracketElement>;
    handleElementChange: (rowIndex: number, value: string) => void;
}
function BracketRowList(props: BracketRowListProps) {
    const { rows, handleElementChange } = props;
    return (
        <>
            {rows.map((element: BracketElement, rowKey: number) => {
                const handleChange = (value: string) => {
                    handleElementChange(rowKey, value);
                };
                return (
                    <BracketElement
                        key={rowKey}
                        element={element}
                        handleChange={handleChange}
                    />
                );
            })}
        </>
    );
}

interface HeaderElementProps {
    value: string;
    onChange: (value: string) => void;
}
function HeaderElement(props: HeaderElementProps) {
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        props.onChange(e.currentTarget.textContent || "");
    };
    return React.useMemo(
        () => (
            <div
                className={"page-bracket-header"}
                dangerouslySetInnerHTML={{ __html: props.value }}
                onInput={handleInput}
                contentEditable
            />
        ),
        []
    );
}

interface ColumnControlsProps {
    addColumn: () => void;
    removeColumn: () => void;
    disableRemove: boolean;
}
function ColumnControls(props: ColumnControlsProps) {
    return (
        <div className={"children--margin-bot-10"}>
            <button className={"sm-btn"} onClick={props.addColumn}>
                Add Column
            </button>
            <br />
            <button
                className={"sm-btn"}
                onClick={props.removeColumn}
                disabled={props.disableRemove}
            >
                Remove Column
            </button>
        </div>
    );
}

interface RowControlsProps {
    column: BracketColumn;
    addElement: (type: BracketElementType) => void;
    removeElement: () => void;
}
function RowControls(props: RowControlsProps) {
    const addTeam = () => props.addElement("TEAM");
    const addSpace = () => props.addElement("SPACE");
    const addText = () => props.addElement("TEXT");

    const disabledRemove = props.column.rows.length === 0;
    return (
        <div className={"children--margin-top-10"}>
            <button className={"sm-btn"} onClick={addTeam}>
                Add Team
            </button>
            <br />
            <button className={"sm-btn"} onClick={addSpace}>
                Add Space
            </button>
            <br />
            <button className={"sm-btn"} onClick={addText}>
                Add Text
            </button>
            <br />
            <button
                className={"sm-btn"}
                onClick={props.removeElement}
                disabled={disabledRemove}
            >
                Remove
            </button>
        </div>
    );
}

function CreateTemplateModal(props: any) {
    const [templateName, setTemplateName] = React.useState<string>("");
    const save = () => props.drop(templateName);
    const cancel = () => props.drop(null);
    return (
        <div>
            <h2>Save Bracket as Template</h2>
            <TextField
                value={templateName}
                onChange={setTemplateName}
                placeholder={"Enter Template Name"}
                botPad
            />
            <br />
            <div className={"row children--margin-right-10"}>
                <Button color={"red"} variant={"outlined"} onClick={cancel}>
                    Cancel
                </Button>
                <Button
                    color={"blue"}
                    onClick={save}
                    disabled={templateName.length === 0}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

function LoadTemplateModal(props: any) {
    const [templates, setTemplates] = React.useState<Array<Template>>([]);
    const [id, setId] = React.useState<number>(-1);
    React.useEffect(() => {
        async function onMount() {
            setTemplates(await fetchTemplates());
        }
        onMount();
    }, []);
    const load = () => {
        if (id === -1) return props.drop(null);
        return props.drop(templates.find((x) => x.id === id));
    };
    const cancel = () => props.drop(null);
    return (
        <div>
            <h2>Load Template</h2>
            <p>This will overwrite any existing data</p>
            <div className={"col margin-bot-10 max-height-200"}>
                {templates.map((template, index) => (
                    <div
                        key={index}
                        className={`select-row ${
                            id === template.id ? "selected" : ""
                        }`}
                        onClick={() => setId(template.id)}
                    >
                        {template.name}
                    </div>
                ))}
                {templates.length === 0 && <em>no templates</em>}
            </div>
            <div className={"row children--margin-right-10"}>
                <Button color={"red"} variant={"outlined"} onClick={cancel}>
                    Cancel
                </Button>
                <Button color={"blue"} onClick={load}>
                    Load
                </Button>
            </div>
        </div>
    );
}
