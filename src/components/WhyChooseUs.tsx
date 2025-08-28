import { Shield, Package, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Animation variants for the container
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animation variants for each feature item
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.3 }
  }
};

// Animation for the icon
const icon = {
  hover: {
    scale: 1.1,
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "We are known for our dependable service and trustworthy providers."
    },
    {
      icon: Package,
      title: "Wide Product Range",
      description: "We offer a diverse selection of products and services."
    },
    {
      icon: DollarSign,
      title: "Affordable Solutions",
      description: "We provide quality solutions at competitive prices."
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trusted by thousands of customers across Sierra Leone for our commitment to excellence
          </motion.p>
        </div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover="hover"
              custom={index}
            >
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm h-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div 
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                    variants={icon}
                  >
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-200 flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;