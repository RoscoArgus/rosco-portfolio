import './PDF.css';
import { FaFilePdf } from 'react-icons/fa';

export interface PDFDetails {
  src?: string;
  title?: string;
}

const PDF: React.FC<PDFDetails> = ({ src, title }) => {
  return (
    <div className="pdf-container">
      {!src && (
        <>
          <FaFilePdf className="pdf-icon" />
          <h2>No PDF source provided</h2>
        </>
      )}
      {src && <iframe src={src} title={title || ''} />}
    </div>
  );
};

export default PDF;
