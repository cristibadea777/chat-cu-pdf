import useUploadPDF from "./useUploadPDF"

const FereastraPDF = ({ setContextPDF }) => {

    const { incarcarePDF, uploadPDF } = useUploadPDF(setContextPDF)

    return (
        <div className="fereastra-pdf">
            <label>
                <input type="file" accept=".pdf" multiple hidden onChange={uploadPDF} />
                Încarcă PDF
            </label>
            <span>{incarcarePDF ? "Se încarcă..." : ""}</span>
        </div>
    )
}

export default FereastraPDF