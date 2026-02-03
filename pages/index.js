import { useState, useEffect } from 'react';
import Head from 'next/head';

const questions = [
  { 
    id: 'communication', 
    area: '💬 Komunikace', 
    subtitle: 'Jak spolu mluvíme, jestli se slyšíme a chápeme',
    question: 'Jak hodnotíš vaši komunikaci?', 
    followUp: 'Je něco, o čem bys chtěl/a mluvit, ale zatím jsi nenašel/la prostor?',
    ratings: [
      { value: 3, emoji: '😊', label: 'Rozumíme si skvěle. Cítím se vyslyšený/á.' },
      { value: 2, emoji: '😐', label: 'Většinou se domluvíme, ale občas to vázne.' },
      { value: 1, emoji: '😟', label: 'Neumíme se bavit. Buď mlčíme, nebo se hádáme.' }
    ]
  },
  { 
    id: 'intimacy', 
    area: '❤️ Intimita', 
    subtitle: 'Fyzický kontakt, sex, mazlení, jiskra',
    question: 'Jak se cítíš v oblasti intimity?', 
    followUp: 'Je něco, co ti v této oblasti chybí?',
    ratings: [
      { value: 3, emoji: '😊', label: 'Jsem spokojený/á. Je mezi námi jiskra a blízkost.' },
      { value: 2, emoji: '😐', label: 'Je to fajn, ale někdy sklouzáváme do rutiny.' },
      { value: 1, emoji: '😟', label: 'Cítím se odmítnutý/á. Fyzicky jsme si cizí.' }
    ]
  },
  { 
    id: 'time', 
    area: '🕰️ Společný čas', 
    subtitle: 'Kvalita času, který trávíme jen my dva',
    question: 'Jak hodnotíš kvalitu vašeho společného času?', 
    followUp: 'Co bys rád/a dělal/a společně víc?',
    ratings: [
      { value: 3, emoji: '😊', label: 'Užíváme si to. Máme na sebe čas a cítím se propojeně.' },
      { value: 2, emoji: '😐', label: 'Trávíme spolu čas, ale kvalita občas kolísá.' },
      { value: 1, emoji: '😟', label: 'Žijeme jako spolubydlící. Cítím se osaměle.' }
    ]
  },
  { 
    id: 'household', 
    area: '🏠 Domácnost', 
    subtitle: 'Férovost, úklid, nákupy, finance',
    question: 'Jak férově funguje vaše domácnost?', 
    followUp: 'Co tě v tomhle nejvíc štve nebo co funguje dobře?',
    ratings: [
      { value: 3, emoji: '😊', label: 'Jsme tým. Všechno klape a dělíme se férově.' },
      { value: 2, emoji: '😐', label: 'Většinu času to funguje, ale občas cítím nepoměr.' },
      { value: 1, emoji: '😟', label: 'Mám toho plné zuby. Cítím se jako služka/sponzor.' }
    ]
  },
  { 
    id: 'support', 
    area: '🤝 Emoční opora', 
    subtitle: 'Pocit bezpečí, lásky a opory',
    question: 'Cítíš se ve vztahu emotionálně podporovaný/á?', 
    followUp: 'Je něco, co ti v této oblasti chybí?',
    ratings: [
      { value: 3, emoji: '😊', label: 'Cítím se milovaný/á a v bezpečí.' },
      { value: 2, emoji: '😐', label: 'Jsem v pohodě, ale občas mi chybí ujištění.' },
      { value: 1, emoji: '😟', label: 'Cítím se ignorovaný/á. V těžkých chvílích jsem sám/sama.' }
    ]
  },
  { 
    id: 'future', 
    area: '🧭 Budoucnost', 
    subtitle: 'Kam směřujeme, společné plány a sny',
    question: 'Jak hodnotíš vaše společné směřování?', 
    followUp: 'O čem byste se měli víc bavit?',
    ratings: [
      { value: 3, emoji: '😊', label: 'Máme společné sny. Budujeme život společně.' },
      { value: 2, emoji: '😐', label: 'O budoucnosti mluvíme málo. Nejsem si jistý/á.' },
      { value: 1, emoji: '😟', label: 'Naše představy se zásadně liší. Nevidím společnou cestu.' }
    ]
  }
];

