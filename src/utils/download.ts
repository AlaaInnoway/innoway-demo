import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const handleDownloadPdf = async (printRef: any, filename: string = 'Dashboard') => {
    const element = printRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename + '.pdf');
    }
};

export default handleDownloadPdf;