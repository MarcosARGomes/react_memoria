import styled from "styled-components";

type ContainerProps = {
    showBackground: Boolean;
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBackground === true ? '#1550FF' : '#E2E3E3'};
    height: 100px;
    width: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

type IconProps = {
    opacity?:number;
}

export const Icon = styled.img<IconProps>`
    width: 100px;
    height: 60px;
    opacity: ${props => props.opacity ? props.opacity : 1};
`;