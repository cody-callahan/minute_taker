import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import uuid from 'uuid';
import MeetingNotesSection from './MeetingNotesSection'


class Meeting extends Component {
    state = {
        notesSections: [ <MeetingNotesSection></MeetingNotesSection> ]
    }

    render() {
        const { notesSection } = this.state;
        return(
            <Container>
                <Button color="dark"
                style = {{marginBottom: '2rem'}}
                onClick={() => {
                    const title = prompt('Enter title of List');
                    if(title) {
                        this.setState(state => ({
                            notesSection: [...state.notesSection, {title, MeetingNotesSection}]
                        }));
                    }
                }}
                >Add Section</Button>

                <ListGroup>
                    {notesSection.map(({title, MeetingNotesSection}) => (
                        <ListGroupItem>
                            <h1>{title}</h1>
                            {MeetingNotesSection}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default Meeting;