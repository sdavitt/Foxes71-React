import React, { useState, useEffect } from 'react';

const Home = (props) => {

    /* before I return, I can access data/properties/state/etc. */
    //console.log(props);

    const addStudent = () => {
        // in order to have your component re-render with the new data when state is modified (aka mutated)
        // we must NOT MUTATE STATE DIRECTLY
        // make a copy of state -> mutate the copy -> use your state setter function (which causes a rerender)
        let newstudents = [...props.students]; // spread operator creates the copy
        newstudents.push('Shakey Graves');
        props.setStudents(newstudents);
    }

    /* animals state and addAnimal are not used - they are just an example of a state hook and modifying state */
    const [animals, setAnimals] = useState(['bear', 'otter']);

    const addAnimal = () => {
        /* Do Not Directly Mutate State */
        //animals.push('Fennec Fox'); /* BAD */

        // the spread operator: ...
        let newanimals = [...animals];
        newanimals.push('Fennec Fox'); // remember that .push() returns length
        setAnimals(newanimals);
    }

    // if I want to run a process every time this component (Home) is rendered or rerendered -> I can use an Effect hook useEffect()
    // whenever the Home component is rendered or rerendered, run the callback function
    useEffect(() => {
        console.log(`Rendered or rerendered Home! Number of students: ${props.students.length}`);
        if (props.students.length <= 8 || props.students.length > 12){
            document.title = props.students.length;
        } else {
            document.title = animals[1];
        }
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Hello, Foxes!</h1>
                    <h2>{props.my_string}</h2>
                    <button className='btn btn-info btn-block' onClick={addStudent}>Add Student</button>
                    <p>Your class currently has an {props.students.length % 2 === 0 ? <span>even</span> : <span>odd</span>} number ({props.students.length}) of students.</p>
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
                                props.students.map((student, index) => {
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
};

export default Home;