import { Button, command, TextField } from "ebrap-ui";
import React from "react";

interface Props {
    index: number;
    component: PageComponent;
    changeComponent: (idx: number, value: string) => void;
    removeComponent: (idx: number) => void;
}
export default function BracketManager(props: Props) {
    const [numberTeams, setNumberTeams] = React.useState<string>("6");
    const isNew = isNewBracket(props.component);

    const createBracket = async () => {
        let numTeams = parseInt(numberTeams);
        if (isNaN(numTeams)) {
            return await command.alert("Invalid number of teams!");
        }

        // Create *that* many slots
        const bracket = generate(numTeams);
        const pageContent = JSON.stringify(bracket);

        // Set new Page Component in state
        props.changeComponent(props.index, pageContent);
    };
    const removeComponent = () => props.removeComponent(props.index);

    if (isNew) {
        return (
            <div>
                <h4>Let's make your bracket!</h4>
                <TextField
                    label={"Number of Teams"}
                    type={"number"}
                    value={numberTeams}
                    onChange={setNumberTeams}
                />
                <Button onClick={createBracket}>Generate</Button>
                <Button onClick={removeComponent}>Remove</Button>
                <hr />
            </div>
        );
    }

    const bracket = JSON.parse(props.component.content);
    const updateTeamName = (slot: string, teamIndex: number, value: string) => {
        bracket[slot][teamIndex] = value;
        const pageContent = JSON.stringify(bracket);
        props.changeComponent(props.index, pageContent);
    };

    return (
        <div>
            <h4>Manage Bracket</h4>
            <div className={"row"}>
                {Object.keys(bracket).map((slot: string, slotIndex: number) => (
                    <div
                        className={"col justify-content-center"}
                        key={`${slotIndex}`}
                    >
                        {bracket[slot].map(
                            (team: string, teamIndex: number) => (
                                <React.Fragment
                                    key={`${slotIndex}-${teamIndex}`}
                                >
                                    <TextField
                                        value={team}
                                        placeholder={"Team Name"}
                                        onChange={(val) =>
                                            updateTeamName(slot, teamIndex, val)
                                        }
                                    />
                                    {teamIndex % 2 === 1 && (
                                        <hr className={"spacer"} />
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </div>
                ))}
            </div>
            <Button onClick={removeComponent}>Remove</Button>
            <hr />
        </div>
    );
}

function isNewBracket(component: PageComponent) {
    try {
        const data = JSON.parse(component.content);
        if (data.new) {
            return true;
        }
        return false;
    } catch (err) {
        console.log("ERROR PARSING JSON");
        return true;
    }
}

function generate(numTeams: number, bracket: any = {}, index: number = 1): any {
    // Check if even, Add 1 if necessary
    if (numTeams !== 1 && numTeams % 2 === 1) {
        numTeams++;
    }

    const key = `slot-${index}`;
    bracket[key] = [];

    // Seed next slot
    for (let i = 0; i < numTeams; i++) {
        bracket[key].push("");
    }

    // Return if end of bracket
    if (numTeams === 1) {
        return bracket;
    }
    const half = Math.ceil(numTeams / 2);
    const nextIndex = index + 1;
    return generate(half, bracket, nextIndex);
}
