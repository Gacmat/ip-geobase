import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Icons from './Icons';
import Button from "./Button";
import AppContext from "../app.context";

const styles = {
    wrapper: 'text-gray-600 body-font bg-blue-200',
    header: 'container mx-auto flex flex-wrap flex-col md:flex-row py-6 px-2 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 items-center',
    navLink: 'select-none font-medium transition transform duration-300 mr-5 text-blue-700 hover:text-blue-400',
    navLinkActive: 'border-b border-gray-400',
    navLinkTitle: 'flex title-font font-medium items-center text-blue-700 mb-4 md:mb-0 space-x-1',
    title: 'select-none text-3xl',
    icon: 'text-3xl',
    helloUser: 'font-semibold text-blue-800'
}
const Header =({logOut}) =>{

        return (
            <AppContext.Consumer>
                {(context) => (
                    <header className={styles.wrapper}>
                        <div className={styles.header}>
                            <a className={styles.navLinkTitle} href="/">
                                <span className={styles.icon}>{Icons.globe}</span>
                                <span className={styles.title}>Geobase</span>
                            </a>
                            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                                <NavLink exact
                                         className={styles.navLink}
                                         activeClassName={styles.navLinkActive}
                                         to="/">Content
                                </NavLink>
                                <NavLink className={styles.navLink}
                                         activeClassName={styles.navLinkActive}
                                         to="/description">Description
                                </NavLink>
                                {context.isLogged ? (
                                    <Button onClick={()=>(logOut(this))}>{`Logout ${context.userName}`}</Button>
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
                )}
            </AppContext.Consumer>
        )

};

export default Header;