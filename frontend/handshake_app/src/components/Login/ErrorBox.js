import React from "react";

export default function ErrorBox(props) {
    let errorBox = <div class="alert alert-danger alert-dismissible show">
                    <strong> {props.message} </strong> 
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                 </div> 
                
    return( errorBox );
}