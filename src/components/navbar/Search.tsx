import "./navbar.css"

const Search = () => {
  return (
    <div className="nav_search">
    <input
      name="search"
      type="text"
      className="nav_search_input"
      placeholder="Type..."
    />

    <div className="search_btn">
        <p>Search</p>
    </div>
  </div>
  )
}

export default Search