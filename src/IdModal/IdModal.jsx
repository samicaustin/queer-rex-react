import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class IdModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  async toggle() {
    await this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (e) => {
    this.setState({
        [e.currentTarget.name]: e.currentTarget.value
    })
    console.log(this.state);
}

  render() {
    return (
      <div>

        <p className="plus" onClick={this.toggle}>+</p>

        <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader className="new-modal-title" toggle={this.toggle}>{this.props.item.title}</ModalHeader>
            <ModalBody className="new-modal">
            


                <div className="id-container">
                {
                            this.props.item.creator ?

                            <div>
                                <div >
                                    <img className = "id-modal-img" src={this.props.item.img} alt={this.props.item.description}></img>
                                </div>
                                <div className="id-modal-text">
                                    <div className = "id-modal-creator">
                                    {this.props.item.type} by {this.props.item.creator}
                                    </div>

                                    <div className="id-modal-description">
                                        {this.props.item.description}
                                    </div>
                                    
                                </div>
                            </div>

                            :
                               
                            <div> 
                                    <div className = "id-modal-img">
                                        <img className = "id-modal-img" src={this.props.item.urlToImage} alt={this.props.item.description}></img>
                                    </div>

                                <div className="id-modal-text">
                                    <div className = "id-modal-creator">
                                        Article by {this.props.item.author}
                                    </div>
                                    <div className = "id-modal-description">
                                        {this.props.item.description}
                                    </div>
                                </div>
                            </div>

                        }
                </div>    

            </ModalBody>
            <ModalFooter>

                {
                    this.props.item.creator ?
                    // this.props.item.user_id == session.user ?
                    // <button className = "editRec"/> 
                    // Do I want this button to toggle this modal off and replace it 
                    // with an edit modal? Or just replace the content with another toggle 
                    // between the content and an edit form in the same modal? 
                    null

                    :

                    <form action= {this.props.item.url}>
                    <input className="idFind" type="submit" value="Full Article"/>
                    </form>
                }

            </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default IdModal;