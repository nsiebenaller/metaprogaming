import styled from "styled-components";

type FlexDirection =
    | "column"
    | "column-reverse"
    | "row"
    | "row-reverse"
    | "inherit"
    | "initial"
    | "revert"
    | "unset";
interface FlexContainerProps {
    css?: any;
    space?: string;
    direction?: FlexDirection;
}
export const Row = styled.div`
    position: relative;
    display: flex;
    flex-direction: ${({ direction }: FlexContainerProps) =>
        direction ? direction : "row"};
    > * {
        margin-right: ${({ space }: FlexContainerProps) =>
            space ? space : "inherit"};
    }
    > *:last-child {
        margin-right: inherit;
    }
    ${({ css }: FlexContainerProps) => (css ? css : null)}
`;
