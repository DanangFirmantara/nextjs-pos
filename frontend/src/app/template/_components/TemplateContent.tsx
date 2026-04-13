'use client';

import { useState, useRef } from 'react';
import { FileText, Upload, Trash2, Download, FileDown } from 'lucide-react';
import mammoth from 'mammoth';
import DocxTemplater from 'docxtemplater';
import PizZip from 'pizzip';

interface Variable {
  name: string;
  value: string;
}

export default function TemplateContent() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [docxFile, setDocxFile] = useState<ArrayBuffer | null>(null);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Extract variables from text
  const extractVariables = (text: string): string[] => {
    const regex = /\{([^}]+)\}/g;
    const matches = text.match(regex);
    if (!matches) return [];
    
    // Extract variable names and remove duplicates
    const vars = matches.map(match => match.replace(/[{}]/g, '').trim());
    return [...new Set(vars)];
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setUploadStatus('Error: Hanya file .docx yang diperbolehkan');
        setFileName(null);
        return;
      }

      try {
        // Read file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Parse docx using mammoth for text extraction
        const result = await mammoth.convertToHtml({ arrayBuffer });
        const htmlContent = result.value;
        
        // Extract text from HTML for variable detection
        const textContent = htmlContent.replace(/<[^>]*>/g, '').trim();
        
        setFileName(file.name);
        setDocxFile(arrayBuffer);
        setUploadStatus('File siap untuk diproses');
        
        // Extract variables
        const detectedVars = extractVariables(textContent);
        const varObjects: Variable[] = detectedVars.map(varName => ({
          name: varName,
          value: ''
        }));
        
        setVariables(varObjects);
        setShowForm(detectedVars.length > 0);
        
        if (detectedVars.length > 0) {
          setUploadStatus(`File siap! Ditemukan ${detectedVars.length} variabel`);
        } else {
          setUploadStatus('File berhasil dibaca, namun tidak ada variabel ditemukan');
        }
      } catch (error) {
        setUploadStatus('Error: Gagal membaca file docx');
        setFileName(null);
        setDocxFile(null);
        setVariables([]);
        console.error('Error reading docx:', error);
      }
    }
  };

  const handleVariableChange = (index: number, value: string) => {
    const updated = [...variables];
    updated[index].value = value;
    setVariables(updated);
  };

  const generateFilledDocx = (): Blob => {
    if (!docxFile) throw new Error('No document loaded');

    // Create a copy of the ArrayBuffer
    const zip = new PizZip(docxFile);
    const doc = new DocxTemplater(zip);

    // Create object with variables for docxtemplater
    const data: Record<string, string> = {};
    variables.forEach(variable => {
      data[variable.name] = variable.value || `{${variable.name}}`;
    });

    // Set the data and render
    doc.setData(data);
    doc.render();

    // Generate the document
    const blob = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    return blob;
  };

  const handleGenerateDocx = async () => {
    if (!docxFile) return;

    try {
      setIsGenerating(true);
      const blob = generateFilledDocx();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const docName = fileName?.replace('.docx', '') || 'document';
      link.href = url;
      link.download = `${docName}_filled.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setUploadStatus('File DOCX berhasil diunduh!');
    } catch (error) {
      setUploadStatus('Error: Gagal membuat file DOCX');
      console.error('Error generating DOCX:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!docxFile) return;

    try {
      setIsGenerating(true);
      const blob = generateFilledDocx();
      
      // Create FormData with DOCX blob
      const formData = new FormData();
      const docName = fileName?.replace('.docx', '') || 'document';
      formData.append('file', blob, `${docName}.docx`);

      // Call API endpoint for server-side conversion
      const response = await fetch('/api/convert-pdf', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to convert to PDF');
      }

      // Get PDF blob from response
      const pdfBlob = await response.blob();

      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${docName}_filled.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setUploadStatus('✅ File PDF berhasil dibuat dan diunduh!');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Gagal membuat file PDF';
      setUploadStatus(`⚠️ ${errorMsg}`);
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setFileName(null);
    setUploadStatus(null);
    setDocxFile(null);
    setVariables([]);
    setShowForm(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Upload & Isi Dokumen</h2>
          <p className="text-sm text-gray-500 mt-0.5">Upload file dokumen Word dan isi variabel untuk generate dokumen terisi (DOCX atau PDF)</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload File Document <span className="text-red-500">*</span>
          </label>

          {/* Upload Area */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center w-48 h-36 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors gap-2 cursor-pointer"
            >
              <FileText className="w-8 h-8" />
              <span className="text-sm font-medium">{fileName ?? 'Klik untuk upload'}</span>
              <span className="text-xs text-gray-400">(.docx)</span>
            </button>

            <input
              ref={fileRef}
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="flex-1 space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium">Format yang didukung:</p>
                <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                  <li>Format: Word (.docx)</li>
                  <li>Ukuran maksimal: 10MB</li>
                  <li>Variabel ditandai dengan {'{nama_variabel}'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {uploadStatus && (
          <div className={`p-3 rounded-lg text-sm font-medium transition-colors ${
            uploadStatus.includes('Error')
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-green-50 text-green-600 border border-green-200'
          }`}>
            {uploadStatus}
          </div>
        )}

        {/* Variables Form */}
        {showForm && variables.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Isi Variabel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {variables.map((variable, index) => (
                <div key={variable.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {variable.name}
                  </label>
                  <input
                    type="text"
                    value={variable.value}
                    onChange={(e) => handleVariableChange(index, e.target.value)}
                    placeholder={`Masukkan nilai untuk ${variable.name}`}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isGenerating}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {fileName && (
          <div className="flex gap-3 pt-4 border-t border-gray-200 flex-wrap">
            {variables.length > 0 && (
              <>
                <button
                  onClick={handleGenerateDocx}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="w-4 h-4" /> Generate DOCX
                </button>
                <button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <FileDown className="w-4 h-4" /> Generate PDF
                </button>
              </>
            )}
            <button
              onClick={handleClear}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Bersihkan
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>💡 Info:</strong> Anda dapat mengunduh dokumen dalam format DOCX (dengan formatting lengkap) atau PDF (untuk print/share). Keduanya akan mempertahankan styling original template.
          </p>
        </div>
      </div>
    </main>
  );
}
