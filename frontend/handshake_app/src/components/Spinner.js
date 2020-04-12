import React, { Fragment } from 'react'
import spinner from './images/loading.gif';
const Spinner = () => {
    // width: '700px', height: '500px',
    return (
        <Fragment>
            <img src={spinner}
            style = {{ margin:'auto', display:'block'}}
            alt='loading...'>
            </img>
        </Fragment>
    )
}

export default Spinner;
