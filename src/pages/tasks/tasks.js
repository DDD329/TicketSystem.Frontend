import React, { useState, useEffect, useRef } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';
import { HubConnectionBuilder } from '@microsoft/signalr';

export default function Task() {
  //const [ connection, setConnection ] = useState(null);
  
  const [ticketArray, setTicketArray] = useState([{
    "id": 1,
    "subject": "Тема тикета",
    "description": "Описание тикета",
    "createdDate": "2013-01-15T00:00:00"
  }]);

  // загружаем тикеты с сервера
  const loadTickets = async () => {
    // отправляет запрос и получаем ответ
    const response = await fetch("http://localhost:5245/api/tickets", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const tickets = await response.json();
        setTicketArray(prevArray => tickets);
    }
  };

  // загружаем тикет с сервера по идентификатору
  const loadTicket = async (ticketId) => {
    // отправляет запрос и получаем ответ
    const response = await fetch("http://localhost:5245/api/tickets/" + ticketId, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const ticket = await response.json();
        setTicketArray(prevArray => [...prevArray, ticket]);
    }
  };

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    const ticketHubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5245/hubs/ticket')
        .withAutomaticReconnect()
        .build();

      ticketHubConnection.start();
      ticketHubConnection.on('ReceiveCreatedTicketMessage', message => loadTicket(message.ticketId));

    loadTickets();
  }, []);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Tickets</h2>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={ticketArray}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={false} showInfo={true} />
        <FilterRow visible={false} />

        <Column dataField={'id'} width={90} hidingPriority={2} caption={'Id'} />
        <Column
          dataField={'subject'}
          width={190}
          caption={'Subject'}
          hidingPriority={8}
        />
        <Column
          dataField={'description'}
          caption={'Description'}
          hidingPriority={6}
        />
        <Column
          dataField={'createdDate'}
          caption={'CreatedDate'}
          hidingPriority={6}
        />
      </DataGrid>
    </React.Fragment>
)}

const dataSource = [
  {
    "TicketId": 1,
    "Task_Assigned_Employee_ID": 7,
    "Task_Owner_ID": 1,
    "Task_Customer_Employee_ID": null,
    "Subject": "Prepare 2013 Financial",
    "Task_Description": "<div>IMPORTANT: The document must be fully formatted in Excel.</div>",
    "Task_Start_Date": "2013-01-15T00:00:00",
    "Task_Due_Date": "2013-01-31T00:00:00",
    "Task_Status": "Completed",
    "Task_Priority": 4,
    "Task_Completion": 100,
    "Task_Reminder": true,
    "Task_Reminder_Date": "2014-01-20T00:00:00",
    "Task_Reminder_Time": "1899-12-30T08:00:00",
    "SSMA_TimeStamp": "AAAAAAAAG1k="
  },
  {
    "TicketId": 2,
    "Task_Assigned_Employee_ID": 4,
    "Task_Owner_ID": 1,
    "Task_Customer_Employee_ID": null,
    "Subject": "Prepare 3013 Marketing Plan",
    "Task_Description": "<div>We need to double revenues in 2013 and our marketing strategy is going to be key here. R&amp;D is improving existing products and creating new products so we can deliver great AV equipment to our customers.</div>\r\n\r\n<div>Robert, please make certain to create a PowerPoint presentation for the members of the executive team.</div>",
    "Task_Start_Date": "2013-01-01T00:00:00",
    "Task_Due_Date": "2013-01-31T00:00:00",
    "Task_Status": "Completed",
    "Task_Priority": 4,
    "Task_Completion": 100,
    "Task_Reminder": false,
    "Task_Reminder_Date": null,
    "Task_Reminder_Time": null,
    "SSMA_TimeStamp": "AAAAAAAAG1o="
  },
  {
    "TicketId": 3,
    "Task_Assigned_Employee_ID": 2,
    "Task_Owner_ID": 1,
    "Task_Customer_Employee_ID": null,
    "Subject": "Update Personnel Files",
    "Task_Description": "<div>In an audit I conducted of personnel files this, I found documentation to be lacking. Samantha, you need to review my report and get this fixed.</div>\r\n\r\n<div>&nbsp;</div>\r\n\r\n<div>Samantha Bright: John, I've completed this review and sent my report to you.</div>",
    "Task_Start_Date": "2013-02-03T00:00:00",
    "Task_Due_Date": "2013-02-28T00:00:00",
    "Task_Status": "Completed",
    "Task_Priority": 4,
    "Task_Completion": 100,
    "Task_Reminder": true,
    "Task_Reminder_Date": "2013-02-27T00:00:00",
    "Task_Reminder_Time": "1899-12-30T09:00:00",
    "SSMA_TimeStamp": "AAAAAAAAG1s="
  },
  {
    "TicketId": 4,
    "Task_Assigned_Employee_ID": 2,
    "Task_Owner_ID": 1,
    "Task_Customer_Employee_ID": null,
    "Subject": "Review Health Insurance Options Under the Affordable Care Act",
    "Task_Description": "<div>The changes in health insurance laws require that we review our existing coverage and update it to meet regulations. &nbsp;Samantha Bright will be point on this.</div>\r\n\r\n<div>&nbsp;</div>\r\n\r\n<div>Samantha Bright: Update - still working with the insurance company to update our coverages.</div>",
    "Task_Start_Date": "2013-02-12T00:00:00",
    "Task_Due_Date": "2013-04-25T00:00:00",
    "Task_Status": "In Progress",
    "Task_Priority": 4,
    "Task_Completion": 50,
    "Task_Reminder": true,
    "Task_Reminder_Date": "2014-04-23T00:00:00",
    "Task_Reminder_Time": "1899-12-30T09:00:00",
    "SSMA_TimeStamp": "AAAAAAAAG1w="
  },
  {
    "TicketId": 5,
    "Task_Assigned_Employee_ID": 1,
    "Task_Owner_ID": 2,
    "Task_Customer_Employee_ID": null,
    "Subject": "Choose between PPO and HMO Health Plan",
    "Task_Description": "<div>We need a final decision on whether we are planning on staying with a PPO Health Plan or we plan on switching to an HMO. We cannot proceed with compliance with the Affordable Health Act until we make this decision.</div>\r\n\r\n<div>&nbsp;</div>\r\n\r\n<div>John Heart: Samantha, I'm still reviewing costs. I am not in a position to make a final decision at this point.</div>",
    "Task_Start_Date": "2013-02-15T00:00:00",
    "Task_Due_Date": "2013-04-15T00:00:00",
    "Task_Status": "Not Started",
    "Task_Priority": 4,
    "Task_Completion": 75,
    "Task_Reminder": false,
    "Task_Reminder_Date": null,
    "Task_Reminder_Time": null,
    "SSMA_TimeStamp": "AAAAAAAAG10="
  }
];

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];
