import puppeteer from "puppeteer"

export const convertTextToPdfUsingPuppeteer = async (textContent) => {
    const {html} = JSON.parse(textContent)
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setContent(html, {
            waitUntil: "networkidle0"
        })

        const pdfBuffer = await page.pdf({
            format: "A4",
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