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
            <span>Юридический адрес</span>
            <p>{client.legaladdress}</p>
          </div>
          <div className="client__body_bank">
            <span>Расчетный счет IBAN</span>
            <p>{client.bankaccount}</p>
          </div>
          <div className="client__body_bank">
            <span>Название банка</span>
            <p>{client.bankname}</p>
          </div>
          <div className="client__body_bank">
            <span>БИК</span>
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
            <span>Примечание для акта выполненных работ</span>
            <p>{client.noticeact}</p>
          </div>
          <div className="client__footer_notice">
            <span>Примечание для счета-фактуры</span>
            <p>{client.noticeinvoice}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientCard;
