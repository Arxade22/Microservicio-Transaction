import chromium from 'chrome-aws-lambda';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

/**
 * Esto es el servicio para produccion
 */
@Injectable()
export class LambdaService {
  private async getPdfFromPuppeter(transaction: { name: string , cod_operacion : string , monto : number, message : string}): Promise<Buffer> {
    const puppeteer = chromium.puppeteer;

    const browser = await puppeteer.launch({
      headless: true,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
    });

    const dirTemplate = join(`${__dirname}`, '..', 'template', 'transaction.html');
    const html = readFileSync(dirTemplate, 'utf-8');
    const parseTemplate = html.replace('XXXX', transaction.name);
    const parseComprobante = html.replace('YYYYY', transaction.cod_operacion)
    const parseMonto = html.replace('ZZZZZ', transaction.monto)
    const parseMessage = html.replace ('WWWWWW', transaction.message)

    const page = await browser.newPage();
    await page.setContent(parseTemplate,parseComprobante,parseMessage,parseMonto ,{
      waitUntil: 'load',
    });
    const buffer = await page.pdf({
      format: 'A4',
      landscape: false,
    });
    return buffer;
  }

  /**
   * Funcion crear PDF sin lambda
   * @param transaction
   */
  public async buildPdf(transaction: { name: string , cod_operacion : string , monto : number, message : string }): Promise<string> {
    const buffer = await this.getPdfFromPuppeter(transaction);
    return buffer.toString('base64');
  }
}
