import React from "react";

class Well extends React.Component {
    render(props) {
        return (
            <div className="well" onClick={this.props.onClick}>
            
            {this.props.children}
            
            </div>
        )
    }
}

export default Well;