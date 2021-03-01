import React from 'react';
import {NavLink} from 'react-router-dom';
import Icons from './Icons';
import Button from "./Button";
import Cookies from 'universal-cookie';

const styles = {
    wrapper: 'text-gray-600 body-font bg-blue-200',
    header: 'container mx-auto flex flex-wrap flex-col md:flex-row py-6 px-2 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 items-center',
    navBar: 'md:ml-auto flex flex-wrap items-center text-base justify-center',
    navLink: 'select-none font-medium transition transform duration-300 mr-5 text-blue-700 hover:text-blue-400',
    navLinkActive: 'border-b border-gray-400',
    navLinkTitle: 'flex title-font font-medium items-center text-blue-700 mb-4 md:mb-0 space-x-1',
    title: 'select-none text-3xl',
    icon: 'text-3xl',
    helloUser: 'font-semibold text-blue-800'
}

class Header extends React.Component {
    state = {
        isLogged: false,
        userName: '',
    }

    logOut = () => {
        const cookies = new Cookies();
        try {
            this.setState({isLogged: false, userName: ''});
            let user = cookies.get('loggedUser');
            cookies.remove('loggedUser');
            cookies.remove('jwt');
            cookies.remove('loggedAt');
            cookies.remove('expiresIn');
            user.slice(0, user.indexOf('@'));
            this.props.showFlash(`Goodbye ${user} - logging out`);
        } catch (err) {
            this.props.showFlash(err.message, 'error');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isHeaderToRefresh} = this.props;
        if(isHeaderToRefresh === true && prevProps.isHeaderToRefresh === false){
            this.props.headerRefreshed();
            this.updateLoggingData();
        }
    }

    updateLoggingData = () => {
        const cookies = new Cookies();
        const token = cookies.get('jwt');
        const userName = cookies.get('loggedUser');
        if (token && userName) {
            this.setState({isLogged: true, userName: userName.slice(0, userName.indexOf('@'))});
        }
    }

    componentDidMount() {
        this.updateLoggingData();
    }

    render() {
        const {isLogged, userName} = this.state;

        return (
            <header className={styles.wrapper}>
                <div className={styles.header}>
                    <a className={styles.navLinkTitle} href="/">
                        <span className={styles.icon}>{Icons.globe}</span>
                        <span className={styles.title}>Geobase</span>
                    </a>
                    <nav className={styles.navBar}>
                        <NavLink exact
                                 className={styles.navLink}
                                 activeClassName={styles.navLinkActive}
                                 to="/">Content
                        </NavLink>
                        <NavLink className={styles.navLink}
                                 activeClassName={styles.navLinkActive}
                                 to="/description">Description
                        </NavLink>
                        {isLogged ? (
                            <Button onClick={this.logOut}>{`Logout ${userName}`}</Button>
                        ) : (
                            <NavLink className={styles.navLink}
                                     activeClassName={styles.navLinkActive}
                                     to="/login">Login
                            </NavLink>
                        )
                        }
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;