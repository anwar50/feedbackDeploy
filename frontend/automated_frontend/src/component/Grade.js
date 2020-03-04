import React from "react";
import image from "../images/GradeMechanism.PNG"
class Grade extends React.Component {
    render()
    {console.log(image)
        return(
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={image} alt="Smiley face" width="800" height="400" />
            </div>
        )
    }
}

export default Grade