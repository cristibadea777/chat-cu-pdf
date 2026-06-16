import { useState } from "react";
import "./App.css";
import FereastraChat from "./components/FereastraChat/FereastraChat";
import FereastraIstoricConv from "./components/FereastraIstoricConv/FereastraIstoricConv";
import useIstoricConversatii from "./components/FereastraIstoricConv/useIstoricConversatii";
import FereastraPDF from "./components/FereastraPDF/FereastraPDF";

function App() {

  const [contextPDF, setContextPDF] = useState("")
  const [mesaje,     setMesaje]     = useState([])
  const [convID,     setConvId]     = useState(null)
  const {istoricConversatii, salveazaConv, stergeConv} = useIstoricConversatii()

  function incarcaConversatia(conv){
    setMesaje(conv.mesaje)
    setConvId(conv.id)
  }

  function conversatieNoua(){
    if(mesaje.length === 0) return 
    if(!convID) salveazaConv(mesaje)
    setMesaje([])
    setConvId(null)
  }

  async function salveazaSauUpdateaza(mesaje){
    const id = await salveazaConv(mesaje, convID)
    if(!convID) setConvId(id)
  }

  return (
    <div className="container-principal">
      <FereastraIstoricConv 
        incarcaConversatia  = {incarcaConversatia}
        conversatieNoua     = {conversatieNoua}
        stergeConv          = {stergeConv}
        istoricConversatii  = {istoricConversatii}
      />
      <div className="ferestre-centru">
        <FereastraPDF 
          setContextPDF = {setContextPDF}
        />
        <FereastraChat 
          contextPDF      = {contextPDF}
          mesaje          = {mesaje}
          setMesaje       = {setMesaje}
          salveazaConv    = {salveazaSauUpdateaza}
        />
      </div>
      
    </div>
  );
}

export default App;
