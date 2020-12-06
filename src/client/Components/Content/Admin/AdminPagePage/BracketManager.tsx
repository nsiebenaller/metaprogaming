import { createTemplate, fetchTemplates } from "../../../../Api";
import { Button, command, TextField } from "ebrap-ui";
import React from "react";

interface Props {
    component: PageComponent;
    changeComponent: (value: string) => void;
    removeComponent: () => void;
}
function useBracketConfig(component: PageComponent): any {
    const [content, setContent] = React.useState(JSON.parse(component.content));
    React.useEffect(() => {
        setContent(JSON.parse(component.content));
    }, [component]);
    return content;
}
export default function BracketManager(props: Props) {
    const content = useBracketConfig(props.component);
    const removeComponent = async () => {
        const confirm = await command.confirm(
            "Are you sure you'd like to permanently delete this bracket?"
        );
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
            <div className={"row"}>
                {content.data.map((column: any, columnKey: number) => {
                    return (
                        <div className={"col"} key={columnKey}>
                            <HeaderElement
                                index={columnKey}
                                content={content}
                                changeComponent={props.changeComponent}
                            />
                            {column.rows.map((row: any, rowKey: number) => {
                                if (row.type === "SPACE") {
                                    return (
                                        <SpaceElement
                                            key={`${columnKey}-${rowKey}`}
                                        />
                                    );
                                }
                                if (row.type === "TEAM") {
                                    const handleChange = (value: string) => {
                                        content.data[columnKey].rows[
                                            rowKey
                                        ].content = value;
                                        props.changeComponent(
                                            JSON.stringify(content)
                                        );
                                    };
                                    return (
                                        <TeamElement
                                            key={`${columnKey}-${rowKey}`}
                                            value={row.content}
                                            onChange={handleChange}
                                        />
                                    );
                                }
                                if (row.type === "TEXT") {
                                    const handleChange = (value: string) => {
                                        content.data[columnKey].rows[
                                            rowKey
                                        ].content = value;
                                        props.changeComponent(
                                            JSON.stringify(content)
                                        );
                                    };
                                    return (
                                        <TextElement
                                            key={`${columnKey}-${rowKey}`}
                                            value={row.content}
                                            onChange={handleChange}
                                        />
                                    );
                                }
                                return null;
                            })}
                            <RowControls
                                index={columnKey}
                                content={content}
                                changeComponent={props.changeComponent}
                            />
                        </div>
                    );
                })}
                <ColumnControls
                    content={content}
                    changeComponent={props.changeComponent}
                />
            </div>
            <hr />
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
    );
}

interface HeaderElementProps {
    index: number;
    content: any;
    changeComponent: (value: string) => void;
}
function HeaderElement(props: HeaderElementProps) {
    const thisColumn = props.content.data[props.index];

    const handleChange = (value: string) => {
        props.content.data[props.index].header = value;
        props.changeComponent(JSON.stringify(props.content));
    };

    return (
        <TextField
            placeholder={"Header"}
            value={thisColumn.header}
            onChange={handleChange}
        />
    );
}

function SpaceElement() {
    return <hr className={"spacer"} />;
}
function TeamElement(props: any) {
    return (
        <TextField
            placeholder={"Team Name"}
            value={props.value}
            onChange={props.onChange}
        />
    );
}
function TextElement(props: any) {
    return (
        <TextField
            placeholder={"Text"}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

interface ColumnControlsProps {
    content: any;
    changeComponent: (value: string) => void;
}
function ColumnControls(props: ColumnControlsProps) {
    const addColumn = () => {
        props.content.data.push({ header: "", rows: [] });
        props.changeComponent(JSON.stringify(props.content));
    };
    const removeColumn = () => {
        if (props.content.data.length > 1) {
            props.content.data.pop();
            props.changeComponent(JSON.stringify(props.content));
        }
    };

    return (
        <div className={"children--margin-right-10"}>
            <button className={"sm-btn"} onClick={addColumn}>
                Add Column
            </button>
            <button
                className={"sm-btn"}
                onClick={removeColumn}
                disabled={props.content.data.length === 1}
            >
                Remove Column
            </button>
        </div>
    );
}

interface RowControlsProps {
    index: number;
    content: any;
    changeComponent: (value: string) => void;
}
function RowControls(props: RowControlsProps) {
    const thisColumn = props.content.data[props.index];

    const addRow = (type: string) => {
        thisColumn.rows.push({ type, content: "" });
        props.content.data[props.index] = thisColumn;
        props.changeComponent(JSON.stringify(props.content));
    };
    const addTeam = () => addRow("TEAM");
    const addSpace = () => addRow("SPACE");
    const addText = () => addRow("TEXT");
    const removeRow = () => {
        thisColumn.rows.pop();
        props.content.data[props.index] = thisColumn;
        props.changeComponent(JSON.stringify(props.content));
    };

    const disabledRemove = thisColumn.rows.length === 0;
    return (
        <div>
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
                onClick={removeRow}
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
