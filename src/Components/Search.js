import React from 'react';

const Search = () => {
    return (
        <div className="container">
            <div className="md-form">
                <i className="fas fa-search prefix"></i>
                <input type="text" id="inputIconEx1" className="form-control" />
                <label for="inputIconEx1">Search For Jobs</label>
            </div>
        </div>
    );
}

export default Search;
