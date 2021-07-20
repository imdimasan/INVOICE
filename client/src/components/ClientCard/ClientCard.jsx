import "./ClientCard.scss";

function ClientCard({ client }) {
  return (
    <>
      <div className="clientcard__wrapper">
        <div className="clientcard__header">
          <div className="clientcard__header_name">
            <span>Название организации</span>
            <p>{client.organization}</p>
          </div>
          <div className="clientcard__header_name">
            <span>УНП организации</span>
            <p>{client.unp}</p>
          </div>
        </div>
        <div className="client__body">
          <div className="client__body_bank">
            <span>Банковские реквизиты</span>
            <p>{client.bank}</p>
          </div>
          <div className="client__body_bank">
            <span>IBAN</span>
            <p>{client.bic}</p>
          </div>
          <div className="client__body_contract">
            <span>Номер договора</span>
            <p>{client.contractname}</p>
          </div>
          <div className="client__body_contract">
            <span>Дата договора</span>
            <p>{new Date(client.contractdate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="client__footer">
          <div className="client__footer_notice">
            <span>Примечание</span>
            <p>{client.notice}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientCard;
