import React from 'react';
import '../../index.css';
import './Imageform.css';
const ImagelinkForm = ({ onInputChange, onButtonSubmit, Keypress }) => {
    return (

        <div style={{ display: "flex", justifyContent: "center" }}>

            <form className="shadow-5 pa3 br3" style={{ display: "flex", justifyContent: "center", width: "400px", marginLeft: "10px", marginRight: "10px" }}>
                <input style={{
                    backgroundColor: "#fff", boxShadow: "inset 1px 2px 8px rgba(0,0,0,0.07)", fontFamily: "inherit", fontSize: "1em", width: "70%",
                    lineHeight: "1.45", borderRadius: "4px", padding: "0.6em 1.45em 0.7em", border: "1px solid #d1d1d1", color: "#525865", outline: "none", transition: ".18s"
                }}
                    type="url" placeholder="Paste the link here"
                    onChange={onInputChange}
                />
                <button type="button" className="tc grow pointer bg-light-purple white"
                    style={{ padding: "0.4em 1.40em 0.4em", borderRadius: "4px", outline: "none", border: "0px solid black" }}
                    onClick={onButtonSubmit} onKeyPress={Keypress}
                >Detect</button>
            </form>
        </div>
    );
}
export default ImagelinkForm;