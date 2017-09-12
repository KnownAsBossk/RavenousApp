import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
    constructor(){
        super();
        this.state={
            term:'',
            location:'',
            sortBy:'best_match'
        };
        this.sortByOptions={
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
        
        //bind this to methods
        this.getSortByClass=this.getSortByClass.bind(this);
        this.handleSortByChange=this.handleSortByChange.bind(this);
        this.handleTermChange=this.handleTermChange.bind(this);
        this.handleLocationChange=this.handleLocationChange.bind(this);
    }

    //取得sorting option 的class
    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption){
            return 'active';
        }else{
            return '';
        }
    }

    // 設定sort option state
    handleSortByChange(sortByOption){
        this.setState({
            sortBy:sortByOption
        })
    }

    handleTermChange(e){
        this.setState({term:e.target.value});
    }

    handleLocationChange(e){
        this.setState({location:e.target.value});
    }

    //把sort options render出來
    renderSortByOptions(sortByOptions) {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return <li  onClick={this.handleSortByChange(sortByOptionValue)}
                        className={this.getSortByClass(sortByOptionValue)}
                        key={sortByOptionValue}>{sortByOption}</li>
        });
    }

    // SearchBar component render出
    //1.search option
    //2.search term
    //3.search location
    //4.search button
    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions(this.sortByOptions)}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;


