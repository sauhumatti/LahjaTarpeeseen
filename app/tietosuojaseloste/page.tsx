export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-secondary-900 mb-8">
        Tietosuojaseloste
      </h1>

      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            1. Rekisterinpitäjä
          </h2>
          <p>
            Lahjatarpeeseen
            <br />
            Sähköposti: lahjatarpeeseen@gmail.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            2. Kerättävät tiedot
          </h2>
          <p>
            Sivustomme kerää seuraavia tietoja:
          </p>
          <ul>
            <li>Sivuston käyttöön liittyvät lokitiedot</li>
            <li>Evästeiden kautta kerättävät tiedot</li>
            <li>Vapaaehtoisesti annetut yhteystiedot yhteydenottolomakkeen kautta</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            3. Tietojen käyttötarkoitus
          </h2>
          <p>
            Tietoja käytetään:
          </p>
          <ul>
            <li>Sivuston toiminnan analysointiin ja kehittämiseen</li>
            <li>Palvelun laadun parantamiseen</li>
            <li>Käyttäjäkokemuksen personointiin</li>
            <li>Asiakaspalvelun toteuttamiseen</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            4. Tietojen säilytys ja suojaus
          </h2>
          <p>
            Kaikki kerätyt tiedot säilytetään turvallisesti ja suojataan asianmukaisilla teknisillä ja
            organisatorisilla toimenpiteillä. Tietoja säilytetään vain niin kauan kuin on tarpeellista
            palvelun toteuttamiseksi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            5. Käyttäjän oikeudet
          </h2>
          <p>
            Käyttäjällä on oikeus:
          </p>
          <ul>
            <li>Tarkastaa itseään koskevat tiedot</li>
            <li>Vaatia virheellisten tietojen korjaamista</li>
            <li>Vaatia tietojen poistamista</li>
            <li>Peruuttaa suostumuksensa tietojen käsittelyyn</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            6. Yhteydenotot
          </h2>
          <p>
            Tietosuojaan liittyvissä kysymyksissä voi ottaa yhteyttä sähköpostitse:
            lahjatarpeeseen@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}