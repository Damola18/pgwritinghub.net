import React, { useState } from 'react'
import styled from 'styled-components'

const SearchBar = ({submitSearch}) => {
    const [term, setTerm] = useState("")    
    
    let closingTimer
    let closingInterval = 1500
    
    const handleSearch = () => {
        clearTimeout(closingTimer)
        closingTimer = setTimeout(() => {
            
            submitSearch(term)
        }, closingInterval);
    }
    
    const handleTyping = () => {
        clearTimeout(closingTimer)
    }
  return (
      <SearchContainer onSubmit={() => submitSearch(term)}>
          <input type="search" value={term} placeholder="Search keyword" onChange={(e) => {setTerm(e.target.value); handleSearch()}} onClick={handleSearch} onBlur={handleSearch} onKeyDown={handleTyping} onKeyUp={handleSearch} />
      </SearchContainer>
  )
}

export default SearchBar

const SearchContainer = styled.form`
    input {
        padding: 10px;
        min-width: 200px;
        border-radius: 10px;
        border: 1px solid #213F7D62;
        margin: 10px 0px;
    }
`