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

export default function Ticket() {  
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
        <Paging defaultPageSize={100} />
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