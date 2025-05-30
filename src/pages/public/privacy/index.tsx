import React from 'react'

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Integritetspolicy</h1>

      <p>
        Den här applikationen, Kökskompanjonen, är ett studentprojekt och samlar inte in någon
        personlig information i kommersiellt syfte.
      </p>

      <p>
        Alla recept och inköpslistor lagras säkert i Firebase och är endast tillgängliga för den
        inloggade användaren. Din e-postadress används enbart för autentisering och delas inte med
        tredje part.
      </p>

      <p>
        Du kan när som helst radera ditt konto och alla dina uppgifter permanent. Kontakta oss via
        e-post om du har frågor:
        <a href="mailto:mb226ea@student.lnu.se" className="underline ml-1">
          mb226ea@student.lnu.se
        </a>
      </p>

      <p>Senast uppdaterad: Maj 2025</p>
    </div>
  )
}

export default PrivacyPage
