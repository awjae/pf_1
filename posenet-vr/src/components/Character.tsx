import React from 'react'
import styled from '@emotion/styled'

function Character() {
  return (
    <CharacterDiv></CharacterDiv>
  )
}

export default Character

const CharacterDiv = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 10px;
    background-color: #21bd9b;
    margin: 0px 20px;
`