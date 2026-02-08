import Link from 'next/link';

export function Hero() {
  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
          Digital excellence starts here
        </h1>
        <p className="text-xl text-muted mb-8 leading-relaxed max-w-2xl mx-auto">
          We create beautiful, functional digital experiences that drive real business results. From strategy to
          execution, we're your partner in growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="btn-secondary "
          >
            Start Your Project
          </Link>
          <Link
            href="/case-studies"
            className="btn-primary"
          >
            See Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}
