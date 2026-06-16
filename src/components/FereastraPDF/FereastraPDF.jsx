import useUploadPDF from "./useUploadPDF"

const FereastraPDF = ({ setContextPDF, setMesaje }) => {

    const { incarcarePDF, uploadPDF } = useUploadPDF(setContextPDF, setMesaje)

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