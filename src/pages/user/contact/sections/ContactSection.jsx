import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

const ContactSection = () => {
  return (
    <section className="lg:justify-center lg:mx-32 2xl:mx-52 mx-4 mt-10 lg:mt-28 flex flex-col-reverse md:grid md:grid-cols-2 gap-10">
      <ContactForm />
      <ContactInfo />
    </section>
  );
};

export default ContactSection;
