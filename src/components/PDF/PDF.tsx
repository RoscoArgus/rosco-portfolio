import './PDF.css';

export interface PDFDetails {
  src?: string;
  title?: string;
}

const PDF: React.FC<PDFDetails> = ({ src, title }) => {
  if (!src) {
    return <h2>No PDF source provided</h2>;
  }

  return (
    <div className="pdf-container">
      <iframe src={src} title={title || ''} />
    </div>
  );
};

export default PDF;
