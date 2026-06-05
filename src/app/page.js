'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // CONFIGURACIÓN DE TU ANIVERSARIO (Noviembre 2025)
  const fechaInicio = new Date(2025, 10, 4, 0, 0, 0); 

  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [cartaAbierta, setCartaAbierta] = useState(null);
  const [corazones, setCorazones] = useState([]);
  const [mostrarIntro, setMostrarIntro] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const audioRef = useRef(null);

  // ESTADOS PARA LA REVELACIÓN EN CADENA DE LOS CAPÍTULOS
  const [capitulo1Abierto, setCapitulo1Abierto] = useState(false);
  const [capitulo2Abierto, setCapitulo2Abierto] = useState(false);
  const [capitulo3Abierto, setCapitulo3Abierto] = useState(false);

  // ESTADOS PARA EL JUEGO DEL BOTÓN FINAL TRUCO
  const [noPosicion, setNoPosicion] = useState({ x: 0, y: 0 });
  const [haIntentadoNo, setHaIntentadoNo] = useState(false);
  const [juegoGanado, setJuegoGanado] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const diferencia = ahora - fechaInicio;

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      setTiempo({ dias, horas, minutos: minutes, segundos });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const iniciarExperiencia = () => {
    setMostrarIntro(false);
    setReproduciendo(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Error de audio:", err));
    }
    lanzarCorazones(40);
  };

  const ControlarMusica = () => {
    if (!audioRef.current) return;
    if (reproduciendo) {
      audioRef.current.pause();
      setReproduciendo(false);
    } else {
      audioRef.current.play();
      setReproduciendo(true);
    }
  };

  const lanzarCorazones = (cantidad = 20) => {
    const nuevosCorazones = Array.from({ length: cantidad }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * (35 - 15) + 15,
      duracion: Math.random() * (5 - 3) + 3,
    }));
    setCorazones(prev => [...prev, ...nuevosCorazones]);
    setTimeout(() => {
      setCorazones(prev => prev.slice(cantidad));
    }, 6000);
  };

  // FUNCIÓN PARA MOVER EL BOTÓN "NO"
  const moverBotonNo = () => {
    setHaIntentadoNo(true);
    const randomX = Math.random() * (160 - (-160)) + (-160);
    const randomY = Math.random() * (120 - (-120)) + (-120);
    setNoPosicion({ x: randomX, y: randomY });
    lanzarCorazones(3);
  };

  // AL PRESIONAR "SÍ"
  const presionarSi = () => {
    setJuegoGanado(true);
    lanzarCorazones(60);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 text-slate-800 font-sans overflow-x-hidden relative selection:bg-rose-200">
      
      {/* ARCHIVO DE AUDIO */}
      <audio ref={audioRef} src="/nuestro-aniversario/nuestra-cancion.mp3" loop />

      {/* 0. PANTALLA DE INTRODUCCIÓN INTERACTIVA */}
      {mostrarIntro && (
        <div className="fixed inset-0 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 z-[9999] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl max-w-md mx-auto transform animate-bounce-slow z-10">
            <span className="text-6xl mb-6 block animate-pulse">🔐</span>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">Un Mensaje Secreto Te Espera</h2>
            <p className="text-rose-100 text-sm md:text-base mb-8 leading-relaxed">
              Hola mi amor, preparé este espacio interactivo para recordarte lo mucho que te amo. ¿Estás lista para entrar a nuestro rincón?
            </p>
            <button
              onClick={iniciarExperiencia}
              className="bg-white text-rose-600 font-black px-8 py-4 rounded-full text-base uppercase tracking-wider shadow-xl hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              💖 Presiona para Abrir 💖
            </button>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE DE MÚSICA */}
      {!mostrarIntro && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <button 
            onClick={ControlarMusica} 
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${reproduciendo ? 'bg-rose-500 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
            style={{ animation: reproduciendo ? 'spin 4s linear infinite' : 'none' }}
          >
            {reproduciendo ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-pulse">
                <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3.33 3.33 0 0 0-1.5-.303c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V5.71l5.047.841a.75.75 0 0 1 .62.742v4.21a3.33 3.33 0 0 0-1.5-.303c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V1.651a.75.75 0 0 1 .952-.72l15 5ZM6 18.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5S8.328 20 7.5 20 6 19.328 6 18.5Zm12 0c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5s-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 .28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* EFECTO DE LLUVIA DE CORAZONES */}
      {corazones.map((corazon) => (
        <span
          key={corazon.id}
          className="absolute text-rose-500 pointer-events-none z-50 opacity-75"
          style={{
            left: `${corazon.left}%`,
            bottom: '-50px',
            fontSize: `${corazon.size}px`,
            animation: `floatUp ${corazon.duracion}s linear forwards`,
            animationDelay: `${corazon.delay}s`,
            position: 'fixed'
          }}
        >
          ❤️
        </span>
      ))}

      {/* 1. PORTADA PRINCIPAL */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-105 blur-[1.5px] opacity-20" 
          style={{ backgroundImage: "url('/nuestro-aniversario/Nuestras-primera-foto.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-rose-50 via-transparent to-transparent z-0"></div>

        <div className="z-10 max-w-2xl px-4">
          <span className="inline-block text-xs uppercase tracking-widest text-rose-600 font-extrabold bg-rose-100/90 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 shadow-md animate-pulse">
            Siete meses inolvidables ✨
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 tracking-tight leading-none mb-6">
            Felices 7 Meses,<br/>Mi Amor
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-md mx-auto mb-10 font-medium">
            El tiempo vuela cuando estás al lado de la persona correcta. Mira cuánto ha crecido lo nuestro:
          </p>

          {/* CONTADOR */}
          <div 
            onClick={() => { setClickContador(c => c + 1); lanzarCorazones(6); }}
            className="grid grid-cols-4 gap-2.5 md:gap-6 max-w-lg mx-auto bg-white/70 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white/60 cursor-pointer transform hover:scale-102 hover:shadow-rose-200/50 active:scale-98 transition-all duration-300 group relative"
          >
            <div className="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
              ¡Tócame! ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-rose-500 tracking-tight">{tiempo.dias}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-400 mt-1">Días</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-purple-500 tracking-tight">{tiempo.horas}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-400 mt-1">Horas</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-pink-500 tracking-tight">{tiempo.minutos}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-400 mt-1">Min</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-amber-500 tracking-tight animate-pulse">{tiempo.segundos}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-400 mt-1">Seg</span>
            </div>
          </div>
          {clickContador > 0 && (
            <p className="text-xs text-rose-400 font-bold mt-3 animate-fade-in">¡Has lanzado {clickContador * 6} corazones! ❤️</p>
          )}
        </div>

        <div className="absolute bottom-8 flex flex-col items-center text-rose-400 font-bold opacity-80 animate-bounce">
          <span className="text-[11px] uppercase tracking-widest mb-1.5">Desliza para la aventura</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* HISTORIA EN NÚMEROS */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none"></div>
          <div>
            <span className="text-4xl">☕</span>
            <h4 className="text-3xl font-black mt-2">1,000+</h4>
            <p className="text-rose-100 text-xs uppercase font-bold tracking-wider mt-1">Risas compartidas</p>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-white/20 py-6 md:py-0">
            <span className="text-4xl">📞</span>
            <h4 className="text-3xl font-black mt-2">Incontables</h4>
            <p className="text-rose-100 text-xs uppercase font-bold tracking-wider mt-1">Horas conversando</p>
          </div>
          <div>
            <span className="text-4xl">💫</span>
            <h4 className="text-3xl font-black mt-2">Infinito</h4>
            <p className="text-rose-100 text-xs uppercase font-bold tracking-wider mt-1">Amor por delante</p>
          </div>
        </div>
      </section>

      {/* 2. LÍNEA DEL TIEMPO INTERACTIVA EN CADENA */}
      <section className="max-w-4xl mx-auto px-4 py-24 relative">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">Nuestra Galería de Recuerdos</h2>
          <p className="text-slate-500 mt-2 font-medium">Desbloquea y abre cada capítulo en orden cronológico 🗝️</p>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-300 via-purple-300 to-amber-300 h-[85%] top-44 z-0"></div>

        {/* RECUERDO 1 */}
        <div className="relative z-10 flex flex-col items-center mb-24 w-full">
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-gradient-to-br from-rose-400 to-rose-500 text-white w-12 h-12 rounded-full shadow-xl border-4 border-white font-black text-base z-20">1</div>
          
          {!capitulo1Abierto ? (
            <button 
              onClick={() => { setCapitulo1Abierto(true); lanzarCorazones(12); }}
              className="mt-14 bg-white border-2 border-dashed border-rose-300 text-rose-500 font-bold px-8 py-4 rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              🔒 Abrir Capítulo 1: El Inicio de Todo
            </button>
          ) : (
            <div className="mt-14 flex flex-col md:flex-row items-center justify-between w-full animate-fade-in bg-white/40 p-6 rounded-[2rem] border border-white">
              <div className="w-full md:w-[45%] flex justify-center">
                <div className="bg-white p-4 pb-10 shadow-2xl rounded-sm transform -rotate-2 max-w-xs border border-slate-100 ring-1 ring-black/5">
                  <img src="/nuestro-aniversario/Nuestras-primera-foto.jpeg" alt="Nuestra primera foto" className="w-full h-64 object-cover rounded-sm mb-4" />
                  <p className="font-serif text-center text-slate-600 text-lg italic">"Donde mi mundo cambió... ❤️"</p>
                </div>
              </div>
              <div className="w-full md:w-[50%] text-center md:text-left mt-6 md:mt-0 px-2">
                <h3 className="text-2xl font-black text-rose-600 tracking-tight">El Primer Capítulo</h3>
                <p className="text-slate-600 mt-3 leading-relaxed font-medium text-sm md:text-base">
                  Aún recuerdo perfectamente los nervios de ese día. El corazón me iba a mil por hora cuando nos subimos a ese bus. Tenía miedo de ser muy tímido, de no saber qué decir, pero en el momento en que cruzamos miradas y empezamos a conversar, toda la tensión desapareció. Ese viaje marcó un antes y un después absoluto en mi vida. Dejar a un lado los temores para dar paso a lo más bonito que me ha pasado: nosotros. Hoy celebramos 7 meses de haber tomado la mejor decisión.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RECUERDO 2 */}
        <div className="relative z-10 flex flex-col items-center mb-24 w-full">
          <div className={`absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white w-12 h-12 rounded-full shadow-xl border-4 border-white font-black text-base z-20 ${capitulo1Abierto ? 'bg-gradient-to-br from-purple-400 to-purple-500' : 'bg-slate-300'}`}>2</div>
          
          {!capitulo2Abierto ? (
            <button 
              disabled={!capitulo1Abierto}
              onClick={() => { setCapitulo2Abierto(true); lanzarCorazones(12); }}
              className={`mt-14 font-bold px-8 py-4 rounded-2xl shadow-md transition-all duration-300 ${capitulo1Abierto ? 'bg-white border-2 border-dashed border-purple-300 text-purple-500 hover:scale-105 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'}`}
            >
              {capitulo1Abierto ? "🔒 Abrir Capítulo 2: Nuestro Refugio" : "🔒 Bloqueado (Abre el Capítulo 1 primero)"}
            </button>
          ) : (
            <div className="mt-14 flex flex-col md:flex-row items-center justify-between w-full animate-fade-in bg-white/40 p-6 rounded-[2rem] border border-white">
              <div className="w-full md:w-[50%] text-center md:text-left order-2 md:order-1 px-2">
                <h3 className="text-2xl font-black text-purple-600 tracking-tight">Tus Abrazos, Mi Refugio</h3>
                <p className="text-slate-600 mt-3 leading-relaxed font-medium text-sm md:text-base">
                  Si tuviera que elegir un solo lugar en todo el universo para quedarme a vivir para siempre, elegiría el espacio que se forma entre tus brazos. No importa qué tan estresante o complicado haya sido mi día, ni qué problemas tenga en la cabeza; cuando me acerco a ti, te abrazo fuerte y siento tu respiración, todo lo malo desaparece por completo. Me devuelves la calma, reinicias mis días tristes y me recuerdas que, estando juntos, somos invencibles. Eres mi hogar, mi paz y mi refugio favorito.
                </p>
              </div>
              <div className="w-full md:w-[45%] flex justify-center order-1 md:order-2 mb-6 md:mb-0">
                <div className="bg-slate-950 overflow-hidden shadow-2xl rounded-[2rem] w-full max-w-xs aspect-[9/16] border-4 border-white transform rotate-2">
                  <video src="/nuestro-aniversario/Primer-video.mp4" controls loop muted className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RECUERDO 3 */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className={`absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white w-12 h-12 rounded-full shadow-xl border-4 border-white font-black text-base z-20 ${capitulo2Abierto ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-slate-300'}`}>3</div>
          
          {!capitulo3Abierto ? (
            <button 
              disabled={!capitulo2Abierto}
              onClick={() => { setCapitulo3Abierto(true); lanzarCorazones(15); }}
              className={`mt-14 font-bold px-8 py-4 rounded-2xl shadow-md transition-all duration-300 ${capitulo2Abierto ? 'bg-white border-2 border-dashed border-amber-300 text-amber-600 hover:scale-105 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'}`}
            >
              {capitulo2Abierto ? "🔒 Abrir Capítulo 3: Instantes Eternos" : "🔒 Bloqueado (Abre el Capítulo 2 primero)"}
            </button>
          ) : (
            <div className="mt-14 flex flex-col md:flex-row items-center justify-between w-full animate-fade-in bg-white/40 p-6 rounded-[2rem] border border-white">
              <div className="w-full md:w-[45%] flex flex-col gap-5 items-center justify-center">
                <div className="bg-white p-3 shadow-xl rounded-2xl max-w-[230px] border border-slate-100 transform rotate-2">
                  <video src="/nuestro-aniversario/Primera foto.MOV" controls loop muted className="rounded-xl w-full h-40 object-cover" />
                </div>
                <div className="bg-white p-3 shadow-xl rounded-2xl max-w-[230px] border border-slate-100 transform -rotate-2 md:ml-12">
                  <video src="/nuestro-aniversario/Segunda foto.MOV" controls loop muted className="rounded-xl w-full h-40 object-cover" />
                </div>
              </div>
              <div className="w-full md:w-[50%] text-center md:text-left mt-6 md:mt-0 px-2">
                <h3 className="text-2xl font-black text-amber-600 tracking-tight">Coleccionando Sonrisas</h3>
                <p className="text-slate-600 mt-3 leading-relaxed font-medium text-sm md:text-base">
                  Me encanta mirar estas pequeñas grabaciones y fotos vivas porque capturan nuestra esencia más pura y natural. Sin poses, sin filtros complicados, solo tú y yo riéndonos de cualquier tontería, mirándonos con complicidad y disfrutando el momento. Cada segundo que guardamos en la galería de mi teléfono es un tesoro inmenso. Ver lo felices que nos hacemos mutuamente me llena el alma por completo. ¡Es hermoso ver todo lo que hemos construido en estos siete meses!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CUATRO CARTAS DE AMOR SECRETAS */}
      <section className="bg-gradient-to-r from-rose-100/40 via-purple-100/40 to-amber-100/40 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-3xl animate-pulse inline-block">✉️</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mt-2">Nuestros Sobres Secretos</h2>
            <p className="text-slate-500 mt-1 font-medium">Haz clic en cada sobre para revelar las palabras que guardo para ti</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* CARTA 1 */}
            <div 
              onClick={() => { setCartaAbierta(cartaAbierta === 1 ? null : 1); lanzarCorazones(6); }}
              className={`bg-white p-5 rounded-[2rem] shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-72 relative overflow-hidden ${cartaAbierta === 1 ? 'border-rose-400 ring-4 ring-rose-100 scale-102' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {cartaAbierta === 1 ? (
                <div className="animate-fade-in px-1 overflow-y-auto max-h-full">
                  <h4 className="font-extrabold text-rose-500 mb-2 text-base">Lo que más amo de ti...</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Amo absolutamente todo de ti. Tu forma tan única de mirar la vida, la manera mágica en la que logras hacerme sonreír incluso en mis peores días, tu carita, tus detalles, y la increíble calidez que me transmite tu presencia. Eres mi musa, mi compañera de aventuras y la persona con la que quiero compartir cada momento.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-2xl mb-4 shadow-sm">💖</div>
                  <h4 className="font-bold text-slate-700 text-sm">Razón #1</h4>
                  <span className="text-[10px] text-rose-400 mt-3 font-bold bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">Revelar</span>
                </div>
              )}
            </div>

            {/* CARTA 2 */}
            <div 
              onClick={() => { setCartaAbierta(cartaAbierta === 2 ? null : 2); lanzarCorazones(6); }}
              className={`bg-white p-5 rounded-[2rem] shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-72 relative overflow-hidden ${cartaAbierta === 2 ? 'border-purple-400 ring-4 ring-purple-100 scale-102' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {cartaAbierta === 2 ? (
                <div className="animate-fade-in px-1 overflow-y-auto max-h-full">
                  <h4 className="font-extrabold text-purple-500 mb-2 text-base">Gracias por tanto...</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Gracias por tu paciencia infinita, por no soltarme la mano cuando las cosas se ponen difíciles, por escuchar cada una de mis preocupaciones y por llenarme de mimos sinceros. Gracias por elegirme como tu novio día tras día a lo largo de estos siete meses llenos de aprendizajes hermosos.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-2xl mb-4 shadow-sm">🌸</div>
                  <h4 className="font-bold text-slate-700 text-sm">Razón #2</h4>
                  <span className="text-[10px] text-purple-400 mt-3 font-bold bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">Revelar</span>
                </div>
              )}
            </div>

            {/* CARTA 3 */}
            <div 
              onClick={() => { setCartaAbierta(cartaAbierta === 3 ? null : 3); lanzarCorazones(6); }}
              className={`bg-white p-5 rounded-[2rem] shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-72 relative overflow-hidden ${cartaAbierta === 3 ? 'border-amber-400 ring-4 ring-amber-100 scale-102' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {cartaAbierta === 3 ? (
                <div className="animate-fade-in px-1 overflow-y-auto max-h-full">
                  <h4 className="font-extrabold text-amber-600 mb-2 text-base">Nuestro Mañana</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Siete meses son maravillosos, pero sé en el fondo de mi corazón que esto es solo el primer capítulo de un libro eterno. Me emociona infinitamente pensar en los viajes que nos quedan por hacer, las metas profesionales y personales que celebraremos juntos, los cafés matutinos y los miles de recuerdos que nos faltan retratar.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-2xl mb-4 shadow-sm">✨</div>
                  <h4 className="font-bold text-slate-700 text-sm">Nuestro Futuro</h4>
                  <span className="text-[10px] text-amber-500 mt-3 font-bold bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">Revelar</span>
                </div>
              )}
            </div>

            {/* CARTA 4: LA NOTA DE TU CORAZÓN */}
            <div 
              onClick={() => { setCartaAbierta(cartaAbierta === 4 ? null : 4); lanzarCorazones(10); }}
              className={`p-5 rounded-[2rem] shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-72 relative overflow-hidden ${cartaAbierta === 4 ? 'bg-rose-50 border-rose-400 ring-4 ring-rose-200 scale-102 shadow-2xl' : 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200 hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {cartaAbierta === 4 ? (
                <div className="animate-fade-in px-1 overflow-y-auto max-h-full">
                  <h4 className="font-extrabold text-rose-600 mb-1 text-sm tracking-tight">Desde lo más profundo de mi alma...</h4>
                  <p className="text-[11px] text-slate-700 font-medium italic leading-relaxed">
                    "Sé que este último mes, nuestro sexto mes juntos, pasamos de todo. Cometí muchos errores y no siempre fui perfecto, pero quiero que sepas que mi deseo más grande es ser mejor para ti. Perdón si a veces sientes que soy muy poco, pero te prometo que me esforzaré el doble cada día para hacerte la persona más feliz del mundo."
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl mb-4 shadow-md animate-pulse">❤️‍🩹</div>
                  <h4 className="font-extrabold text-rose-700 text-sm">Una Nota Especial</h4>
                  <p className="text-[10px] text-rose-500 font-bold mt-1">Solo para tus ojos</p>
                  <span className="text-[10px] text-white mt-2 font-bold bg-rose-500 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Abrir Carta</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN FINAL CON JUEGO DINÁMICO Y TICKET DORADO */}
      <section className="py-28 px-4 text-center max-w-2xl mx-auto relative z-20 min-h-[500px] flex flex-col items-center justify-center">
        {!juegoGanado ? (
          <div className="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white shadow-2xl w-full max-w-xl animate-fade-in">
            <span className="text-4xl mb-4 block">🥺</span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">Una Última Pregunta...</h3>
            <p className="text-slate-600 text-sm md:text-base mb-10 font-medium">
              ¿Me dejarías seguir haciéndote la mujer más feliz del universo por el resto de nuestros meses y años? 🧸
            </p>

            <div className="flex items-center justify-center gap-6 h-16 relative">
              {/* BOTÓN SÍ */}
              <button 
                onClick={presionarSi}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-10 py-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 tracking-wider text-base uppercase z-10"
              >
                ¡SÍ, OBVIO! 💖
              </button>

              {/* BOTÓN NO CON TRAMPA ESCAPISTA */}
              <button 
                onMouseEnter={moverBotonNo}
                onClick={moverBotonNo}
                style={{
                  transform: `translate(${noPosicion.x}px, ${noPosicion.y}px)`,
                  transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
                className="bg-slate-200 text-slate-500 font-bold px-6 py-3 rounded-full text-sm shadow-md cursor-pointer whitespace-nowrap"
              >
                {haIntentadoNo ? "¡Oye, aquí no! 😜" : "No, gracias"}
              </button>
            </div>
          </div>
        ) : (
          /* PANTALLA DE CLÍMAX DEFINITIVO */
          <div className="w-full max-w-xl animate-fade-in flex flex-col items-center">
            <div className="bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white p-8 md:p-10 rounded-[3rem] shadow-2xl border border-rose-300 relative overflow-hidden mb-8 w-full">
              <div className="absolute -right-10 -top-10 text-9xl opacity-10">✨</div>
              <span className="text-5xl mb-4 block animate-bounce">👑</span>
              <h3 className="text-3xl font-black tracking-tight mb-3">¡Sabía que dirías que SÍ!</h3>
              <p className="text-sm md:text-base text-rose-50 font-medium leading-relaxed mb-0">
                Gracias por darme la oportunidad de amarte cada día más. Prometo cuidarte, escucharte, hacerte reír a carcajadas y construir un futuro hermoso de tu mano. ¡Eres el amor de mi vida! 🪐
              </p>
            </div>

            {/* RECOMPENSA DE GANADORA: TICKET DIGITAL PERSONALIZADO */}
            <div className="bg-amber-50 border-4 border-dashed border-amber-400 p-6 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
              <div className="absolute top-1/2 -left-3 w-6 h-6 bg-rose-50 rounded-full border-r-4 border-amber-400 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-rose-50 rounded-full border-l-4 border-amber-400 transform -translate-y-1/2"></div>
              
              <div className="border-b-2 border-dashed border-amber-300 pb-4 text-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 block mb-1">Pase Oficial de San Valentín & Aniversario</span>
                <h4 className="text-xl font-black text-amber-800 tracking-tight">🎟️ TICKET DEL AMOR INFINITO</h4>
              </div>

              <div className="py-5 text-left space-y-2 text-xs md:text-sm text-amber-900 font-mono">
                <p><span className="font-sans font-bold text-slate-500">PASAJERA:</span> El amor de mi vida</p>
                <p><span className="font-sans font-bold text-slate-500">CAPITÁN:</span> Antonio</p>
                <p><span className="font-sans font-bold text-slate-500">VALIDEZ:</span> Para toda la eternidad ∞</p>
                <p><span className="font-sans font-bold text-slate-500">BENEFICIO:</span> Besos ilimitados, abrazos infinitos y apoyo incondicional.</p>
              </div>

              <div className="bg-amber-100 p-3 rounded-xl text-center text-[10px] md:text-xs font-bold text-amber-800">
                📸 ¡Tómale captura de pantalla a tu boleto oficial!
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-14 font-medium italic">
              Diseñado con todo mi corazón. Felices 7 meses.
            </p>
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-110vh) rotate(360deg) scale(1.2); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}