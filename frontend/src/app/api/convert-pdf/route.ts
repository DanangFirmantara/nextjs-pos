import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  const tempDir = path.join(process.cwd(), 'temp_pdf_conversion');

  try {
    // Create temp directory if not exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `input_${timestamp}.docx`);
    const outputPath = path.join(tempDir, `output_${timestamp}.pdf`);

    // Save uploaded file to temp location
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(inputPath, buffer);

    // Convert using libreoffice command
    // Note: This requires LibreOffice to be installed on the system
    try {
      const command = process.platform === 'win32'
        ? `soffice --headless --convert-to pdf "${inputPath}" --outdir "${tempDir}"`
        : `libreoffice --headless --convert-to pdf "${inputPath}" --outdir "${tempDir}"`;

      await execAsync(command, { timeout: 30000 });
    } catch (cmdError) {
      console.error('LibreOffice conversion error:', cmdError);
      // Fallback: Return error message
      return NextResponse.json(
        { error: 'LibreOffice is not installed or conversion failed. Please install LibreOffice to use PDF conversion feature.' },
        { status: 500 }
      );
    }

    // Read the generated PDF
    if (!fs.existsSync(outputPath)) {
      throw new Error('PDF file was not generated');
    }

    const pdfBuffer = fs.readFileSync(outputPath);

    // Cleanup temp files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.docx', '.pdf')}"`,
      },
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert file to PDF' },
      { status: 500 }
    );
  }
}
