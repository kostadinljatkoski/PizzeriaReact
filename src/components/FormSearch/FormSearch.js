import React from 'react';

const formSearch = props => {

    const onSearch = e => {
        e.preventDefault();
        props.onSearch(e.target["term"].value);
    };

    return (
        <form className="form-inline mt-2 mt-md-0" onSubmit={onSearch}>
            <input className="form-control mr-sm-2" type="text" name="term"
                   placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
};

export default formSearch;