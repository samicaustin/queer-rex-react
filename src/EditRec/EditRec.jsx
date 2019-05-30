import React from 'react';
import { 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form, 
    FormGroup, 
    Label, 
    Input
 } from 'reactstrap';

class EditRec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      type: '',
      creator: '',
      description: '',
      find: '',
      img: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (e) => {
    this.setState({
        [e.currentTarget.name]: e.currentTarget.value
    })
}

  render() {
    return (
      <div>

        <button className = "rec" onClick={this.toggle}>Edit My Recommendations</button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader className="new-modal-title" toggle={this.toggle}>New Recommendation</ModalHeader>
          <ModalBody className="new-modal">
           
                <Form id="newForm" onSubmit = {(e) => {
                    e.preventDefault();
                    e.target.reset();
                    this.setState({
                        title: '',
                        type: '',
                        creator: '',
                        description: '',
                        find: '',
                        img: ''
                    })
                    this.props.handleSubmit(this.state);
                    this.toggle();

                }}>
                    <FormGroup>
                    <Label>Title</Label>
                    <Input type="text" name="title" onChange = {this.handleChange}/>
                    </FormGroup>



                    <FormGroup>
                        <Label>Type ("movie", "show", "album", "book", "comic", or "other")</Label>
                        <Input type="text" name="type" onChange = {this.handleChange}></Input>
                    </FormGroup>

                    <FormGroup>
                    <Label>Creator</Label>
                    <Input type="text" name="creator" onChange = {this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                    <Label>Description</Label>
                    <Input type="textarea" name="description" onChange = {this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                    <Label>Where to Find It</Label>
                    <Input type="text" name="find" onChange = {this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                    <Label>Image URL</Label>
                    <Input type="text" name="img" onChange = {this.handleChange}/>
                    </FormGroup>

                 </Form>


            </ModalBody>
            <ModalFooter>
                <button className = "rec" form="newForm" type="submit" value= "submit">Submit</button>{' '}
                <button  className = "rec" onClick={this.toggle}>Cancel</button>
            </ModalFooter>
            </Modal>

      </div>
    );
  }
}

export default EditRec;