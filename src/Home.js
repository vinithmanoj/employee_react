import React, { Component } from 'react';
import {Button,Jumbotron, Table, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import axios from 'axios';

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {employeeList:[],
			dataLoaded:false,
			dataLoading:false,
			loading:"",
			modal:false,
			name:"",
		    designation:"",
		    salary:"",
		    department:""
		    }
	  this.delete = this.delete.bind(this);
	  this.toggle = this.toggle.bind(this);
	  this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		this.fetchData();
	}

	toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

	delete(emp){
		axios.delete("http://localhost:8080/api/employee/"+emp.id)
		.then((response)=>{
			this.fetchData();
		})
		.catch((error)=>{
			alert("Error occured")
		})
	}

	update(emp){
		axios.put("http://localhost:8080/api/employee/"+emp.id)
		.then((response)=>{
			console.log("editied");
		})
		.catch((error)=>{
			console.log("error occured")
		})

	}

	fetchData(){
		this.setState((state)=>{		
			loading:"Please wait"
		})
		axios.get("http://localhost:8080/api/employee")
		.then((response)=>{
			this.setState({employeeList:response.data});			
			console.log(response)
			console.log(this.state)

		})
		.catch((error)=>{
			console.log(error)
		})
	}

	tableContent(){
		if(this.state.employeeList.length>0){
			return this.tableBody();
		}
		if(this.state.employeeList.length==0 && this.state.dataLoaded===true){
			return <tr>
			<td></td>
			<td></td>
			<td><div>No Employee Details available.!!!</div></td>
			<td></td>
			</tr>
		}
	}

	tableBody(){
		return(
			this.state.employeeList.map((emp,index)=>{
				return (
					<tr key={index}>
						<td>{emp.id}</td>
						<td>{emp.name}</td>							
						<td>{emp.designation}</td>
						<td>{emp.department}</td>
						<td>{emp.salary}</td>
						<td>
							<Button color="primary" onClick={()=>this.update(emp)}>Update</Button>{" "}
							<Button color="danger" onClick={()=>this.delete(emp)}> Delete</Button>
						</td>
					</tr>
				)	
			})
			);
	}

	handleChange(event) {
    this.setState({[event.target.name]:event.target.value})
   
  }

  handleSubmit(event) {
    console.log("submitted");

       let axiosConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    var json ={};
    json.name=this.state.name;
    json.designation = this.state.designation;
    json.salary = this.state.salary;
    json.department = this.state.department;
    axios.post("http://localhost:8080/api/employee",json)
		.then((response)=>{
			this.fetchData();			
			console.log("editied");
		})
		.then(()=>{
			this.toggle();
		})
		.catch((error)=>{
			console.log("error occured")
		})

    event.preventDefault();
  }

  render() {
    return (
    	<div>
	      <Jumbotron>
	      <div>{this.state.loading}</div>
	        <Table bordered>
	        	<thead>
	        	<tr>
	        	<th>Emp. Id</th>
	        	<th>Employee Name </th>
	        	<th>Designation </th>
	        	<th>Department</th>
	        	<th>Salary</th>	 
	        	<th>Edit </th>       	
	        	</tr>
	        	</thead>
	        	<tbody>
	        		{this.tableContent()}	
	        	</tbody>
	        </Table>
	        <br/>
	        <Button color="primary"	onClick = {this.toggle}>Add Employee </Button>
	         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
        <Form >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" value={this.state.name} id="name" placeholder="with a placeholder" onChange={(e)=>this.handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="designation">designation</Label>
          <Input type="designation" name="designation" value={this.state.designation} id="designation" placeholder="with a placeholder" onChange={(e)=>this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="salary">Salary</Label>
          <Input type="salary" name="salary" id="salary"  value ={this.state.salary} placeholder="with a placeholder" onChange={(e)=>this.handleChange(e)}/>
        </FormGroup>                                                     
        <FormGroup>
          <Label for="department">Department</Label>
          <Input type="department" name="department" id="department"  value ={this.state.department} placeholder="with a placeholder" onChange={(e)=>this.handleChange(e)}/>
        </FormGroup>
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e)=>this.handleSubmit(e)}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
	      </Jumbotron>
    </div>
    	)};

}

export default Home;