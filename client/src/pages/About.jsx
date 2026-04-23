import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 bg-premium-cream min-h-screen">
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-premium-gold tracking-[0.3em] uppercase block mb-6">Our Story</span>
            <h1 className="text-6xl font-serif mb-8 leading-tight">The Soul of <br />Sarinni</h1>
            <p className="text-premium-black/70 leading-relaxed mb-6 text-lg">
              Founded on the shores of the Indian Ocean, Sarinni was born from a desire to celebrate the rich textile heritage of island life while embracing modern design.
            </p>
            <p className="text-premium-black/70 leading-relaxed mb-8 text-lg">
              We work directly with master artisans, ensuring that every sarong we produce is not only a piece of luxury but also a testament to fair trade and sustainable craftsmanship.
            </p>
            <div className="flex space-x-12 mt-12">
              <div>
                <h4 className="text-3xl font-serif text-premium-gold mb-2">50+</h4>
                <p className="text-[10px] uppercase tracking-widest text-premium-black/50">Artisans</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-premium-gold mb-2">100%</h4>
                <p className="text-[10px] uppercase tracking-widest text-premium-black/50">Handmade</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury resort life" 
              className="w-full h-[700px] object-cover shadow-2xl"
            />
            <div className="absolute -top-10 -right-10 w-64 h-64 border border-premium-gold -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-premium-black text-premium-cream py-32 mt-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-12 italic"
          >
            "To weave the essence of the ocean into every thread, creating timeless pieces for the modern wanderer."
          </motion.h2>
          <div className="w-20 h-[2px] bg-premium-gold mx-auto mb-12"></div>
          <p className="text-premium-cream/60 tracking-widest uppercase text-sm">Sarinni Philosophy</p>
        </div>
      </section>
    </div>
  );
};

export default About;
