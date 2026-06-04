'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  // CONFIGURACIÓN DE TU ANIVERSARIO (Noviembre 2025)
  const fechaInicio = new Date(2025, 10, 4, 0, 0, 0); 

  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [cartaAbierta, setCartaAbierta] = useState(null);
  const [corazones, setCorazones] = useState([]);

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

  const lanzarSorpresa = () => {
    const nuevosCorazones = Array.from({ length: 35 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * (30 - 15) + 15,
    }));
    setCorazones(nuevosCorazones);
    setTimeout(() => setCorazones([]), 6000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-purple-50 to-amber-50 text-slate-800 font-sans overflow-x-hidden relative">
      
      {/* EFECTO DE LLUVIA DE CORAZONES */}
      {corazones.map((corazon) => (
        <span
          key={corazon.id}
          className="absolute text-rose-500 pointer-events-none z-50 opacity-80"
          style={{
            left: `${corazon.left}%`,
            bottom: '0px',
            fontSize: `${corazon.size}px`,
            animation: `floatUp 5s linear forwards`,
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
          className="absolute inset-0 z-0 bg-cover bg-center scale-105 blur-[2px] opacity-25" 
          style={{ backgroundImage: "url('/Nuestras-primera-foto.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-rose-50/80 via-transparent to-transparent z-0"></div>

        <div className="z-10 max-w-2xl px-4">
          <span className="inline-block text-xs uppercase tracking-widest text-rose-600 font-bold bg-rose-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 shadow-sm">
            Nuestra Historia de Amor ✨
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 tracking-tight leading-tight mb-4">
            Felices 7 Meses, Mi Vida
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-md mx-auto mb-10 font-medium">
            Siete meses construyendo el lugar más bonito del mundo: nuestro amor. Cada segundo contigo cuenta.
          </p>

          {/* CONTADOR */}
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto bg-white/60 backdrop-blur-xl p-5 md:p-7 rounded-[2rem] shadow-2xl border border-white/40">
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-rose-500">{tiempo.dias}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-500 mt-1.5 tracking-wider">Días</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-purple-500">{tiempo.horas}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-500 mt-1.5 tracking-wider">Horas</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-pink-500">{tiempo.minutos}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-500 mt-1.5 tracking-wider">Min</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black text-amber-500 animate-pulse">{tiempo.segundos}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-slate-500 mt-1.5 tracking-wider">Seg</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 flex flex-col items-center text-rose-400 opacity-80 animate-bounce">
          <span className="text-xs font-semibold uppercase tracking-wider mb-1">Desliza para recordar</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* 2. LÍNEA DEL TIEMPO INTERACTIVA */}
      <section className="max-w-4xl mx-auto px-4 py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Nuestros Pequeños Grandes Momentos</h2>
          <p className="text-slate-500 mt-2">Un recorrido por el camino que hemos diseñado juntos</p>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-300 via-purple-300 to-amber-300 h-[80%] top-40 z-0"></div>

        {/* MOMENTO 1 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-20 md:mb-32 w-full">
          <div className="w-full md:w-[45%] flex justify-center md:justify-end order-2 md:order-1">
            <div className="bg-white p-4 pb-8 shadow-xl rounded-sm transform -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-xs border border-slate-100">
              <img src="/Nuestras-primera-foto.jpeg" alt="Nuestra primera foto" className="w-full h-64 object-cover rounded-sm mb-4" />
              <p className="font-serif text-center text-slate-700 text-lg italic">"Donde todo comenzó... ❤️"</p>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-rose-400 text-white w-10 h-10 rounded-full shadow-lg border-4 border-white font-bold text-sm order-1 md:order-2 my-4 md:my-0">1</div>
          <div className="w-full md:w-[45%] text-center md:text-left order-3 pl-0 md:pl-8">
            <h3 className="text-xl md:text-2xl font-bold text-rose-600">El Primer Capítulo</h3>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Ese viaje en bus donde mi mundo cambió por completo. Guardar la timidez a un lado y empezar a escribir esta bonita historia que hoy cumple 7 meses.
            </p>
          </div>
        </div>

        {/* MOMENTO 2 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-20 md:mb-32 w-full">
          <div className="w-full md:w-[45%] text-center md:text-right order-3 md:order-1 pr-0 md:pr-8">
            <h3 className="text-xl md:text-2xl font-bold text-purple-600">Tus Abrazos, Mi Refugio</h3>
            <p className="text-slate-600 mt-2 leading-relaxed">
              No importa qué tan oscuro o frío sea el día, encontrarte y fundirme en un abrazo tuyo reinicia todo lo malo. Eres mi paz y mi hogar favorito.
            </p>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-purple-400 text-white w-10 h-10 rounded-full shadow-lg border-4 border-white font-bold text-sm order-1 my-4 md:my-0">2</div>
          <div className="w-full md:w-[45%] flex justify-center order-2">
            <div className="bg-slate-900 overflow-hidden shadow-2xl rounded-3xl w-full max-w-xs aspect-[9/16] border-4 border-white">
              <video src="/Primer-video.mp4" controls loop muted className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* MOMENTO 3 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="w-full md:w-[45%] flex flex-col gap-4 items-center justify-end order-2 md:order-1">
            <div className="bg-white p-3 shadow-lg rounded-2xl max-w-[240px] border border-slate-50 transform rotate-1 hover:rotate-0 transition-all duration-300">
              <video src="/Primera foto.MOV" controls loop muted className="rounded-xl w-full h-40 object-cover" />
            </div>
            <div className="bg-white p-3 shadow-lg rounded-2xl max-w-[240px] border border-slate-50 transform -rotate-1 hover:rotate-0 transition-all duration-300 md:ml-12">
              <video src="/Segunda foto.MOV" controls loop muted className="rounded-xl w-full h-40 object-cover" />
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-amber-400 text-white w-10 h-10 rounded-full shadow-lg border-4 border-white font-bold text-sm order-1 md:order-2 my-4 md:my-0">3</div>
          <div className="w-full md:w-[45%] text-center md:text-left order-3 pl-0 md:pl-8">
            <h3 className="text-xl md:text-2xl font-bold text-amber-600">Coleccionando Sonrisas</h3>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Cada foto viva, cada risa capturada al azar, demuestra lo natural y mágico que es estar juntos. Adoro mirar atrás y ver cuánto nos divertimos juntos.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CARTAS DE AMOR SECRETAS */}
      <section className="bg-gradient-to-r from-rose-100/50 to-purple-100/50 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xl">✉️</span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-2">Tres Mensajitos Especiales</h2>
            <p className="text-slate-500 mt-1">Haz clic en cada sobre para abrir lo que guardo para ti</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              onClick={() => setCartaAbierta(cartaAbierta === 1 ? null : 1)}
              className={`bg-white p-6 rounded-3xl shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-64 relative overflow-hidden ${cartaAbierta === 1 ? 'border-rose-400 ring-2 ring-rose-200 scale-105' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {cartaAbierta === 1 ? (
                <div className="animate-fade-in">
                  <h4 className="font-bold text-rose-500 mb-2">Lo que más amo de ti...</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Amo tu forma de mirar el mundo, cómo me haces reír cuando tengo un mal día, y la increíble paz que me da recostar mi cabeza sobre ti. Eres arte pura.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-4">💖</span>
                  <h4 className="font-bold text-slate-700">Razón #1</h4>
                  <span className="text-xs text-rose-400 mt-2 font-semibold">Toca para abrir</span>
                </div>
              )}
            </div>

            <div 
              onClick={() => setCartaAbierta(cartaAbierta === 2 ? null : 2)}
              className={`bg-white p-6 rounded-3xl shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-64 relative overflow-hidden ${cartaAbierta === 2 ? 'border-purple-400 ring-2 ring-purple-200 scale-105' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {cartaAbierta === 2 ? (
                <div className="animate-fade-in">
                  <h4 className="font-bold text-purple-500 mb-2">Gracias por...</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Gracias por tu paciencia infinita, por escucharme siempre, por los mimos, por no soltarme y por elegirme todos los días de estos 7 hermosos meses.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-4">🌸</span>
                  <h4 className="font-bold text-slate-700">Razón #2</h4>
                  <span className="text-xs text-purple-400 mt-2 font-semibold">Toca para abrir</span>
                </div>
              )}
            </div>

            <div 
              onClick={() => setCartaAbierta(cartaAbierta === 3 ? null : 3)}
              className={`bg-white p-6 rounded-3xl shadow-xl border cursor-pointer transition-all duration-500 text-center flex flex-col justify-center items-center h-64 relative overflow-hidden ${cartaAbierta === 3 ? 'border-amber-400 ring-2 ring-amber-200 scale-105' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {cartaAbierta === 3 ? (
                <div className="animate-fade-in">
                  <h4 className="font-bold text-amber-600 mb-2">Nuestro Futuro</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Esto es solo el comienzo. Me emociona pensar en todos los viajes, las metas, los cafés mañaneros y las fotos que nos faltan por tomar. Te amo infinito.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-4">✨</span>
                  <h4 className="font-bold text-slate-700">Nuestro Mañana</h4>
                  <span className="text-xs text-amber-500 mt-2 font-semibold">Toca para abrir</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: CARTA DE RECONCILIACIÓN Y PROMESA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-xl border-2 border-rose-100 relative">
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl bg-rose-50 px-4">❤️‍🩹</span>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-4 mt-2">Una nota desde mi corazón...</h3>
          <p className="text-slate-700 font-medium italic leading-relaxed text-base md:text-lg">
            "Sé que este último mes, nuestro sexto mes juntos, pasamos de todo. Cometí muchos errores y no siempre fui perfecto, pero quiero que sepas que mi deseo más grande es ser mejor para ti. Perdón si a veces sientes que soy muy poco, pero te prometo que me esforzaré el doble cada día para hacerte la persona más feliz del mundo."
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto mt-6"></div>
        </div>
      </section>

      {/* 4. SECCIÓN FINAL Y GRAN SORPRESA */}
      <section className="py-16 px-4 text-center max-w-xl mx-auto relative z-20">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">¿Falta algo más?</h3>
        <p className="text-slate-500 mb-8 text-sm md:text-base">He preparado una última cosita interactiva para ti, dale clic abajo.</p>
        
        <button 
          onClick={lanzarSorpresa}
          className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-extrabold px-8 py-4 rounded-full shadow-xl hover:shadow-rose-300/50 hover:scale-105 active:scale-95 transition-all duration-300 tracking-wider text-sm md:text-base uppercase"
        >
          ❤️ ¡Presiona para tu Sorpresa! ❤️
        </button>

        <p className="text-xs text-slate-400 mt-16 italic">
          Hecho con todo el amor del mundo por ti. Felices 7 meses.
        </p>
      </section>

      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-105vh) rotate(360deg); opacity: 0; }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}