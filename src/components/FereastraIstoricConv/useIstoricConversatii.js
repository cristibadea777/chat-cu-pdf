import Database from "@tauri-apps/plugin-sql"
import { useEffect, useState } from "react"

let bd = null

const useIstoricConversatii = () => {

    const [istoricConversatii, setIstoricConversatii] = useState([])

    useEffect(() => { initBD() }, [])

    async function initBD() {
        bd = await Database.load("sqlite:conversatii.db")
        await bd.execute(`
            CREATE TABLE IF NOT EXISTS conversatii (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                mesaje    TEXT NOT NULL
            )
        `)
        await reload()
    }

    async function reload() {
        const rows = await bd.select("SELECT * FROM conversatii ORDER BY timestamp DESC")
        setIstoricConversatii(rows.map(r => ({ ...r, mesaje: JSON.parse(r.mesaje) })))
    }

    async function salveazaConv(mesaje, convId) {
        if (!bd || !mesaje.length) return

        if(convId){
            await bd.execute(
                "UPDATE conversatii SET mesaje = ? WHERE id = ?", 
                [JSON.stringify(mesaje), convId]
            )
            await reload()
            return convId
        } else{
            const result = await bd.execute(
                "INSERT INTO conversatii (timestamp, mesaje) VALUES (?, ?)",
                [Date.now(), JSON.stringify(mesaje)]

            )
            await reload()
            return result.lastInsertId
        }
    }

    async function stergeConv(id) {
        if (!bd) return
        await bd.execute("DELETE FROM conversatii WHERE id = ?", [id])
        await reload()
    }

    return { istoricConversatii, salveazaConv, stergeConv }
}

export default useIstoricConversatii