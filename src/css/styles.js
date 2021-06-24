import styled, { keyframes} from 'styled-components'

export const Main = styled.main`
    background: #aa00ff;
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Logo = styled.svg`
    max-height: 150px;
    margin-top: 50px;

    animation: ${rotate} infinite 20s linear;

    path {
        fill: white;
    }
`;

export const Title = styled.h1`
    font-family: 'Vollkorn', serif;
    color: white;
    margin-top: 15px;
`;

export const Country = styled.h1`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.6em;
    align-self: center;
    text-align: center;
    color: white;
    margin-top: 10px;
`;

export const Info = styled.p`
    font-family: 'IBM Plex Sans', sans-serif;
    align-self: center;
    text-align: center;
    font-size: 17px;
    span {
        font-size: 18px;
    }
    color: white;
`;

export const Flag = styled.img`
    display: block;
    margin: 0 auto;
    text-align: center;
    align-self: center;
    justify-self: center;
    border-radius: 10px;
    border: 1px solid white;
    max-width: 150px;
`;

export const Separator = styled.p`
    height: 5px
`