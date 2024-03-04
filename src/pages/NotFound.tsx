import { PrimaryButton, SecondaryButton } from '../components/ui/Button';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="space-y-12">
              <h1 className="text-gray-700 font-bold text-2xl">
                Page Not Found
              </h1>
              <div>
                <p>
                  We&#39;re sorry, the page you&#39;re looking for could not be
                  found. Please check the url and try again.
                </p>
                <p>
                  If you&#39;re still having trouble, please contact support for
                  further assistance.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <SecondaryButton onClick={() => navigate(-1)}>
                  <ArrowLongLeftIcon width={24} height={24} />
                  <div>Go back</div>
                </SecondaryButton>
                <Link to="/">
                  <PrimaryButton>Take me home</PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img src="/404.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <img src="/not-found.png" alt="" />
      </div>
    </div>
  );
}

export default NotFound;
