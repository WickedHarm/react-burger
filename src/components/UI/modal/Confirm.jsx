import React from "react";

import Button from "../Button/Button";

const Confirm = (props) => {
    return (
        <div>
            <h3>Are you sure to delete your order history?</h3>
            <Button btnType="Danger" orderHandler={props.showModalHandler}>Nope</Button>
            <Button btnType="Success" orderHandler={props.onClear}>Yep</Button>
        </div>
        
    )
}

export default Confirm;