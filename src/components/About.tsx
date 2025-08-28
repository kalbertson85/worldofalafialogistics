import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    transition: { duration: 0.3 }
  }
};

const iconHover = {
  hover: {
    scale: 1.1,
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      {/* Mission Detail Section */}
      <div id="mission" className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Our Mission in Action</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At World of Alafia Logistics, our mission drives everything we do. We're committed to creating a marketplace that not only connects service users with trusted providers but also contributes to the economic growth of Sierra Leone. Our platform is built on the principles of trust, reliability, and community development.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                'Supporting local businesses and entrepreneurs',
                'Ensuring quality and reliability in every transaction',
                'Building lasting relationships based on trust'
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vision Detail Section */}
      <div id="vision" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Our Vision for the Future</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We envision a future where every business in Sierra Leone has equal opportunities to thrive. Through our platform, we aim to break down barriers to commerce, empower entrepreneurs, and create a more connected business ecosystem across the country.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                'Expanding our network to reach every region',
                'Innovating with technology to serve better',
                'Creating sustainable business opportunities'
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">About Us</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Who We Are Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6">Who We Are</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              World of Alafia Logistics is Sierra Leone's premier business platform, dedicated to connecting 
              service users with trusted and reliable service providers across the country. Based in 
              Bo, we have built a reputation for excellence and integrity in the marketplace.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform serves as a bridge between businesses and customers, ensuring quality 
              services and products are accessible to everyone. From electronics and toiletries to 
              vehicle rentals and electronic money services, we cover all your essential needs.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-semibold text-secondary mb-4">Our Foundation</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Established to serve Sierra Leone's business community
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Located at 134 Njalu Road, Bo
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Trusted by thousands of customers nationwide
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
        >
          <motion.div variants={item} whileHover="hover">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 h-full transform transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <motion.div 
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                  variants={iconHover}
                >
                  <Target className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  To create a reliable and trustworthy marketplace that connects service users with 
                  quality service providers, fostering economic growth and community development 
                  throughout Sierra Leone.
                </p>
                <a href="#mission" className="group">
                  <motion.div 
                    className="mt-6 text-primary font-medium flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span>Learn more about our mission</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover="hover">
            <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 h-full transform transition-all duration-500 hover:shadow-xl hover:shadow-secondary/10">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <motion.div 
                  className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"
                  variants={iconHover}
                >
                  <Eye className="w-8 h-8 text-secondary-foreground" />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  To become Sierra Leone's leading business platform, empowering entrepreneurs and 
                  businesses while providing customers with easy access to quality products and 
                  services nationwide.
                </p>
                <a href="#vision" className="group">
                  <motion.div 
                    className="mt-6 text-secondary font-medium flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span>Explore our vision</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Core Values Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trust Card */}
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                className="w-20 h-20 bg-trust/10 rounded-full flex items-center justify-center mb-4 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                >
                  <Heart className="w-10 h-10 text-trust group-hover:scale-110 transition-transform" />
                </motion.div>
              </motion.div>
              <h4 className="text-xl font-semibold text-secondary mb-2">Trust</h4>
              <p className="text-muted-foreground">Building lasting relationships through transparency and reliability</p>
            </motion.div>
            
            {/* Quality Card */}
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: 0.3
                  }}
                >
                  <Target className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                </motion.div>
              </motion.div>
              <h4 className="text-xl font-semibold text-secondary mb-2">Quality</h4>
              <p className="text-muted-foreground">Ensuring excellence in every product and service we facilitate</p>
            </motion.div>
            
            {/* Service Card */}
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: 0.6
                  }}
                >
                  <Eye className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform" />
                </motion.div>
              </motion.div>
              <h4 className="text-xl font-semibold text-secondary mb-2">Service</h4>
              <p className="text-muted-foreground">Putting customer satisfaction at the heart of everything we do</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;