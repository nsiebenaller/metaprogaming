import { connectContext } from "@Store";
import { MatchProps } from "client/Store/Types";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

export default function index(props: RouteComponentProps<MatchProps>) {
    const { pageId } = props.match.params;
    const { pages, selectedPage, setContext } = connectContext();
    React.useEffect(() => {
        if (!pageId) return;
        const p = pages.find((x) => x.id === parseInt(pageId));
        setContext({ selectedPage: p, selectedGame: undefined });
    }, [pageId, pages]);
    if (!selectedPage) return null;

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: selectedPage.content }} />
            {selectedPage.components?.map((pageComponent, idx) => {
                if (pageComponent.type === "TWITCH_STREAM") {
                    return (
                        <TwitchStream
                            key={pageComponent.id}
                            pageComponent={pageComponent}
                        />
                    );
                } else if (pageComponent.type === "BRACKET") {
                    return (
                        <Bracket
                            key={pageComponent.id}
                            pageComponent={pageComponent}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
}

interface TwitchStreamProps {
    pageComponent: PageComponent;
}
function TwitchStream({ pageComponent }: TwitchStreamProps) {
    if (pageComponent.type !== "TWITCH_STREAM") return null;

    React.useEffect(() => {
        // Clear all existing Twitch Streams
        const hook = document.getElementById(
            `stream-${pageComponent.content}-${pageComponent.id}`
        );
        if (!hook) return;
        while (hook.firstChild) {
            hook.removeChild(hook.firstChild);
        }

        // Mount new Twitch Streams
        new Twitch.Embed(
            `stream-${pageComponent.content}-${pageComponent.id}`,
            {
                width: 854,
                height: 480,
                channel: pageComponent.content,
            }
        );
    }, [pageComponent]);

    return (
        <div
            className={"stream-container"}
            key={`stream-${pageComponent.content}-${pageComponent.id}`}
            id={`stream-${pageComponent.content}-${pageComponent.id}`}
        />
    );
}

interface BracketProps {
    pageComponent: PageComponent;
}
function Bracket({ pageComponent }: BracketProps) {
    const bracket = JSON.parse(pageComponent.content);
    console.log(bracket);

    return (
        <div className={"col"}>
            {bracket.version === "v1" && (
                <>
                    <div className={"row"}>
                        {bracket.data.map(
                            (column: any, columnIndex: number) => (
                                <div
                                    key={columnIndex}
                                    className={"page-bracket-header"}
                                    dangerouslySetInnerHTML={{
                                        __html: column.header,
                                    }}
                                />
                            )
                        )}
                    </div>
                    <div className={"row"}>
                        {bracket.data.map(
                            (column: any, columnIndex: number) => {
                                return (
                                    <div className={"col"} key={columnIndex}>
                                        {column.rows.map(
                                            (row: any, rowIndex: number) => {
                                                if (row.type === "SPACE") {
                                                    return (
                                                        <hr
                                                            key={`${columnIndex}-${rowIndex}`}
                                                            className={"spacer"}
                                                        />
                                                    );
                                                }
                                                if (row.type === "TEAM") {
                                                    return (
                                                        <div
                                                            key={`${columnIndex}-${rowIndex}`}
                                                            className={
                                                                "page-bracket-team"
                                                            }
                                                        >
                                                            {row.content}
                                                        </div>
                                                    );
                                                }
                                                if (row.type === "TEXT") {
                                                    return (
                                                        <div
                                                            key={`${columnIndex}-${rowIndex}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    row.content,
                                                            }}
                                                        />
                                                    );
                                                }
                                                return null;
                                            }
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </>
            )}
            {bracket.version !== "v1" &&
                Object.keys(bracket).map((slot: string, slotIndex: number) => (
                    <div
                        className={"col justify-content-center"}
                        key={`${slotIndex}`}
                    >
                        {bracket[slot].map(
                            (team: string, teamIndex: number) => (
                                <React.Fragment
                                    key={`${slotIndex}-${teamIndex}`}
                                >
                                    <div className={"page-bracket-team"}>
                                        {team}
                                    </div>
                                    {teamIndex % 2 === 1 && (
                                        <hr className={"spacer"} />
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </div>
                ))}
        </div>
    );
}
