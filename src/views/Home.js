import React, { Component } from 'react';

export default class Home extends Component {
    /* Can define other functions to be used here, etc. */
    render() {
        /* before I return, I can access data/properties/state/etc. */
        console.log(this.props);
        let students = this.props.students;
        let my_string = this.props.newprop;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1>Hello, Foxes!</h1>
                        <h2>{my_string}</h2>
                    </div>
                    <div className="col">
                        <img className="img img-fluid" alt="A Fox." src="https://external-preview.redd.it/6DDNwZLuNvUrgSfi0AByrjrBmPMFhP_oGm_mT6EeRzI.jpg?auto=webp&s=a161068b15dc1f06f5685c7dfd7a50ba5a04b14e"></img>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Students</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student, index) => {
                                        return <tr key={index}>
                                            <td>{student}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}