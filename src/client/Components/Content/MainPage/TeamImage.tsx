import React, { useState, useEffect } from "react";
import { Team } from "../../../types/types";
import Card from "@material-ui/core/Card";

interface Props {
    team: Team;
}
export default function TeamImage({ team }: Props) {
    const [img, setImg] = useState<string>();

    useEffect(() => {
        fetch(team.image)
            .then((x) => x.blob())
            .then((x) => setImg(URL.createObjectURL(x)));
    }, [team]);

    if (!img) return null;
    return (
        <Card className={"team"}>
            <img className={"img"} src={img} />
            <div className={"name"}>{team.name}</div>
        </Card>
    );

    return <div></div>;
}
