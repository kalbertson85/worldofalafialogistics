import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      form.reset();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Us",
      description: "info@alafialogistics.com",
      link: "mailto:info@alafialogistics.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Us",
      description: "+232 76 865694",
      link: "tel:+23276865694"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Visit Us",
      description: "134 Njalu Road, Bo, Sierra Leone"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Working Hours",
      description: "Mon - Fri: 9:00 AM - 5:00 PM\nSat: 9:00 AM - 1:00 PM"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us today. We're here to help with all your business needs.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-8">
                We'd love to hear from you. Contact us through any of the methods below 
                or fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="border-l-4 border-l-primary group hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                            {item.link ? (
                              <a 
                                href={item.link} 
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {item.description}
                              </a>
                            ) : (
                              <p className="text-muted-foreground whitespace-pre-line">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-border p-8"
          >
            <h3 className="text-2xl font-bold text-secondary mb-6">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
