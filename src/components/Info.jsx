import { SECTIONS } from "../utils/constants";

const Info = () => {
  return (
    <div className="info">
      {SECTIONS.map((section, index) => (
        <div key={index} className="footer-section">
          <h3 className="footer-title">{section.title}</h3>
          {section.description && (
            <p className="footer-description">{section.description}</p>
          )}
          {section.content && (
            <p className="footer-content">{section.content}</p>
          )}
          {section.items && (
            <ul className="footer-list">
              {section.items.map((item, i) => (
                <li key={i} className="footer-item">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
