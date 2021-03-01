import React from 'react';
import Cookies from 'universal-cookie';

import axios from "axios";
import {GeobaseApi} from "../../app.config";

import Icons from "../Icons";

import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import GeobaseTable from "./GeobaseTable";
import Pagination from "./Pagination";
import EditWindow from "../Form/EditWindow";
import GeobaseTableContext from "./GeobaseTable.context";
import IpInputForm from "../Form/IpInputForm";

const styles = {
    wrapper: 'mx-auto px-2 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 py-2 md:py-8',
    title: 'text-2xl font-semibold leading-tight',
    filterBarWrapper: 'my-2 flex sm:flex-row flex-col',
    filterBar: 'flex flex-row mb-1 sm:mb-0',


    header: 'grid grid-cols-10 gap-2 border-b border-blue-200 py-2',
    headerItem: 'rounded font-semibold hover:font-bold cursor-default',
    paginationSection: 'flex space-x-2 my-5 justify-center'
}

class GeobaseWrapper extends React.Component {

    //<editor-fold desc="ContentTable state + methods">
    state = {
        item: '',
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
        filterValue: '',
        isEditWindowOpen: false,
        needRefresh: false,
        openEditWindowToAddNewRecord: false
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


        if (filter !== 'none' && filterValue) {
            url = url.concat("&", filter, "=", filterValue);
        }
        axios.get(url).then(res => {
            this.setState({...res.data});
        }).catch(err => {
            this.props.showFlash(err.message, 'error');
        })
    }

    openEditWindow = (item, editOption) => {
        this.setState({ openEditWindowToAddNewRecord:editOption})
        this.setState({item: item, isEditWindowOpen:true});
    }

    closeEditWindow = () => {
        this.setState({isEditWindowOpen: false});
    }

    refreshContent = () => {
        this.setState({needRefresh:true});
    }

    handleDataReceive = () => {
        const cookies = new Cookies();
        axios.get(GeobaseApi.URI).then(res => {
            this.setState({...res.data});
            if (cookies.get('perPage')) {
                res.data.perPage = parseInt(cookies.get('perPage'));
            }
            let filters = [];
            Object.keys(res.data.geolocations[0]).forEach(key => {
                if (key !== '__v' && key !== '_id')
                    filters.push(key);
            });
            this.setState({filters: filters});
        }).catch(err => {
            this.props.showFlash(err.message + '. Server could not connect to database, try again later', 'error');
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.needRefresh === true){
            this.setState({needRefresh:false});
            this.handleDataReceive();
        }
    }

    componentDidMount() {
        this.handleDataReceive();
    }

    //</editor-fold>

    render() {
        let page = (this.state.offset / this.state.perPage) + 1;
        let elements = parseInt(this.state.countAll);
        let filteredElements = parseInt(this.state.count);
        let visibleElements = parseInt(page * this.state.perPage > this.state.countAll
            ? this.state.countAll
            : page * this.state.perPage);
        let allPages = Math.ceil(parseInt(this.state.count) / parseInt(this.state.perPage)) || 1;

        const pagination = {
            page,
            allPages,
            visibleElements,
            elements,
            filteredElements,
            handleNextPage: this.handleNextPage,
            handlePrevPage: this.handlePrevPage
        }

        const contextElements = {
            item: this.state.item,
            openEditWindow: this.openEditWindow,
            closeEditWindow: this.closeEditWindow,
            handleChange: this.handleChange,
            showFlash: this.props.showFlash,
            closeFlash: this.props.closeFlash,
            refreshContent: this.refreshContent,
        }

        let selectFilters = this.state.filters;

        return (
            <GeobaseTableContext.Provider value={contextElements}>
                <IpInputForm {...contextElements}/>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Geolocations</h2>
                    <div className={styles.filterBarWrapper}>
                        <form onSubmit={this.updateFilters} className={styles.filterBar}>
                            <Select id={"perPage"} items={[5, 15, 25]} onChange={this.handlePerPageAndUpdate}/>
                            <Select id={"filter"} items={selectFilters} onChange={this.handleChange}/>
                            <Input icon={Icons.search} onChange={this.handleChange} id={'filterValue'}
                                   styleMode={"search"} placeholder="Search"/>
                            <Button styleMode={"cancel"}>Ok</Button>
                        </form>
                    </div>
                    <GeobaseTable filters={this.state.filters} items={this.state.geolocations}
                                  handleSort={this.handleSort}/>
                    <Pagination {...pagination}/>
                </div>
                {this.state.isEditWindowOpen && <EditWindow addNew={this.state.openEditWindowToAddNewRecord} {...contextElements}/>}
            </GeobaseTableContext.Provider>
        )
    }

}

export default GeobaseWrapper;