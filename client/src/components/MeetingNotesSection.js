import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import uuid from 'uuid';

class MeetingNotesSection extends Component {
    state = {
        items: [ { id: uuid(), name: "Work on project" },
                 { id: uuid(), name: "Work on project" } 
        ]
    }

    render() {
        const { items } = this.state;
        return(
            <Container>
                <Button color="dark"
                style = {{marginBottom: '2rem'}}
                onClick={() => {
                    const name = prompt('Enter item');
                    if(name) {
                        this.setState(state => ({
                            items: [...state.items, { id: uuid(), name}]
                        }));
                    }
                }}
                >Add Item</Button>

                <ListGroup>
                    {items.map(({id, name}) => (
                        <ListGroupItem>
                            <Button 
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={() => {
                                this.setState(state => ({
                                    items: state.items.filter(item => item.id !== id)
                                }));
                            }}
                            >&times;</Button>
                            {name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default MeetingNotesSection;