import React, { Component, Suspense } from "react";
import events from "./events";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Modal, Form } from "semantic-ui-react";

const Header = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
    import("./header")
  );
});

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = { events, open: false, dimmer: undefined, start: "", end: "" };
  }

  handleSelect = ({ start, end }) => {
    this.setState({ open: true, start: start, end: end });
  };

  handleAddEvent = (event) => {
    const { start, end, title } = this.state;
    if (title) {
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
            id: Math.random(),
          },
        ],
        open: false,
        start: "",
        end: "",
        title: "",
      });
    } else {
      this.setState({
        open: false,
      });
    }
  };

  handleSelectUpdate = (event) => {
    const { title, start, end } = event;
    this.setState({ open: true, start: start, end: end, title: title });
  };

  handleUpdateEvent = () => {
    const { start, end, title } = this.state;

    if (title) {
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
        open: false,
        start: "",
        end: "",
        title: "",
      });
    } else {
      this.setState({
        open: false,
      });
    }
  };
  render() {
    return (
      <>
        <Suspense fallback={<h2>Products are loading...</h2>}>
          <Header />
        </Suspense>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Calendar
            style={{ height: "700px" }}
            selectable
            localizer={momentLocalizer(moment)}
            events={this.state.events}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2015, 3, 12)}
            onSelectEvent={(event) => this.handleSelectUpdate(event)}
            onSelectSlot={this.handleSelect}
            defaultView={Views.MONTHS}
            step={30}
            onNavigate={() => console.log("onNavigate")}
            onView={() => console.log("onView")}
            onRangeChange={() => console.log("onRangeChange")}
          />
        </Suspense>
        <Modal
          dimmer={"blurring"}
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          size={"tiny"}
        >
          <Modal.Header>Add Event</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Event Title</label>
                <input
                  placeholder="enter your event title"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {" "}
            {/* <Button negative onClick={() => this.setState({ open: false })}>
              Delete
            </Button> */}
            <div>
              <Button negative onClick={() => this.setState({ open: false })}>
                Cancel
              </Button>
              <Button positive onClick={() => this.handleAddEvent()}>
                Add
              </Button>
            </div>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default App;
