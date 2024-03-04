import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface LinkProps {
  name: string;
  path: string;
}

interface Props {
  items: LinkProps[];
}

function Breadcrumb(props: Props) {
  const { items } = props;
  return (
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <nav className="flex items-center">
        <ol className="inline-flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={item.path}>
              <div className="flex items-baseline text-sm">
                {index === 0 ? (
                  <Link
                    to={item.path}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    {item.name}
                  </Link>
                ) : index === items.length - 1 ? (
                  <>
                    <ChevronRightIcon
                      width={10}
                      height={10}
                      className="text-gray-500"
                    />
                    <span className="text-serene-600 ml-2">{item.name}</span>
                  </>
                ) : (
                  <>
                    <ChevronRightIcon
                      width={10}
                      height={10}
                      className="text-gray-500"
                    />
                    <Link
                      to={item.path}
                      className="text-gray-500 hover:text-gray-800 ml-2"
                    >
                      {item.name}
                    </Link>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