const conversationTips = [
  { icon: '👂', title: 'Nejdřív poslouchejte', text: 'Každý ať řekne, co ho ve výsledcích překvapilo. Druhý jen poslouchá, nepřerušuje.' },
  { icon: '❤️', title: 'Ptejte se na potřeby', text: 'Místo "Proč jsi dal/a jedničku?" zkuste "Co bys potřeboval/a, abys byl/a spokojenější?"' },
  { icon: '🚫', title: 'Partnera nekritizujte', text: 'Partnerův pocit je validní, i když ho vidíte jinak. Cílem není vyhrát, ale porozumět.' },
  { icon: '🎯', title: 'Vyberte jednu věc', text: 'Nezkoušejte vyřešit všechno najednou. Domluvte se na jednom malém kroku.' }
];

const areaGuidance = {
  communication: {
    different: {
      title: 'Komunikace – když to vidíte jinak',
      intro: 'Jeden z vás se cítí vyslyšený, druhý ne. To je cenná informace – ne důvod k hádce.',
      questions: [
        'Kdy ses naposledy cítil/a, že ti opravdu naslouchám?',
        'Co ti pomáhá cítit se vyslyšený/á?',
        'Je něco, o čem se bojíš se mnou mluvit?'
      ],
      tip: 'Zkuste tento týden: Každý večer 10 minut bez telefonů, jen vy dva.'
    },
    bothNegative: {
      title: 'Komunikace – oba cítíte, že to vázne',
      intro: 'Je skvělé, že to oba vidíte. Teď máte šanci to společně změnit.',
      questions: [
        'Co nám v komunikaci funguje? (I malé věci se počítají)',
        'Kdy se nám mluvilo nejlépe?',
        'Co by pomohlo, abychom se víc otevřeli?'
      ],
      tip: 'První krok: Domluvte se na jednom tématu, které chcete probrat – a dejte si na to čas bez rozptylování.'
    }
  },
  intimacy: {
    different: {
      title: 'Intimita – různé vnímání',
      intro: 'Intimitu každý prožíváme jinak. Rozdíl neznamená odmítnutí.',
      questions: [
        'Co pro tebe intimita znamená? (Nemusí jít jen o sex)',
        'Kdy se cítíš se mnou nejblíž?',
        'Je něco, co ti v téhle oblasti chybí?'
      ],
      tip: 'Zkuste tento týden: Věnujte si fyzickou pozornost bez očekávání – objetí, držení za ruce, mazlení.'
    },
    bothNegative: {
      title: 'Intimita – oba cítíte vzdálenost',
      intro: 'Když se oba cítíte fyzicky vzdálení, je to signál, že si chcete být blíž. To je dobrý základ.',
      questions: [
        'Co nám fungovalo dřív?',
        'Cítíš se v bezpečí, když jsi se mnou zranitelný/á?',
        'Je něco, co tě blokuje?'
      ],
      tip: 'První krok: Začněte malými gesty – polibek na rozloučenou, objetí při setkání. Bez tlaku.'
    }
  },
  time: {
    different: {
      title: 'Společný čas – jiné potřeby',
      intro: 'Každý potřebuje jinou "dávku" společného času. Nejde o to, kdo má pravdu.',
      questions: [
        'Kolik společného času bys potřeboval/a, abys byl/a spokojený/á?',
        'Co bys chtěl/a dělat, když jsme spolu?',
        'Cítíš se někdy, že na tebe nemám čas?'
      ],
      tip: 'Zkuste tento týden: Naplánujte si jedno "rande" – i kdyby to byla jen procházka nebo káva.'
    },
    bothNegative: {
      title: 'Společný čas – oba vám chybí',
      intro: 'Oba cítíte, že vám něco uniká. To znamená, že vám na sobě záleží.',
      questions: [
        'Co nám bere nejvíc času? (Práce, děti, telefon...)',
        'Kdy naposledy jsme si užili čas jen my dva?',
        'Co bychom mohli dělat společně každý týden?'
      ],
      tip: 'První krok: Vyberte si jeden den v týdnu, který bude "váš" – bez práce, bez povinností.'
    }
  },
  household: {
    different: {
      title: 'Domácnost – různý pohled na férovost',
      intro: 'Co je "férové" vidí každý jinak. Důležité je najít rovnováhu, která funguje pro oba.',
      questions: [
        'Co tě v domácnosti nejvíc zatěžuje?',
        'Cítíš, že tvoje práce není vidět nebo oceněná?',
        'Jak bychom mohli povinnosti rozdělit jinak?'
      ],
      tip: 'Zkuste tento týden: Sepište si všechny povinnosti a rozdělte je znovu – tentokrát společně.'
    },
    bothNegative: {
      title: 'Domácnost – oba jste nespokojení',
      intro: 'Když to drhne oběma, je čas na reset. Žádný z vás by se neměl cítit jako "služka".',
      questions: [
        'Co nás nejvíc frustruje?',
        'Jaké povinnosti bychom mohli zjednodušit nebo zrušit?',
        'Pomohlo by nám stanovit jasná očekávání?'
      ],
      tip: 'První krok: Vyberte 3 věci, které vám nejvíc vadí, a domluvte se, kdo co převezme.'
    }
  },
  support: {
    different: {
      title: 'Emoční opora – jiné potřeby',
      intro: 'Každý potřebuje podporu jinak. Co pro jednoho znamená lásku, druhý ani nevnímá.',
      questions: [
        'Jak poznám, že potřebuješ podporu?',
        'Co ti pomáhá, když máš těžký den?',
        'Cítíš se bezpečně, když mi řekneš o svých problémech?'
      ],
      tip: 'Zkuste tento týden: Zeptejte se partnera "Jak se dneska cítíš?" – a opravdu poslouchejte odpověď.'
    },
    bothNegative: {
      title: 'Emoční opora – oba se cítíte sami',
      intro: 'Když se oba cítíte bez opory, je to těžké – ale také to znamená, že oba něco potřebujete.',
      questions: [
        'Kdy ses naposledy cítil/a, že jsem ti oporou?',
        'Co bys potřeboval/a ode mě slyšet častěji?',
        'Je něco, co ti bráni požádat mě o pomoc?'
      ],
      tip: 'První krok: Řekněte si navzájem jednu věc, kterou na tom druhém oceňujete. Každý den.'
    }
  },
  future: {
    different: {
      title: 'Budoucnost – různé představy',
      intro: 'Mít jiné představy o budoucnosti je běžné. Důležité je o nich mluvit.',
      questions: [
        'Kde se vidíš za 5 let?',
        'Je něco, v čem si nejsi jistý/á ohledně naší budoucnosti?',
        'Co je pro tebe v životě nejdůležitější?'
      ],
      tip: 'Zkuste tento týden: Sedněte si a nakreslete si "mapu" společné budoucnosti – co chcete oba?'
    },
    bothNegative: {
      title: 'Budoucnost – oba tápete',
      intro: 'Když oba nevíte, kam směřujete, je čas si sednout a promluvit si o tom vážně.',
      questions: [
        'Co nás spojuje? Proč jsme spolu?',
        'Je něco, co tě trápí ohledně naší budoucnosti?',
        'Chceme oba to samé – jen nevíme jak, nebo chceme něco jiného?'
      ],
      tip: 'První krok: Odpovězte si každý zvlášť na otázku "Co chci za rok?" a pak si odpovědi porovnejte.'
    }
  }
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function Home() {
  const [screen, setScreen] = useState('loading');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isPartnerB, setIsPartnerB] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const getGuidanceType = (d) => {
    if (d.partnerA === 1 && d.partnerB === 1) return 'bothNegative';
    if (d.diff >= 1) return 'different';
    return null;
  };

  const openGuidanceModal = (areaId, type) => {
    const guidance = areaGuidance[areaId]?.[type];
    if (guidance) {
      setModalContent(guidance);
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const startQuestionnaire = () => {
    if (name.trim()) {
      setScreen('before-questions');
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('session');
    
    if (sid) {
      try {
        const stored = localStorage.getItem(`session:${sid}`);
        if (stored) {
          const data = JSON.parse(stored);
          setSessionId(sid);
          setSessionData(data);
          
          if (data.partnerB) {
            setScreen('pre-results');
          } else {
            setIsPartnerB(true);
            setScreen('intro');
          }
        } else {
          setError('Odkaz není platný nebo vypršel.');
          setScreen('error');
        }
      } catch (e) {
        setError('Odkaz není platný nebo vypršel.');
        setScreen('error');
      }
    } else {
      setScreen('intro');
    }
  };

  const handleRating = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: { ...prev[qId], rating: value } }));
  };

  const handleNote = (qId, note) => {
    setAnswers(prev => ({ ...prev, [qId]: { ...prev[qId], note } }));
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setScreen('summary');
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const submitAnswers = async () => {
    try {
      if (isPartnerB) {
        const updatedData = {
          ...sessionData,
          partnerB: { name, answers }
        };
        localStorage.setItem(`session:${sessionId}`, JSON.stringify(updatedData));
        setSessionData(updatedData);
        setScreen('pre-results');
      } else {
        const newId = generateId();
        const newSessionData = {
          partnerA: { name, answers },
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(`session:${newId}`, JSON.stringify(newSessionData));
        setSessionId(newId);
        setSessionData(newSessionData);
        setScreen('share');
      }
    } catch (e) {
      setError('Nepodařilo se uložit data. Zkus to prosím znovu.');
    }
  };

  const getComparisonData = () => {
    if (!sessionData) return [];
    return questions.map(q => ({
      id: q.id,
      area: q.area,
      partnerA: sessionData.partnerA?.answers?.[q.id]?.rating || 0,
      partnerB: sessionData.partnerB?.answers?.[q.id]?.rating || 0,
      noteA: sessionData.partnerA?.answers?.[q.id]?.note || '',
      noteB: sessionData.partnerB?.answers?.[q.id]?.note || '',
      diff: Math.abs((sessionData.partnerA?.answers?.[q.id]?.rating || 0) - (sessionData.partnerB?.answers?.[q.id]?.rating || 0))
    }));
  };

  const getRatingEmoji = (val) => {
    return val === 3 ? '😊' : val === 2 ? '😐' : val === 1 ? '😟' : '–';
  };

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin + window.location.pathname;
      return `${baseUrl}?session=${sessionId}`;
    }
    return '';
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      alert('Odkaz zkopírován!');
    } catch (e) {
      alert('Nepodařilo se zkopírovat. Zkus to ručně.');
    }
  };

  const startNewSession = () => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
    setScreen('intro');
    setAnswers({});
    setSessionData(null);
    setSessionId(null);
    setIsPartnerB(false);
    setName('');
    setCurrentQ(0);
  };

  if (screen === 'loading') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="text-purple-600">Načítám...</div>
        </div>
      </>
    );
  }

  if (screen === 'error') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Něco se pokazilo</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={startNewSession}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
            >
              Začít nový check-in
            </button>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'intro') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">💑</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Soulad</h1>
            
            {isPartnerB ? (
              <p className="text-gray-600 mb-6">
                {sessionData?.partnerA?.name ? (
                  <><strong>{sessionData.partnerA.name}</strong> tě pozval/a k vyplnění vztahového check-inu. Vyplň svou část a uvidíte společné výsledky.</>
                ) : (
                  <>Teď vyplňuješ jako Partner B. Po dokončení uvidíte společné výsledky.</>
                )}
              </p>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Krátký dotazník, který vám pomůže zjistit, jak se oba cítíte ve vašem vztahu.
                </p>
                <div className="bg-purple-50 rounded-xl p-4 mb-6 text-left text-sm text-gray-600">
                  <p className="font-medium text-purple-800 mb-2">Jak to funguje:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Vyplníš krátký formulář</li>
                    <li>Dostaneš odkaz pro partnera</li>
                    <li>Partner vyplní taky</li>
                    <li>Uvidíte společné výsledky</li>
                  </ol>
                </div>
              </>
            )}
            
            <input
              type="text"
              placeholder="Tvoje jméno nebo přezdívka"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={startQuestionnaire}
              disabled={!name.trim()}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPartnerB ? 'Vyplnit svou část' : 'Začít'}
            </button>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'before-questions') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
            <div className="text-4xl text-center mb-4">💡</div>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Než začnete odpovídat</h2>
            
            <p className="text-gray-600 text-center mb-8">
              Každý vztah vnímáme jinak – a to je v pořádku. Cílem není mít stejné odpovědi, ale pochopit pohled toho druhého.
            </p>

            <button
              onClick={() => setScreen('questions')}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
            >
              Rozumím, pokračovat
            </button>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'questions') {
    const q = questions[currentQ];
    const currentAnswer = answers[q.id] || {};
    
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{currentQ + 1} / {questions.length}</span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{q.area}</h2>
              <p className="text-sm text-gray-500">{q.subtitle}</p>
            </div>

            <p className="text-gray-700 mb-6">{q.question}</p>

            <div className="space-y-3 mb-6">
              {q.ratings.map(r => (
                <button
                  key={r.value}
                  onClick={() => handleRating(q.id, r.value)}
                  className={`w-full p-4 rounded-xl border-2 transition flex items-start gap-3 text-left ${
                    currentAnswer.rating === r.value 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-100 hover:border-purple-200'
                  }`}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-gray-700">{r.label}</span>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-500 mb-2">{q.followUp} (volitelné)</label>
              <textarea
                value={currentAnswer.note || ''}
                onChange={(e) => handleNote(q.id, e.target.value)}
                placeholder="Napiš, co tě napadá..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              {currentQ > 0 && (
                <button
                  onClick={prevQuestion}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition"
                >
                  Zpět
                </button>
              )}
              <button
                onClick={nextQuestion}
                disabled={!currentAnswer.rating}
                className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQ === questions.length - 1 ? 'Dokončit' : 'Další'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'summary') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl text-center mb-4">✨</div>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Shrnutí tvých odpovědí</h2>
            <p className="text-gray-500 text-center mb-6">Zkontroluj si své odpovědi před odesláním</p>
            
            <div className="space-y-3 mb-6">
              {questions.map(q => (
                <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">{q.area}</span>
                  <span className="text-2xl">{getRatingEmoji(answers[q.id]?.rating)}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setScreen('questions'); setCurrentQ(0); }}
                className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition"
              >
                Upravit
              </button>
              <button
                onClick={submitAnswers}
                className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
              >
                {isPartnerB ? 'Pokračovat k výsledkům' : 'Potvrdit a pokračovat'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'share') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">💌</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Skvělé, {name}!</h2>
            <p className="text-gray-600 mb-6">
              Teď pošli tento odkaz svému partnerovi. Až vyplní svou část, oba uvidíte výsledky.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-400 mb-2">Odkaz pro partnera:</p>
              <p className="text-sm text-purple-600 break-all font-mono">{getShareUrl()}</p>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition mb-3"
            >
              📋 Zkopírovat odkaz
            </button>

            <p className="text-xs text-gray-400 mb-6">
              Tip: Pošli odkaz přes SMS, WhatsApp nebo e-mail
            </p>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Tvůj partner už vyplnil?</p>
              <button
                onClick={() => {
                  try {
                    const stored = localStorage.getItem(`session:${sessionId}`);
                    if (stored) {
                      const data = JSON.parse(stored);
                      setSessionData(data);
                      if (data.partnerB) {
                        setScreen('pre-results');
                      } else {
                        alert('Partner ještě nevyplnil svou část.');
                      }
                    }
                  } catch (e) {
                    alert('Nepodařilo se načíst data.');
                  }
                }}
                className="text-purple-600 text-sm underline"
              >
                Zkontrolovat výsledky →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'pre-results') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
            <div className="text-4xl text-center mb-4">🤝</div>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Než uvidíte výsledky</h2>
            
            <p className="text-gray-600 text-center mb-6">
              Možná za chvilku zjistíte, že každý vnímáte vztah trošku jinak – a to je v pořádku. Cílem není mít stejné odpovědi, ale pochopit pohled toho druhého. Váš vztah tím můžete hodně zlepšit.
            </p>
            
            <div className="bg-purple-50 rounded-xl p-4 mb-8 text-sm text-purple-800">
              <span className="font-medium">💡 Tip:</span> Výsledky mají největší smysl, když si je projdete společně a v klidu.
            </div>

            <button
              onClick={() => setScreen('conversation-tips')}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
            >
              Pokračovat
            </button>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'conversation-tips') {
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
            <div className="text-4xl text-center mb-4">💬</div>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Jak si o výsledcích promluvit</h2>
            <p className="text-gray-500 text-center mb-6">Pár tipů, které vám pomohou vést konstruktivní rozhovor.</p>
            
            <div className="space-y-4 mb-8">
              {conversationTips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xl">{tip.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{tip.title}</p>
                    <p className="text-gray-600 text-sm">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen('results')}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
            >
              Jsme připraveni, ukaž výsledky
            </button>
          </div>
        </div>
      </>
    );
  }

  if (screen === 'results') {
    const data = getComparisonData();
    const differentAreas = data.filter(d => d.diff >= 1).sort((a, b) => b.diff - a.diff);
    const alignedAreas = data.filter(d => d.diff === 0 && d.partnerA >= 2);
    
    return (
      <>
        <Head>
          <title>Soulad – Vztahový check-in pro páry</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 py-8">
          <div className="max-w-lg mx-auto">
            {modalContent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-gray-800 pr-4">{modalContent.title}</h3>
                      <button 
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{modalContent.intro}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-3">💬 Otázky k zamyšlení:</h4>
                      <ul className="space-y-2">
                        {modalContent.questions.map((q, i) => (
                          <li key={i} className="text-gray-600 text-sm flex gap-2">
                            <span className="text-purple-500">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-medium text-green-800 mb-1">🎯 {modalContent.tip.startsWith('První') ? 'První krok' : 'Tip na tento týden'}</h4>
                      <p className="text-green-700 text-sm">{modalContent.tip.replace('První krok: ', '').replace('Zkuste tento týden: ', '')}</p>
                    </div>
                    
                    <button
                      onClick={closeModal}
                      className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
                    >
                      Rozumím
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <div className="text-4xl text-center mb-4">💑</div>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Vaše výsledky</h2>
              <p className="text-gray-500 text-center mb-6">
                {sessionData?.partnerA?.name} & {sessionData?.partnerB?.name}
              </p>

              <div className="flex justify-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-700">{sessionData?.partnerA?.name?.charAt(0).toUpperCase()}</span>
                  <span className="text-gray-600">{sessionData?.partnerA?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-xs font-medium text-rose-700">{sessionData?.partnerB?.name?.charAt(0).toUpperCase()}</span>
                  <span className="text-gray-600">{sessionData?.partnerB?.name}</span>
                </div>
              </div>

              <div className="space-y-4">
                {data.map((d, i) => {
                  const guidanceType = getGuidanceType(d);
                  const hasGuidance = guidanceType && areaGuidance[d.id]?.[guidanceType];
                  
                  return (
                    <div key={i} className={`rounded-xl p-4 ${d.diff >= 2 ? 'bg-amber-50 border border-amber-200' : d.partnerA === 1 && d.partnerB === 1 ? 'bg-rose-50 border border-rose-200' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-gray-800">{d.area}</span>
                          {d.diff >= 2 && <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">Odlišný pohled</span>}
                          {d.partnerA === 1 && d.partnerB === 1 && <span className="text-xs bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full">Prostor pro zlepšení</span>}
                        </div>
                        <div className="flex gap-1">
                          <div className="flex items-center gap-1 bg-purple-100 rounded-lg px-2 py-1">
                            <span className="text-xs text-purple-600 font-medium">{sessionData?.partnerA?.name?.charAt(0).toUpperCase()}</span>
                            <span className="text-xl">{getRatingEmoji(d.partnerA)}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-rose-100 rounded-lg px-2 py-1">
                            <span className="text-xs text-rose-600 font-medium">{sessionData?.partnerB?.name?.charAt(0).toUpperCase()}</span>
                            <span className="text-xl">{getRatingEmoji(d.partnerB)}</span>
                          </div>
                        </div>
                      </div>
                      {(d.noteA || d.noteB) && (
                        <div className="text-sm text-gray-500 mt-2 space-y-1">
                          {d.noteA && <p>💬 {sessionData?.partnerA?.name}: "{d.noteA}"</p>}
                          {d.noteB && <p>💬 {sessionData?.partnerB?.name}: "{d.noteB}"</p>}
                        </div>
                      )}
                      {hasGuidance && (
                        <button
                          onClick={() => openGuidanceModal(d.id, guidanceType)}
                          className="mt-2 text-purple-600 text-sm hover:underline"
                        >
                          Jak se o tom pobavit →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {differentAreas.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-amber-800 mb-2">🔍 Kde se vaše vnímání liší</h3>
                <p className="text-amber-700 text-sm mb-3">
                  {differentAreas.map(a => a.area).join(', ')}
                </p>
                <p className="text-amber-600 text-xs">
                  💡 Rozdílné vnímání neznamená problém – znamená to příležitost lépe pochopit, co ten druhý potřebuje.
                </p>
              </div>
            )}

            {alignedAreas.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-4">
                <h3 className="font-semibold text-green-800 mb-2">💚 Kde se shodujete</h3>
                <p className="text-green-700 text-sm">
                  {alignedAreas.map(a => a.area).join(', ')} – tady jste na stejné vlně!
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <button 
                onClick={() => setShowTips(prev => !prev)}
                className="w-full flex justify-between items-center"
              >
                <h3 className="font-semibold text-gray-800">💬 Jak si o výsledcích promluvit</h3>
                <span className="text-purple-600 text-sm">{showTips ? 'Skrýt ▲' : 'Zobrazit ▼'}</span>
              </button>
              
              {showTips && (
                <div className="space-y-4 mt-4 pt-4 border-t border-gray-100">
                  {conversationTips.map((tip, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-xl">{tip.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{tip.title}</p>
                        <p className="text-gray-600 text-sm">{tip.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <p className="text-gray-600 mb-4">
                Nejlepší čas na rozhovor? Když jste oba v klidu a máte prostor. Nemusí to být hned teď. 🌿
              </p>
              <button
                onClick={startNewSession}
                className="text-purple-600 text-sm underline"
              >
                Začít nový check-in
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
