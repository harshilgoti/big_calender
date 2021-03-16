import React, { Component } from "react";
import events from "./events";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Modal, Form } from "semantic-ui-react";

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = { events, open: false, dimmer: undefined };
  }

  handleSelect = ({ start, end }) => {
    this.setState({ open: true, dimmer: "blurring" });
  };

  // this.setState({
  //   events: [
  //     ...this.state.events,
  //     {
  //       start,
  //       end,
  //       title,
  //     },
  //   ],
  // });
  render() {
    return (
      <>
        <Calendar
          style={{ height: "700px" }}
          selectable
          localizer={momentLocalizer(moment)}
          events={this.state.events}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.handleSelect}
          defaultView={Views.MONTHS}
          step={30}
          onNavigate={() => console.log("onNavigate")}
          onView={() => console.log("onView")}
          onRangeChange={() => console.log("onRangeChange")}
        />
        <Modal
          dimmer={this.state.dimmer}
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <Modal.Header>Use Google's location service?</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Event Title</label>
                <input placeholder="enter your event title" />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.setState({ open: false })}>
              Disagree
            </Button>
            <Button positive onClick={() => this.setState({ open: false })}>
              Agree
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default App;
