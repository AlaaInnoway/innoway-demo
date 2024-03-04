import Header from '../features/authentification/components/FormHeader';
import Form from '../features/authentification/components/FormLogin';
import Footer from '../features/authentification/components/FormFooter';

export default function Login() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Welcome to Innoway"
          paragraph="Your All-in-One Management Solution"
        />
        <Form />
        <Footer />
      </div>
    </div>
  );
}
