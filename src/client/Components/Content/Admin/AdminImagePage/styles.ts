import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    > * {
        margin-right: 5px;
    }
    > *:last-child {
        margin-right: 0;
    }
`;
