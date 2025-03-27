import Link from 'next/link';

export const metadata = {
  title: 'Tietoa meistä - Lahjatarpeeseen',
  description: 'Lahjatarpeeseen on suosittelusivusto, joka auttaa sinua löytämään täydellisen lahjan jokaiseen tilanteeseen.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tietoa meistä</h1>
      
      <div className="prose lg:prose-xl max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Lahjatarpeeseen on suosittelusivusto, jonne olemme keränneet kaikki parhaat lahjaideat 
          helpottaaksemme juuri sopivan lahjan löytämistä. Oli kyseessä sitten vuosipäivälahja, 
          häälahja tai ristiäislahja, löydät parhaat lahjavinkit täältä.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Mistä kaikki sitten sai alkunsa?
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Saimme kunnian toimia pienen tytön kummeina ja ennen ristiäisiä törmäsimme ongelmaan; 
          mitä ihmettä ostaisimme kastelahjaksi? Toiset kummit olivat jo hankkineet perinteisen 
          kummilahjan, joten meidän piti keksiä jotain muuta.
        </p>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Yritimme etsiä netistä hyviä lahjaideoita, mutta emme löytäneet yhtäkään järkevää listaa.
        </p>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Tästä syntyi idea luoda tämä sivusto.
        </p>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          Saku on meistä se, joka keksii ja toteuttaa tekniset ratkaisut kädenkäänteessä tekoälyä hyödyntäen 
          ja Milla rakastaa pähkäillä visuaalista kokonaisuutta ja sanallistaa taustatarinoita.
        </p>

        <div className="bg-teal-50 rounded-lg p-8 my-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Meidän lupauksemme sinulle</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Jokainen sivustolla näkyvä lahjaidea on meidän itse valitsemamme ja suosittelemamme. 
            Haluamme auttaa sinua löytämään juuri sen täydellisen lahjan, joka ilahduttaa 
            lahjansaajaa ja tekee lahjanantohetkestä erityisen.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ota yhteyttä</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Jos sinulla on kysyttävää, palautetta tai yhteistyöehdotuksia, voit ottaa meihin yhteyttä 
          sähköpostitse: <a href="mailto:info@lahjatarpeeseen.fi" className="text-teal-600 hover:text-teal-700">
          info@lahjatarpeeseen.fi</a>
        </p>
      </div>

      {/* Call to action */}
      <div className="mt-16 text-center">
        <Link 
          href="/lahjaideat"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
        >
          Selaa lahjaideoita
        </Link>
      </div>
    </div>
  );
}
