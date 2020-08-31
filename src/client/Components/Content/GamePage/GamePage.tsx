import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MatchItem from "./MatchItem";
import { Match } from "../../../types/types";
import { matches } from "../../../static/index";

interface Params {
    game?: string;
}
interface Props extends RouteComponentProps<Params> {
    selectedDivision: string;
}
export default function GamePage({ selectedDivision, history, match }: Props) {
    const redirect = () => history.push("/");
    const { game } = match.params;

    const [matchList, setMatchList] = useState<Array<Match>>([]);
    useEffect(() => {
        setMatchList(matches);
    }, []);

    return (
        <div className={"game-page"}>
            <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={redirect}
            >
                Back
            </Button>
            <div className={"game-title"}>{game}</div>
            <div className={"game-division"}>{selectedDivision}</div>
            {/*<!-- -->*/}
            <div className={"match-title"}>MATCH SCHEDULE</div>
            <div className={"match-list"}>
                {matchList.map((match, idx) => (
                    <MatchItem key={idx} match={match} />
                ))}
            </div>
        </div>
    );
}
