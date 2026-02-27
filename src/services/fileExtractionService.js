import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Extracts text from various file types.
 * @param {File} file - The file object from input.
 * @returns {Promise<string>} - The extracted text.
 */
export const extractTextFromFile = async (file) => {
    const fileType = file.type;

    if (fileType === 'application/pdf') {
        return await extractFromPDF(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return await extractFromDOCX(file);
    } else if (fileType.startsWith('image/')) {
        return await extractFromImage(file);
    } else {
        throw new Error('Unsupported file type. Please upload a PDF, DOCX, or Image.');
    }
};

const extractFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
    }

    return fullText;
};

const extractFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return result.value;
};

const extractFromImage = async (file) => {
    const result = await Tesseract.recognize(file, 'eng+hin+tel+tam+kan', {
        logger: m => console.log(m)
    });
    return result.data.text;
};
