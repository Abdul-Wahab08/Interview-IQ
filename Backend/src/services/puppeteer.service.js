export const convertTextToPdfUsingPuppeteer = async (textContent) => {
    const {html} = JSON.parse(textContent)

    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = (await import("puppeteer-core")).default;

    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: true
        })
        const page = await browser.newPage()
        await page.setContent(html, {
            waitUntil: "networkidle0"
        })

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "10mm",
                right: "10mm"
            },
        })

        await browser.close()
        return pdfBuffer

    } catch (error) {
        throw new Error("Failed to convert text to PDF");
    }
}