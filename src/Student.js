import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Student extends Component{

    constructor(props){
        super(props);

        this.state={
            departments:[],
            students:[],
            modalTitle:"",
            StudentID:0,
            StudentName:"",
            Department:"",
            DateOfAdmission:"",
            XIIPercentage:0,
        }
    }

    refreshList(){

        fetch(variables.API_URL+'student')
        .then(response=>response.json())
        .then(data=>{
            this.setState({students:data});
        });

        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeStudentName =(s)=>{
        this.setState({StudentName:s.target.value});
    }
    changeDepartment =(s)=>{
        this.setState({Department:s.target.value});
    }
    changeDateOfAdmission =(s)=>{
        this.setState({DateOfAdmission:s.target.value});
    }
    changeXIIPercentage =(s)=>{
        this.setState({XIIPercentage:s.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Student",
            StudentID:0,
            StudentName:"",
            Department:"",
            DateOfAdmission:"",
            XIIPercentage:0,
        });
    }
    editClick(stu){
        this.setState({
            modalTitle:"Edit Student",
            StudentID:stu.StudentID,
            StudentName:stu.StudentName,
            Department:stu.Department,
            DateOfAdmission:stu.DateOfAdmission,
            XIIPercentage:stu.XIIPercentage
        });
    }

    createClick(){
        fetch(variables.API_URL+'student',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                StudentName:this.state.StudentName,
                Department:this.state.Department,
                DateOfAdmission:this.state.DateOfAdmission,
                XIIPercentage:this.state.XIIPercentage
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'student',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                StudentID:this.state.StudentID,
                StudentName:this.state.StudentName,
                Department:this.state.Department,
                DateOfAdmission:this.state.DateOfAdmission,
                XIIPercentage:this.state.XIIPercentage
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'student/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            departments,
            students,
            modalTitle,
            StudentID,
            StudentName,
            Department,
            DateOfAdmission,
            XIIPercentage
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Student
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            StudentID
        </th>
        <th>
            StudentName
        </th>
        <th>
            Department
        </th>
        <th>
            DateOfAdmission
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {students.map(stu=>
            <tr key={stu.StudentID}>
                <td>{stu.StudentID}</td>
                <td>{stu.StudentName}</td>
                <td>{stu.Department}</td>
                <td>{stu.DateOfAdmission}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(stu)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(stu.StudentID)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-100 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Student Name</span>
            <input type="text" className="form-control"
            value={StudentName}
            onChange={this.changeStudentName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Department</span>
            <select className="form-select"
            onChange={this.changeDepartment}
            value={Department}>
                {departments.map(dep=><option key={dep.DepartmentID}>
                    {dep.DepartmentName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">DateOfAdmission</span>
            <input type="date" className="form-control"
            value={DateOfAdmission}
            onChange={this.changeDateOfAdmission}/>
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text">XIIPercentage</span>
        <input type="number" className="form-control"
            value={XIIPercentage}
            onChange={this.changeXIIPercentage}/>
        </div>
     </div>
    </div>

    {StudentID===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {StudentID!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>
        )
    }
}