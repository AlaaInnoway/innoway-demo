import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import folderIcon from '../assets/folder.svg';
import pdfIcon from '../assets/pdf.png';
import docIcon from '../assets/doc.png';
import docxIcon from '../assets/docx.png';
import xlsIcon from '../assets/xls.png';
import pptIcon from '../assets/ppt.png';
import pngIcon from '../assets/png.png';
import jpgIcon from '../assets/jpg.png';
import { downloadDocument } from '../../../services/document.service';
import { IconButton } from '../../../components/ui/Button';

function getDocumentIcon(document: any) {
  if (document.type?.name === 'PDF')
    return <img src={pdfIcon} alt="File" width={48} height={48} />;
  if (document.type?.name === 'DOC')
    return <img src={docIcon} alt="File" width={48} height={48} />;
  if (document.type?.name === 'DOCX')
    return <img src={docxIcon} alt="File" width={48} height={48} />;
  if (document.type?.name === 'XLS' || document.type?.name === 'XLSX')
    return <img src={xlsIcon} alt="File" width={48} height={48} />;
  if (document.type?.name === 'PPT' || document.type?.name === 'PPTX')
    return <img src={pptIcon} alt="File" width={48} height={48} />;
  if (document.type?.name === 'PNG')
    return <img src={pngIcon} alt="File" width={48} height={48} />;
  if (document.type?.name === 'JPG' || document.type?.name === 'JPEG')
    return <img src={jpgIcon} alt="File" width={48} height={48} />;
  return <img src={folderIcon} alt="File" width={48} height={48} />;
}

async function download(doc: any) {
  const { url, fileName } = await downloadDocument(doc);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();

  // Clean up the object URL
  URL.revokeObjectURL(url);
}

function FileItem({ document }: any) {
  return (
    <div className="relative group">
      <div className="grid space-y-2">
        <div className="relative justify-self-center text-gray-400">
          {getDocumentIcon(document)}
          <IconButton
            customClass="text-serene-600 absolute -top-0 -right-4 z-20 invisible group-hover:visible"
            onClick={() => download(document)}
          >
            <ArrowDownTrayIcon width={16} height={16} />
          </IconButton>
        </div>
        <div className="space-y-1 text-center">
          <h1 className="text-[11px] text-gray-600">
            {document.name.split('.').slice(0, -1)}
          </h1>
        </div>
      </div>
    </div>
  );
}

function FolderItem({ document }: any) {
  return (
    <div className="relative group">
      <div className="grid">
        <div className="relative justify-self-center text-gray-400">
          {getDocumentIcon(document)}
          <IconButton
            customClass="text-serene-600 absolute -top-0 -right-4 z-20 invisible group-hover:visible"
            onClick={() => download(document)}
          >
            <ArrowDownTrayIcon width={16} height={16} />
          </IconButton>
        </div>
        <div className="space-y-1 text-center">
          <h1 className="text-[11px] text-gray-600">{document.name}</h1>
        </div>
      </div>
    </div>
  );
}

function DocumentItem({ document }: any) {
  return document.type ? (
    <FileItem document={document} />
  ) : (
    <FolderItem document={document} />
  );
}

export default DocumentItem;
