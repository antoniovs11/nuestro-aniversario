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

  // FUNCIÓN PARA ENTRAR AL SITIO Y ACTIVAR LA MÚSICA Y LOS CORAZONES AL MISMO TIEMPO
  const iniciarExperiencia = () => {
    setMostrarIntro(false);
    setReproduciendo(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Error de audio:", err));
    }
    // Lluvia masiva inicial de celebración
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 text-slate-800 font-sans overflow-x-hidden relative selection:bg-rose-200">
      
      {/* ARCHIVO DE AUDIO */}
      <audio ref={audioRef} src="/nuestro-aniversario/nuestra-cancion.mp3" loop />

      {/* 0. PANTALLA DE INTRODUCCIÓN INTERACTIVA (EL BLOQUEO) */}
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

      {/* BOTÓN FLOTANTE DE MÚSICA (DISCO GIRATORIO) */}
      {!mostrarIntro && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <button 
            onClick={ControlarMusica} 
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${reproduciendo ? 'bg-rose-500 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
            style={{ animation: reproduciendo ? 'spin 4s linear infinite' : 'none' }}
          >
            {reproduciendo ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-pulse">
                <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3.33 3.33 0 0 0-1.5-.303c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V5.71l5.047.841a.75.75 0 0 1 .62.742v4.21a3.33 3.33 0 0 0-1.5-.303c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V3.125a.75.75 0 0 1 .498-.707l-15-5a.75.75 0 0 1-.498.707v13.178a3.33 3.33 0 0 0-1.5-.303c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V1.651a.75.75 0 0 1 .952-.72l15 5ZM6 18.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5S8.328 20 7.5 20 6 19.328 6 18.5Zm12 0c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5s-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* EFECTO DE LLUVIA DE CORAZONES DINÁMICOS */}
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

      {/* 1. PORTADA PRINCIPAL (CON JUEGO DE CLICS EN EL CONTADOR) */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-105 blur-[1.5px] opacity-20 transition-all duration-700" 
          style={{ backgroundImage: "url('/nuestro-aniversario/Nuestras-primera-foto.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-rose-50 via-transparent to-transparent z-0"></div>

        <div className="z-10 max-w-2xl px-4">
          <span className="inline-block text-xs uppercase tracking-widest text-rose-600 font-extrabold bg-rose-100/90 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 shadow-md animate-pulse">
            Siete meses inolvidables ✨
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 tracking-tight leading-none mb-6 drop-shadow-sm">
            Felices 7 Meses,<br/>Mi Amor
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-md mx-auto mb-10 font-medium">
            El tiempo vuela cuando estás al lado de la persona correcta. Mira cuánto ha crecido lo nuestro:
          </p>

          {/* CONTADOR INTERACTIVO (LANZA CORAZONES AL HACER CLIC) */}
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

      {/* NUEVA SECCIÓN DINÁMICA: NUESTRA HISTORIA EN NÚMEROS DIVERTIDOS */}
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

      {/* 2. LÍNEA DEL TIEMPO INTERACTIVA CON EFECTOS POLAROID EN ESPERA */}
      <section className="max-w-4xl mx-auto px-4 py-24 relative">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">Nuestra Galería de Recuerdos</h2>
          <p className="text-slate-500 mt-2 font-medium">Interactúa con cada recuerdo para revivir el momento</p>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-300 via-purple-300 to-amber-300 h-[82%] top-44 z-0"></div>

        {/* RECUERDO 1 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 md:mb-36 w-full group">
          <div className="w-full md:w-[45%] flex justify-center md:justify-end order-2 md:order-1">
            <div className="bg-white p-4 pb-10 shadow-2xl rounded-sm transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 max-w-xs border border-slate-100 relative ring-1 ring-black/5">
              <img src="/nuestro-aniversario/Nuestras-primera-foto.jpeg" alt="Nuestra primera foto" className="w-full h-64 object-cover rounded-sm mb-4 filter saturate-[1.05]" />
              <p className="font-serif text-center text-slate-600 text-lg italic">"Donde todo comenzó... ❤️"</p>
              <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-400">Capítulo 1</div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-gradient-to-br from-rose-400 to-rose-500 text-white w-12 h-12 rounded-full shadow-xl border-4 border-white font-black text-base order-1 md:order-2 my-4 md:my-0 group-hover:scale-110 transition-transform duration-300">1</div>
          <div className="w-full md:w-[45%] text-center md:text-left order-3 pl-0 md:pl-10">
            <h3 className="text-2xl font-black text-rose-600 tracking-tight">El Primer Capítulo</h3>
            <p className="text-slate-600 mt-3 leading-relaxed font-medium text-sm md:text-base">
              Ese viaje en bus donde mi mundo cambió por completo. Guardar la timidez a un lado y empezar a escribir esta bonita historia que hoy cumple 7 meses.
            </p>
          </div>
        </div>

        {/* RECUERDO 2 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 md:mb-36 w-full group">
          <div className="w-full md:w-[45%] text-center md:text-right order-3 md:order-1 pr-0 md:pr-10">
            <h3 className="text-2xl font-black text-purple-600 tracking-tight">Tus Abrazos, Mi Refugio</h3>
            <p className="text-slate-600 mt-3 leading-relaxed font-medium text-sm md:text-base">
              No importa qué tan oscuro o frío sea el día, encontrarte y fundirme en un abrazo tuyo reinicia todo lo malo. Eres mi paz y mi hogar favorito.
            </p>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-500 text-white w-12 h-12 rounded-full shadow-xl border-4 border-white font-black text-base order-1 my-4 md:my-0 group-hover:scale-110 transition-transform duration-300">2</div>
          <div className="w-full md:w-[45%] flex justify-center order-2">
            <div className="bg-slate-950 overflow-hidden shadow-2xl rounded-[2rem] w-full max-w-xs aspect-[9/16] border-4 border-white transform rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
              <video src="/nuestro-aniversario/Primer-video.mp4" controls loop muted className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* RECUERDO 3 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full group">
          <div className="w-full md:w-[45%] flex flex-col gap-5 items-center justify-end order-2 md:order-1">
            <div className="bg-white p-3 shadow-xl rounded-2xl max-w-[230px] border border-slate-100 transform rotate-2 group-hover:rotate-0 group-hover:-translate-x-2 transition-all duration-500">
              <video src="/nuestro-aniversario/Primera foto.MOV" controls loop muted className="rounded-xl w-full h-40 object-cover" />
            </div>
            <div className="bg-white p-3 shadow-xl rounded-2xl max-w-[230px] border border-slate-100 transform -rotate-2 group-hover:rotate-0 group-hover:translate-x-2 transition-all duration-500 md:ml-12">
              <video src="/nuestro-aniversario/Segunda foto.MOV" controls loop muted className="rounded-xl w-full h-40 object-cover" />
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-500 text-white w-12 h-12 rounded-full shadow-xl border-4 border-white font-black text-base order-1 md:order-2 my-4 md:my-0 group-hover:scale-110 transition-transform duration-300">3</div>
          <div className="w-full md:w-[45%] text-center md:text-left order-3 pl-0 md:pl-10">
            <h3 className="text-2xl font-black text-amber-600 tracking-tight">Coleccionando Sonrisas</h3>
            <p className="text-slate-600 mt-3 leading-relaxed font-medium text-sm md:text-base">
              Cada foto viva, cada risa capturada al azar, demuestra lo natural y mágico que es estar juntos. Adoro mirar atrás y ver cuánto nos divertimos juntos.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CARTAS DE AMOR SECRETAS CON EFECTO REVELACIÓN */}
      <section className="bg-gradient-to-r from-rose-100/40 via-purple-100/40 to-amber-100/40 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-3xl animate-pulse inline-block">✉️</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mt-2">Tres Mensajitos Especiales</h2>
            <p className="text-slate-500 mt-1 font-medium">Haz clic en cada sobre para revelar su interior</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              onClick={() => { setCartaAbierta(cartaAbierta === 1 ? null : 1); lanzarCorazones(8); }}
              className={`bg-white p-6 rounded-[2rem] shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-68 relative overflow-hidden ${cartaAbierta === 1 ? 'border-rose-400 ring-4 ring-rose-100 scale-105' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1.5'}`}
            >
              {cartaAbierta === 1 ? (
                <div className="animate-fade-in px-2">
                  <h4 className="font-extrabold text-rose-500 mb-2 text-lg">Lo que más amo de ti...</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    Amo tu forma de mirar el mundo, cómo me haces reír cuando tengo un mal día, y la increíble paz que me da recostar mi cabeza sobre ti. Eres arte pura.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-3xl mb-4 shadow-sm">💖</div>
                  <h4 className="font-bold text-slate-700">Razón #1</h4>
                  <span className="text-[11px] text-rose-400 mt-3 font-bold bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">Revelar</span>
                </div>
              )}
            </div>

            <div 
              onClick={() => { setCartaAbierta(cartaAbierta === 2 ? null : 2); lanzarCorazones(8); }}
              className={`bg-white p-6 rounded-[2rem] shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-68 relative overflow-hidden ${cartaAbierta === 2 ? 'border-purple-400 ring-4 ring-purple-100 scale-105' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1.5'}`}
            >
              {cartaAbierta === 2 ? (
                <div className="animate-fade-in px-2">
                  <h4 className="font-extrabold text-purple-500 mb-2 text-lg">Gracias por...</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    Gracias por tu paciencia infinita, por escucharme siempre, por los mimos, por no soltarme y por elegirme todos los días de estos 7 hermosos meses.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-3xl mb-4 shadow-sm">🌸</div>
                  <h4 className="font-bold text-slate-700">Razón #2</h4>
                  <span className="text-[11px] text-purple-400 mt-3 font-bold bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">Revelar</span>
                </div>
              )}
            </div>

            <div 
              onClick={() => { setCartaAbierta(cartaAbierta === 3 ? null : 3); lanzarCorazones(8); }}
              className={`bg-white p-6 rounded-[2rem] shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-68 relative overflow-hidden ${cartaAbierta === 3 ? 'border-amber-400 ring-4 ring-amber-100 scale-105' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1.5'}`}
            >
              {cartaAbierta === 3 ? (
                <div className="animate-fade-in px-2">
                  <h4 className="font-extrabold text-amber-600 mb-2 text-lg">Nuestro Futuro</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                    Esto es solo el comienzo. Me emociona pensar en todos los viajes, las metas, los cafés mañaneros y las fotos que nos faltan por tomar. Te amo infinito.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-3xl mb-4 shadow-sm">✨</div>
                  <h4 className="font-bold text-slate-700">Nuestro Mañana</h4>
                  <span className="text-[11px] text-amber-500 mt-3 font-bold bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">Revelar</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CARTA DE RECONCILIACIÓN (DISEÑO ELEVADO) */}
      <section className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-2xl border border-rose-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500"></div>
          <span className="text-4xl block mb-4">❤️‍🩹</span>
          <h3 className="text-2xl font-black text-slate-800 mb-4">Una nota desde mi corazón...</h3>
          <p className="text-slate-600 font-medium italic leading-relaxed text-base md:text-lg px-2">
            "Sé que este último mes, nuestro sexto mes juntos, pasamos de todo. Cometí muchos errores y no siempre fui perfecto, pero quiero que sepas que mi deseo más grande es ser mejor para ti. Perdón si a veces sientes que soy muy poco, pero te prometo que me esforzaré el doble cada día para hacerte la persona más feliz del mundo."
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto mt-8"></div>
        </div>
      </section>

      {/* 4. SECCIÓN FINAL CON GRAN CLÍMAX */}
      <section className="py-24 px-4 text-center max-w-xl mx-auto relative z-20">
        <h3 className="text-3xl font-black text-slate-800 mb-3">¿Lista para el gran final?</h3>
        <p className="text-slate-500 mb-8 font-medium">He preparado una explosión de amor para ti aquí abajo.</p>
        
        <button 
          onClick={() => lanzarCorazones(45)}
          className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-black px-10 py-5 rounded-full shadow-2xl hover:shadow-rose-300/60 hover:scale-105 active:scale-95 transition-all duration-300 tracking-wider text-base uppercase animate-pulse"
        >
          ❤️ ¡Explosión de Corazones! ❤️
        </button>

        <p className="text-xs text-slate-400 mt-20 font-medium italic">
          Diseñado con todo el amor de mi vida para ti. Felices 7 meses.
        </p>
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
        .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}