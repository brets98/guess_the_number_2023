import React from "react";
import { BsCircle, BsFillXCircleFill } from "react-icons/bs";

const Infopopup = (pro) => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={pro.handleClose}></span>
                <>
                    <b>Game rules</b>
                    <p>
                        Guess a 4 digit number and will recive an hint. If you see a lot of{" "}
                        <BsFillXCircleFill /> then you are very luky, indeed for each of{" "}
                        <BsFillXCircleFill /> there is a number in the right position. But
                        if you see <BsCircle /> then you are on the right path becausee that
                        means that you have found the right number but in the wrong
                        position.
                    </p>
                </>
            </div>
        </div>
    );
};

export default Infopopup;
