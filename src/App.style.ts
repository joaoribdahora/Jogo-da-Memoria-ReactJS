import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 750px;
    margin: auto;
    padding: 50px 0px;
    display: flex;

    @media(max-width: 750px){
        flex-direction: column;
    }
`;

export const InfoArea = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;


    @media(max-width: 750px){
        margin-bottom: 50px;
        align-items: center;
    }
`;

export const Logo = styled.div`
    width: 200px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    background-color: #1550FF;
`;

export const Infos = styled.div`
    width: 100%
    margin: 10px 0px;
    @media(max-width: 750px){
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const GridArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media(max-width: 750px){
        margin: 0px 20px;
        justify-content: center;
    }
`;

export const Grid = styled.div`
    width: 430px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media (max-width: 750px){
        grid-template-columns: repeat(3, 1fr);
    }
`;