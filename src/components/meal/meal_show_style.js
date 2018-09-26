import styled from "styled-components";

export const MealHeader = styled.div `
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: relative;
`;

export const HeaderTitle = styled.h1 `
    margin-left: 10px;
`;

export const HeaderMenu = styled.div `
    font-size: 10px;
    display: flex;
`;

export const Span = styled.span `
    display:flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-right: 30px;
`;

export const MealBody = styled.div `
    display: flex;
    width: 100%;
    position: relative;
`;

export const LeftPanel = styled.div `
    min-height: 100%;
    width: 41%;
    padding: 10px;
    position: relative;
`;

export const ImageContainer = styled.div `
    width: 612px;
    height: 366px;
    margin-bottom: 12px;
    border-radius: 5px;
    border: 1px solid cornflowerblue;
`;

export const  Image = styled.img `
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;

export const RightPanel = styled.div `
    min-height: 100%;
    width: 59%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding 10px;
`;

export const RightPanelBottom = styled.div `
    display: flex;
    position: relative;
    height: 100%;
`;