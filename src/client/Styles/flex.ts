import styled from "styled-components";

interface FlexContainerProps {
    css?: any;
    space?: string;
}
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    ${({ css }: FlexContainerProps) => (css ? css : null)}
    > * {
        margin-right: ${({ space }: FlexContainerProps) =>
            space ? space : "inherit"};
    }
    > *:last-child {
        margin-right: ${({ space }: FlexContainerProps) =>
            space ? "inherit" : "auto"};
    }
`;
