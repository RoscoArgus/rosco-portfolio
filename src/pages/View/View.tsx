import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PDF, { type PDFDetails } from '../../components/PDF/PDF';
import './View.css';

const pdfModules = import.meta.glob('../../assets/pdf/*.pdf', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const resolvedPdfs: Record<string, string> = {};
for (const [path, url] of Object.entries(pdfModules)) {
  const filename = path.split('/').pop() as string;
  resolvedPdfs[filename] = url;
  resolvedPdfs[filename.replace(/\.pdf$/, '')] = url;
}

const View = () => {
  const [searchParams] = useSearchParams();
  const [pdfDetails, setPdfDetails] = useState<PDFDetails | null>(null);

  const fileParam = searchParams.get('file');

  useEffect(() => {
    if (!fileParam) {
      setPdfDetails(null);
      return;
    }

    const src = resolvedPdfs[fileParam];

    if (src) {
      setPdfDetails({
        src,
        title: fileParam,
      });
    } else {
      setPdfDetails(null);
    }
  }, [fileParam]);

  return (
    <section className="view">
      <PDF src={pdfDetails?.src} title={pdfDetails?.title} />
    </section>
  );
};

export default View;
