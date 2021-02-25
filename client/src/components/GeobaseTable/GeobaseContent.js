import React from 'react';
import Cookies from 'universal-cookie';

import axios from "axios";
import {GeobaseApi} from "../../app.config";

import Icons from "../Icons";

import Button from "../Button";
import Input from "../Input";
import Select from "./Select";
import Table from "./Table";
import Pagination from "./Pagination";

const styles = {
    wrapper: 'mx-auto px-2 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 py-2 md:py-8',
    title: 'text-2xl font-semibold leading-tight',
    filterBarWrapper: 'my-2 flex sm:flex-row flex-col',
    filterBar: 'flex flex-row mb-1 sm:mb-0',


    header: 'grid grid-cols-10 gap-2 border-b border-blue-200 py-2',
    headerItem: 'rounded font-semibold hover:font-bold cursor-default',
    paginationSection: 'flex space-x-2 my-5 justify-center'
}

class GeobaseContent extends React.Component {

    //<editor-fold desc="ContentTable state + methods">
    state = {
        geolocations: [],
        perPage: 5,
        offset: 0,
        count: 0,
        countAll: 0,
        orderBy: 0,
        sortBy: '',
        lastSortingColumn: '',
        filters: [],
        filter: '',
        filterValue: ''
    }


    handleChange = (e) => {
        // console.log({[e.target.id]: e.target.value});
        this.setState({[e.target.id]: e.target.value});
    }

    updateFilters = (e) => {
        e.preventDefault();
        const {offset, perPage, sortBy, orderBy, filter, filterValue} = this.state;
        this.getData(offset, perPage, sortBy, orderBy, filter, filterValue);
    }

    handlePerPageAndUpdate = (e) => {
        const cookies = new Cookies();
        cookies.set('perPage', e.target.value);
        this.setState({perPage: e.target.value});
        const {offset, sortBy, orderBy, filter, filterValue} = this.state
        this.getData(offset, e.target.value, sortBy, orderBy, filter, filterValue);
    }

    handleNextPage = (e) => {
        const {perPage, sortBy, orderBy, filter, filterValue} = this.state
        let offset = this.state.offset;
        offset += perPage;
        if (offset < this.state.countAll) {
            this.setState({offset: offset});
            this.getData(offset, perPage, sortBy, orderBy, filter, filterValue);
        }
    }

    handlePrevPage = (e) => {
        const {perPage, sortBy, orderBy, filter, filterValue} = this.state
        let offset = this.state.offset;
        offset -= perPage;
        if (offset >= 0) {
            this.setState({offset: offset});
            this.getData(offset, perPage, sortBy, orderBy, filter, filterValue);
        }
    }

    handlePerPage = (e) => {
        const {offset, perPage, sortBy, orderBy, filter, filterValue} = this.state
        const cookies = new Cookies();
        cookies.set('perPage', this.state.perPage);
        this.getData(offset, perPage, sortBy, orderBy, filter, filterValue);
    }

    handleSort = (e) => {
        const sortBy = e.target.id;
        this.setState({sortBy: sortBy});
        let lastSortingColumn = this.state.lastSortingColumn;
        let orderBy;
        if (lastSortingColumn === sortBy) {
            orderBy = 'asc';
            this.setState({lastSortingColumn: ''})
        } else {
            orderBy = 'desc';
            this.setState({lastSortingColumn: sortBy});
        }
        const {offset, perPage, filter, filterValue} = this.state;
        this.getData(offset, perPage, sortBy, orderBy, filter, filterValue);
    }

    getData = (offset, perPage, sortBy, orderBy, filter, filterValue) => {
        let url = GeobaseApi.URI.concat(
            "?offset=", offset,
            "&per_page=", perPage,
            "&sort_by=", sortBy,
            "&order_by=", orderBy);

        if(filter !== 'none' && filterValue){
            url = url.concat("&", filter, "=", filterValue);
        }

        axios.get(url).then(res => {
            this.setState({...res.data});
        }).catch(err => {
            this.props.showFlash(err.message, 'error');
        })
    }

    componentDidMount() {
        const cookies = new Cookies();
        axios.get(GeobaseApi.URI).then(res => {
            if (cookies.get('perPage')) {
                res.data.perPage = parseInt(cookies.get('perPage'));
            }
            this.setState({...res.data});
            let filters = ['none'];
            Object.keys(res.data.geolocations[0]).forEach(key => {
                if (key !== '__v' && key !== '_id')
                    filters.push(key);
            });
            this.setState({filters: filters});
        }).catch(err => {
            this.props.showFlash(err.message, 'error');
        });
    }

    //</editor-fold>

    render() {
        let page = (this.state.offset / this.state.perPage) + 1;
        let allPages = Math.ceil(parseInt(this.state.countAll) / parseInt(this.state.perPage));
        let visibleElements = parseInt(page * this.state.perPage > this.state.countAll
            ? this.state.countAll
            : page * this.state.perPage);
        let elements = parseInt(this.state.countAll);
        let filteredElements = parseInt(this.state.count);

        const pagination = {
            page,
            allPages,
            visibleElements,
            elements,
            filteredElements,
            handleNextPage: this.handleNextPage,
            handlePrevPage: this.handlePrevPage
        }

        return (
            <>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Geolocations</h2>
                    <div className={styles.filterBarWrapper}>
                        <form onSubmit={this.updateFilters} className={styles.filterBar}>
                            <Select id={"perPage"} items={[5, 15, 25]} onChange={this.handlePerPageAndUpdate}/>
                            <Select id={"filter"} items={this.state.filters} onChange={this.handleChange}/>
                            <Input icon={Icons.search} onChange={this.handleChange} id={'filterValue'}
                                   styleMode={"search"} placeholder="Search"/>
                            <Button styleMode={"cancel"}>Ok</Button>
                        </form>
                    </div>
                    <Table filters={this.state.filters} items={this.state.geolocations}
                           handleSort={this.handleSort}/>
                    <Pagination {...pagination}/>
                </div>
            </>
        )
    }

}

export default GeobaseContent;