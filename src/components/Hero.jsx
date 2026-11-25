const Hero = ({
  title = 'UNIVERSOS DE TINTA',
  subtitle = 'Cinco autores, cinco formas de transformar el mundo con palabras',
}) => {
  return (
    <section className="rounded-lg bg-stone-900 px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-amber-400 md:text-6xl">{title}</h1>
      <p className="mt-4 text-lg text-stone-200">{subtitle}</p>
    </section>
  )
}

export default Hero