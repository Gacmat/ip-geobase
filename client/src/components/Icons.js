import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faAngleDown, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Icons = {
    globe: <FontAwesomeIcon icon={faGlobe}/>,
    arrowDown: <FontAwesomeIcon icon={faAngleDown}/>,
    search: <FontAwesomeIcon icon={faSearch}/>,
    loading: <span className="ml-2"><FontAwesomeIcon icon={faSpinner} spin/></span>
}

export default Icons;