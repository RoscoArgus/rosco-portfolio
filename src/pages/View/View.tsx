import { useSearchParams } from 'react-router-dom';
import PDF from '../../components/PDF/PDF';
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

  const fileParam = searchParams.get('file');
  const pdfSrc = fileParam ? resolvedPdfs[fileParam] : undefined;
  const pdfDetails = pdfSrc ? { src: pdfSrc, title: fileParam || '' } : undefined;

  return (
    <section className="view">
      <PDF src={pdfDetails?.src} title={pdfDetails?.title} />
    </section>
  );
};

export default View;
