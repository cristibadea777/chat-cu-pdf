import * as pdfjs from "pdfjs-dist"
import { useState } from "react"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString()

const useUploadPDF = (setContextPDF) => {

    const [incarcarePDF, setIncarcarePDF] = useState(false)

    async function uploadPDF(e) {
        const selectedPDFS = Array.from(e.target.files)
        if (!selectedPDFS.length) return

        setIncarcarePDF(true)
        let textTotal = ""
        try {
            for (const f of selectedPDFS) {
                console.log("PDF citit:", f.name)
                const buf    = await f.arrayBuffer()
                const fisier = await pdfjs.getDocument({ data: buf }).promise

                for (let p = 1; p <= fisier.numPages; p++) {
                    const paginaPDF   = await fisier.getPage(p)
                    const continutPDF = await paginaPDF.getTextContent()
                    textTotal += continutPDF.items.map(i => i.str).join(" ") + "\n"
                }
            }
            if (!textTotal.trim()) console.warn("PDF-urile nu contin text")
            setContextPDF(textTotal.slice(0, 8000))
        } catch (err) { console.error("Eroare la upload PDF:", err)
        } finally { 
            setIncarcarePDF(false) 
            e.target.value = ""
        }
    }
    return { incarcarePDF, uploadPDF }
}
export default useUploadPDF