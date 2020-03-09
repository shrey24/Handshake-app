import React, { Fragment } from 'react'
import spinner from './images/spinner.gif';
const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner}
            style = {{width: '200px', margin:'auto', display:'block'}}
            alt='loading...'>
            </img>
        </Fragment>
    )
}

export default Spinner;
