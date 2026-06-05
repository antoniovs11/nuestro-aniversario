'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const fechaInicio = new Date(2025, 10, 4, 0, 0, 0); 

  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [cartaAbierta, setCartaAbierta] = useState(null);
  const [corazones, setCorazones] = useState([]);
  const [mostrarIntro, setMostrarIntro] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [clickContador, setClickContador] = useState(0);
  const audioRef = useRef(null);

  const [capitulo1Abierto, setCapitulo1Abierto] = useState(false);
  const [capitulo2Abierto, setCapitulo2Abierto] = useState(false);
  const [capitulo3Abierto, setCapitulo3Abierto] = useState(false);

  const [noPosicion, setNoPosicion] = useState({ x: 0, y: 0 });
  const [haIntentadoNo, setHaIntentadoNo] = useState(false);
  const [juegoGanado, setJuegoGanado] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const diferencia = ahora - fechaInicio;
      setTiempo({
        dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((diferencia % (1000 * 60)) / 1000)
      });
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
      delay: Math.random() * 0.5,
      size: Math.random() * (30 - 12) + 12,
      duracion: Math.random() * (6 - 4) + 4,
    }));
    setCorazones(prev => [...prev, ...nuevosCorazones]);
    setTimeout(() => {
      setCorazones(prev => prev.slice(cantidad));
    }, 6000);
  };

  const moverBotonNo = () => {
    setHaIntentadoNo(true);
    const randomX = Math.random() * (140 - (-140)) + (-140);
    const randomY = Math.random() * (100 - (-100)) + (-100);
    setNoPosicion({ x: randomX, y: randomY });
    lanzarCorazones(2);
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#fff5f5] via-[#fff0f3] to-[#fef6e4] text-slate-800 font-sans overflow-x-hidden relative selection:bg-rose-200 scroll-smooth">
      
      {/* FONTO TEXTURIZADO ATENUADO */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <audio ref={audioRef} src="/nuestro-aniversario/nuestra-cancion.mp3" loop />

      {/* 0. PANTALLA DE INTRODUCCIÓN ESTILO CARTA DE REGALO */}
      {mostrarIntro && (
        <div className="fixed inset-0 bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 z-[9999] flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] max-w-md mx-auto transform animate-pulse-slow z-10">
            <span className="text-6xl mb-6 block drop-shadow-lg animate-bounce">✉️</span>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3 drop-shadow-sm">Para: El Amor de Mi Vida</h2>
            <p className="text-rose-50 text-sm md:text-base mb-8 leading-relaxed font-medium">
              Hola mi cielo. Diseñé este espacio secreto para recordarte lo hermoso que es tenerte a mi lado. ¿Me acompañas a ver nuestra historia?
            </p>
            <button
              onClick={iniciarExperiencia}
              className="bg-white text-rose-600 font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-[0_10px_20px_rgba(244,63,94,0.2)] hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all duration-300 border-b-4 border-rose-200"
            >
              Abrir mi Regalo ✨
            </button>
          </div>
        </div>
      )}

      {/* BOTÓN MÚSICA ESTILO VINILO */}
      {!mostrarIntro && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <button 
            onClick={ControlarMusica} 
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 ${reproduciendo ? 'bg-rose-500 text-white border-rose-400' : 'bg-white text-slate-700 border-slate-200'}`}
            style={{ animation: reproduciendo ? 'spin 6s linear infinite' : 'none' }}
          >
            {reproduciendo ? '🎵' : '🔇'}
          </button>
        </div>
      )}

      {/* LLUVIA DE CORAZONES SUAVES */}
      {corazones.map((corazon) => (
        <span
          key={corazon.id}
          className="absolute pointer-events-none z-50 select-none opacity-60 filter drop-shadow-sm"
          style={{
            left: `${corazon.left}%`,
            bottom: '-50px',
            fontSize: `${corazon.size}px`,
            animation: `floatUp ${corazon.duracion}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
            animationDelay: `${corazon.delay}s`,
            position: 'fixed'
          }}
        >
          ❤️
        </span>
      ))}

      {/* 1. PORTADA PRINCIPAL (MENOS SECA, MÁS ORGÁNICA) */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff5f5] z-10"></div>
        
        <div className="z-20 max-w-2xl px-4 animate-reveal">
          <span className="inline-block text-[11px] uppercase tracking-widest text-rose-600 font-black bg-rose-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-rose-200 shadow-sm animate-pulse">
            Nuestra Línea de Tiempo Mágica ✨
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight leading-none mb-6">
            Felices <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">7 Meses</span>,<br/>Princesa
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
            Cada segundo a tu lado es una nueva página de amor. Mira cuánto tiempo lleva latiendo mi corazón por ti:
          </p>

          {/* CONTADOR EN CUADRO FLOTANTE ESTILO DIARIO */}
          <div 
            onClick={() => { setClickContador(c => c + 1); lanzarCorazones(8); }}
            className="grid grid-cols-4 gap-3 md:gap-5 max-w-md mx-auto bg-white p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(244,63,94,0.08)] active:scale-98 transition-all duration-500 group relative"
          >
            <div className="absolute -top-2.5 right-6 bg-rose-500 text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full opacity-80 shadow-sm">
              Tócame ⭐
            </div>
            <div className="bg-rose-50/50 p-2 rounded-2xl"><span className="text-2xl md:text-4xl font-black text-rose-500 block">{tiempo.dias}</span><span className="text-[9px] uppercase font-bold text-slate-400">Días</span></div>
            <div className="bg-purple-50/50 p-2 rounded-2xl"><span className="text-2xl md:text-4xl font-black text-purple-500 block">{tiempo.horas}</span><span className="text-[9px] uppercase font-bold text-slate-400">Horas</span></div>
            <div className="bg-pink-50/50 p-2 rounded-2xl"><span className="text-2xl md:text-4xl font-black text-pink-500 block">{tiempo.minutos}</span><span className="text-[9px] uppercase font-bold text-slate-400">Min</span></div>
            <div className="bg-amber-50/50 p-2 rounded-2xl"><span className="text-2xl md:text-4xl font-black text-amber-500 block animate-pulse">{tiempo.segundos}</span><span className="text-[9px] uppercase font-bold text-slate-400">Seg</span></div>
          </div>
        </div>

        <div className="absolute bottom-10 z-20 flex flex-col items-center text-slate-400 font-bold opacity-60 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest mb-1">Desliza para descubrir</span>
          <span>👇</span>
        </div>
      </section>

      {/* 2. LÍNEA DEL TIEMPO EN CADENA (CON DISEÑO EFECTO PAPEL) */}
      <section className="max-w-3xl mx-auto px-4 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Nuestros Recuerdos Guardados</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Debes abrir un capítulo para desbloquear el siguiente... ✨</p>
        </div>

        {/* Línea central sutil */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-200 via-purple-200 to-amber-200 h-[80%] top-44 z-0"></div>

        {/* CAPÍTULO 1 */}
        <div className="relative z-10 flex flex-col items-center mb-20 w-full">
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-rose-400 text-white w-9 h-9 rounded-full shadow-md border-4 border-white flex items-center justify-center font-bold text-xs z-20">1</div>
          
          {!capitulo1Abierto ? (
            <button 
              onClick={() => { setCapitulo1Abierto(true); lanzarCorazones(12); }}
              className="mt-12 bg-white hover:bg-rose-50/30 text-rose-500 border border-rose-200 font-extrabold px-6 py-3.5 rounded-full shadow-sm hover:scale-103 active:scale-98 transition-all duration-300 text-xs uppercase tracking-wider"
            >
              🔓 Abrir Capítulo 1: El Inicio de Todo
            </button>
          ) : (
            <div className="mt-12 w-full bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row gap-6 items-center animate-fold-open">
              <div className="w-full md:w-[40%] flex justify-center">
                {/* Cuadro Polarod con cinta washi */}
                <div className="bg-white p-3 pb-8 shadow-xl rounded-sm transform -rotate-2 border border-slate-100 relative group max-w-[200px]">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-200/60 w-16 h-4 rotate-1 pointer-events-none"></div>
                  <img src="/nuestro-aniversario/Nuestras-primera-foto.jpeg" alt="Nuestra primera foto" className="w-full h-48 object-cover rounded-xs" />
                  <p className="font-serif text-center text-slate-500 text-xs italic mt-3">"Donde todo cambió..."</p>
                </div>
              </div>
              <div className="w-full md:w-[60%] px-2">
                <h3 className="text-xl font-black text-rose-500 tracking-tight mb-2">El Primer Viaje</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-xs md:text-sm">
                  Aún recuerdo perfectamente los nervios de ese día. El corazón me iba a mil por hora cuando nos subimos a ese bus. Tenía miedo de ser muy tímido, de no saber qué decir, pero en el momento en que cruzamos miradas y empezamos a conversar, toda la tensión desapareció. Ese viaje marcó un antes y un después absoluto en mi vida. Dejar a un lado los temores para dar paso a lo más bonito que me ha pasado: nosotros. Hoy celebramos 7 meses de haber tomado la mejor decisión.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CAPÍTULO 2 */}
        <div className="relative z-10 flex flex-col items-center mb-20 w-full">
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full shadow-md border-4 border-white flex items-center justify-center font-bold text-xs z-20 ${capitulo1Abierto ? 'bg-purple-400 text-white' : 'bg-slate-200 text-slate-400'}`}>2</div>
          
          {!capitulo2Abierto ? (
            <button 
              disabled={!capitulo1Abierto}
              onClick={() => { setCapitulo2Abierto(true); lanzarCorazones(12); }}
              className={`mt-12 font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-sm ${capitulo1Abierto ? 'bg-white text-purple-500 border border-purple-200 hover:scale-103 active:scale-98' : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'}`}
            >
              {capitulo1Abierto ? "🔒 Abrir Capítulo 2: Nuestro Refugio" : "Capítulo 2 Bloqueado"}
            </button>
          ) : (
            <div className="mt-12 w-full bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row gap-6 items-center animate-fold-open">
              <div className="w-full md:w-[60%] px-2 order-2 md:order-1">
                <h3 className="text-xl font-black text-purple-500 tracking-tight mb-2">Tus Abrazos, Mi Paz</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-xs md:text-sm">
                  Si tuviera que elegir un solo lugar en todo el universo para quedarme a vivir para siempre, elegiría el espacio que se forma entre tus brazos. No importa qué tan estresante o complicado haya sido mi día, ni qué problemas tenga en la cabeza; cuando me acerco a ti, te abrazo fuerte y siento tu respiración, todo lo malo desaparece por completo. Me devuelves la calma, reinicias mis días tristes y me recuerdas que, estando juntos, somos invencibles. Eres mi hogar, mi paz y mi refugio favorito.
                </p>
              </div>
              <div className="w-full md:w-[40%] flex justify-center order-1 md:order-2">
                <div className="bg-slate-950 overflow-hidden shadow-xl rounded-2xl w-full max-w-[160px] aspect-[9/16] border-4 border-white transform rotate-2 relative">
                  <div className="absolute -top-2 left-4 bg-amber-200/50 w-10 h-3 -rotate-12 pointer-events-none z-10"></div>
                  <video src="/nuestro-aniversario/Primer-video.mp4" controls loop muted className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CAPÍTULO 3 */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full shadow-md border-4 border-white flex items-center justify-center font-bold text-xs z-20 ${capitulo2Abierto ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-400'}`}>3</div>
          
          {!capitulo3Abierto ? (
            <button 
              disabled={!capitulo2Abierto}
              onClick={() => { setCapitulo3Abierto(true); lanzarCorazones(15); }}
              className={`mt-12 font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-sm ${capitulo2Abierto ? 'bg-white text-amber-600 border border-amber-200 hover:scale-103 active:scale-98' : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'}`}
            >
              {capitulo2Abierto ? "🔒 Abrir Capítulo 3: Instantes Eternos" : "Capítulo 3 Bloqueado"}
            </button>
          ) : (
            <div className="mt-12 w-full bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row gap-6 items-center animate-fold-open">
              <div className="w-full md:w-[40%] flex flex-col gap-4 items-center justify-center">
                <div className="bg-white p-2 shadow-md rounded-xl max-w-[150px] border border-slate-100 transform rotate-2 relative">
                  <video src="/nuestro-aniversario/Primera foto.MOV" controls loop muted className="rounded-lg w-full h-28 object-cover" />
                </div>
                <div className="bg-white p-2 shadow-md rounded-xl max-w-[150px] border border-slate-100 transform -rotate-3 md:ml-6 relative">
                  <video src="/nuestro-aniversario/Segunda foto.MOV" controls loop muted className="rounded-lg w-full h-28 object-cover" />
                </div>
              </div>
              <div className="w-full md:w-[60%] px-2">
                <h3 className="text-xl font-black text-amber-600 tracking-tight mb-2">Coleccionando Sonrisas</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-xs md:text-sm">
                  Me encanta mirar estas pequeñas grabaciones y fotos vivas porque capturan nuestra esencia más pura y natural. Sin poses, sin filtros complicados, solo tú y yo riéndonos de cualquier tontería, mirándonos con complicidad y disfrutando el momento. Cada segundo que guardamos en la galería de mi teléfono es un tesoro inmenso. Ver lo felices que nos hacemos mutuamente me llena el alma por completo. ¡Es hermoso ver todo lo que hemos construido en estos siete meses!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CARTAS DE AMOR DIGITALES (CON ANIMACIÓN DE LEVANTAMIENTO) */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Sobres del Corazón 💌</h2>
            <p className="text-slate-400 text-xs mt-1 font-medium">Toca un sobre para leer lo que guarda dentro</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[ 
              { id: 1, title: 'Razón #1', color: 'rose', icon: '💖', h: 'Lo que más amo de ti...', text: 'Amo absolutamente todo de ti. Tu forma tan única de mirar la vida, la manera mágica en la que logras hacerme sonreír incluso en mis peores días, tu carita, tus detalles, y la increíble calidez que me transmite tu presencia. Eres mi musa, mi compañera de aventuras y la persona con la que quiero compartir cada momento.' },
              { id: 2, title: 'Razón #2', color: 'purple', icon: '🌸', h: 'Gracias por tanto...', text: 'Gracias por tu paciencia infinita, por no soltarme la mano cuando las cosas se ponen difíciles, por escuchar cada una de mis preocupaciones y por llenarme de mimos sinceros. Gracias por elegirme como tu novio día tras día a lo largo de estos siete meses llenos de aprendizajes hermosos.' },
              { id: 3, title: 'Nuestro Mañana', color: 'amber', icon: '✨', h: 'Nuestro Futuro', text: 'Siete meses son maravillosos, pero sé en el fondo de mi corazón que esto es solo el primer capítulo de un libro eterno. Me emociona infinitamente pensar en los viajes que nos quedan por hacer, las metas profesionales y personales que celebraremos juntos, los cafés matutinos y los miles de recuerdos que nos faltan retratar.' },
              { id: 4, title: 'Una Nota Especial', color: 'rose-intense', icon: '❤️‍🩹', h: 'Desde mi alma...', text: '"Sé que este último mes, nuestro sexto mes juntos, pasamos de todo. Cometí muchos errores y no siempre fui perfecto, pero quiero que sepas que mi deseo más grande es ser mejor para ti. Perdón si a veces sientes que soy muy poco, pero te prometo que me esforzaré el doble cada día para hacerte la persona más feliz del mundo."', special: true }
            ].map((card) => {
              const isOpen = cartaAbierta === card.id;
              return (
                <div 
                  key={card.id}
                  onClick={() => { setCartaAbierta(isOpen ? null : card.id); lanzarCorazones(isOpen ? 2 : 6); }}
                  className={`bg-white p-5 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-64 relative overflow-hidden ${
                    isOpen 
                      ? 'border-rose-300 ring-4 ring-rose-50/50 scale-102 bg-radial-card' 
                      : 'border-slate-100 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {isOpen ? (
                    <div className="animate-reveal px-1 overflow-y-auto max-h-full">
                      <h4 className="font-extrabold text-slate-800 mb-1.5 text-xs uppercase tracking-wider">{card.h}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">{card.text}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4 shadow-inner ${card.special ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-50'}`}>{card.icon}</div>
                      <h4 className="font-black text-slate-700 text-xs uppercase tracking-wider">{card.title}</h4>
                      <span className="text-[9px] text-slate-400 mt-2 font-bold bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest group-hover:bg-slate-100">Leer</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN FINAL INTERACTIVA (EL BOTÓN TRAMPA Y TICKET DE LUJO) */}
      <section className="py-24 px-4 text-center max-w-xl mx-auto relative z-20 min-h-[450px] flex flex-col items-center justify-center">
        {!juegoGanado ? (
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 w-full animate-reveal">
            <span className="text-3xl mb-3 block">🥺</span>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mb-2">Una Última Pregunta...</h3>
            <p className="text-slate-500 text-xs md:text-sm mb-8 font-medium leading-relaxed">
              ¿Me dejarías seguir haciéndote la mujer más feliz del universo por el resto de nuestros meses y años? 🧸
            </p>

            <div className="flex items-center justify-center gap-4 h-14 relative">
              <button 
                onClick={() => { setJuegoGanado(true); lanzarCorazones(60); }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-8 py-3.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 text-xs uppercase tracking-widest z-10 border-b-4 border-emerald-600"
              >
                ¡SÍ, OBVIO! 💖
              </button>

              <button 
                onMouseEnter={moverBotonNo}
                onClick={moverBotonNo}
                style={{
                  transform: `translate(${noPosicion.x}px, ${noPosicion.y}px)`,
                  transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                className="bg-slate-100 text-slate-400 font-bold px-5 py-2.5 rounded-full text-xs shadow-xs cursor-pointer whitespace-nowrap select-none border border-slate-200/40"
              >
                {haIntentadoNo ? "¡No se puede! 😜" : "No, gracias"}
              </button>
            </div>
          </div>
        ) : (
          /* TICKET TOTALMENTE REDISEÑADO CON ESTILO VINTAGE / DIGITAL */
          <div className="w-full animate-scale-up flex flex-col items-center">
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-6 w-full border border-purple-900/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              <span className="text-4xl mb-3 block animate-bounce">👑</span>
              <h3 className="text-2xl font-black tracking-tight mb-2">¡Sabía que dirías que SÍ!</h3>
              <p className="text-xs md:text-sm text-purple-200 font-medium leading-relaxed">
                Gracias por darme el honor de cuidarte y amarte. Prometo esforzarme cada día por ser el novio que te mereces, hacerte reír y construir un camino hermoso juntos. Eres mi todo. 🪐
              </p>
            </div>

            {/* TICKET PREMIUM TIPO BOLETO DE EMBARQUE */}
            <div className="bg-[#fdfbf7] border-2 border-[#e6dfd3] p-5 rounded-2xl shadow-xl max-w-sm w-full relative transform rotate-1 hover:rotate-0 transition-transform duration-500 border-t-8 border-t-amber-400">
              {/* Entalladuras laterales de ticket */}
              <div className="absolute top-1/2 -left-3 w-5 h-5 bg-[#fff5f5] rounded-full border-r-2 border-[#e6dfd3] transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-3 w-5 h-5 bg-[#fff5f5] rounded-full border-l-2 border-[#e6dfd3] transform -translate-y-1/2"></div>
              
              <div className="border-b border-dashed border-slate-300 pb-3 text-center">
                <span className="text-[9px] uppercase font-black tracking-widest text-amber-600 block mb-0.5">Boarding Pass del Amor</span>
                <h4 className="text-base font-black text-slate-800 tracking-tight">🎟️ TICKET AL INFINITO</h4>
              </div>

              <div className="py-4 text-left space-y-2.5 text-xs font-mono text-slate-700">
                <div className="flex justify-between"><span className="text-slate-400 font-sans font-bold">PASAJERA:</span> <span className="font-bold text-slate-800">Mi Niña Hermosa</span></div>
                <div className="flex justify-between"><span className="text-slate-400 font-sans font-bold">CAPITÁN:</span> <span className="font-bold text-slate-800">Antonio</span></div>
                <div className="flex justify-between"><span className="text-slate-400 font-sans font-bold">DESTINO:</span> <span className="font-bold text-rose-500">Un Futuro Juntos</span></div>
                <div className="flex justify-between"><span className="text-slate-400 font-sans font-bold">VALIDEZ:</span> <span className="font-bold text-slate-800">Para Toda la Vida ∞</span></div>
                <div className="bg-amber-100/40 p-2.5 rounded-xl font-sans text-[10px] text-amber-900 leading-normal font-medium">
                  ✨ <strong>Beneficio Incluido:</strong> Abrazos que curan todo, besos infinitos en la frente y un novio orgulloso de ti.
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-center text-[10px] font-bold text-slate-400 tracking-wide uppercase">
                📸 ¡Tómale captura para canjearlo!
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-12 font-medium italic">
              Diseñado con todo el amor del mundo. Felices 7 meses.
            </p>
          </div>
        )}
      </section>

      {/* COMPORTAMIENTO DE ANIMACIONES MEJORADO EN CSS */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg) scale(0.7); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateY(-105vh) rotate(180deg) scale(1.1); opacity: 0; }
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(15px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes foldOpen {
          from { opacity: 0; transform: scaleY(0.9) translateY(10px); }
          to { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fold-open { animation: foldOpen 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scale-up { animation: scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
        .bg-radial-card { background: radial-gradient(circle at top, #fffafb, #ffffff); }
      `}</style>
    </main>
  );
}