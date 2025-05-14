import React from 'react'

class SelectedNumbers extends React.Component {


    render() {
        return (
            <li className="list-group-item">
                {this.props.number}
                <button className="ms-5 btn btn-primary" onClick={this.props.onLockClick}>
                    {this.props.isLocked ? 'Unlock' : 'Lock'}</button>
            </li>
        )
    }
}
export default SelectedNumbers