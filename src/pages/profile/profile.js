import React, { useEffect, useState } from 'react';
import './profile.scss';
import Form, {
  ButtonItem,
  GroupItem,
  SimpleItem,
  Label
} from 'devextreme-react/form';
import { HubConnectionBuilder } from '@microsoft/signalr';
import TextBox from 'devextreme-react/text-box';
import DateBox from 'devextreme-react/date-box';

export default function Profile() {
  const ticketHubConnection = new HubConnectionBuilder()
  .withUrl('http://localhost:5245/hubs/ticket')
  .withAutomaticReconnect()
  .build();

  const [ticket, setTicket] = useState({
    subject: '',
    description: '',
    createdDate: new Date()
  });

  const handleSubmit = (e) => {
    // отправляем сообщение серверу о создании нового тикета
    ticketHubConnection.send("SendNewTicketMessage", ticket);

    // очищаем поля данных
    setTicket({
      subject: '',
      description: '',
      createdDate: new Date()
    });
    e.preventDefault();
  }

  const buttonOptions = {
    text: 'Create',
    type: 'success',
    useSubmitBehavior: true
  };

  const updateSubject = e => {
    setTicket(prevState => ({
        ...prevState,
        subject: e.value
    }));
  };

  const updateDescription = e => {
    setTicket(prevState => ({
        ...prevState,
        description: e.value
    }));
  };

  const updateCreatedDate = e => {
    setTicket(prevState => ({
        ...prevState,
        createdDate: e.value
    }));
  };
  
  ticketHubConnection.start().catch(err => console.error(err.toString()));

  return (
    <React.Fragment>
      <h2 className={'content-block'}>New ticket</h2>

      <div className={'content-block dx-card responsive-paddings'}>
      <React.Fragment>
        <form action="your-action" onSubmit={handleSubmit}>
          <Form formData={ticket}>
            <GroupItem caption="New ticket">
              <SimpleItem>
                <Label text="Subject" />
                <TextBox value={ticket.subject} onValueChanged={updateSubject}/>
              </SimpleItem>
              <SimpleItem>
                <Label text="Description" />
                <TextBox value={ticket.description} onValueChanged={updateDescription}/>
              </SimpleItem>
              <SimpleItem>
                <Label text="Created date" />
                <DateBox value={ticket.createdDate} onValueChanged={updateCreatedDate}/>
              </SimpleItem>
            </GroupItem>
            <ButtonItem horizontalAlignment="left"
              buttonOptions={buttonOptions}
            />
          </Form>
        </form>
      </React.Fragment>
      </div>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};
