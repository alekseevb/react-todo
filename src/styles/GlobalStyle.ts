import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: 'Kanit', Arial;
    font-weight: 500;
    color: #252525;
  }
`
export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

export const Box = styled.div`
	width: 750px;
`
