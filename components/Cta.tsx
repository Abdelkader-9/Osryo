import React from 'react'

const Cta = () => {
  return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to transform your digital presence?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's work together to create something amazing. Get in touch today.
            </p>
            <a
              href="/contact"
              className="btn-secondary px-3 py-4"
            >
              Start a Project
            </a>
          </div>
        </section>
  )
}

export default Cta