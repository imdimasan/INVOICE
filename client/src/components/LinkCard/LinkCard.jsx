function LinkCard({ link }) {
  return (
    <>
      <p>
        Готовая ссылка:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Начальная ссылка:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>Кликов: {link.clicks}</p>
      <p>Дата создания: {new Date(link.date).toLocaleDateString()}</p>
    </>
  );
}

export default LinkCard;
