import './css/Search.css'

function Search({searchValue, setSearchValue}) {
    return (
        <input
            placeholder="Cortar Cebolla"
            className="TodoSearch"
            value={searchValue}
            onChange={(event)=> {
                setSearchValue(event.target.value)
            }}
        />
    );
}

export { Search };