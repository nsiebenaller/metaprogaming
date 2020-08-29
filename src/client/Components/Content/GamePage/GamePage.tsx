import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Params {
    game?: string;
}
interface Props extends RouteComponentProps<Params> {
    selectedDivision: string;
}
export default function GamePage({ selectedDivision, history, match }: Props) {
    const redirect = () => history.push("/");

    const { game } = match.params;

    return (
        <div>
            <div onClick={redirect}>Back</div>
            <h1>{selectedDivision}</h1>
            <h4>{game}</h4>
            <div className="bracket-container">
                <div className="bracket">
                    <div className="bracket-left" />
                    <div className="bracket-right" />
                </div>
            </div>
        </div>
    );
}
